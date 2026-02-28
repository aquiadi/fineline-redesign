import { NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/mailer';
import { createServerClient } from '@/lib/supabase';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > MAX_REQUESTS;
}

// Input sanitization — strip HTML tags and limit length
function sanitize(input: string, maxLength: number = 500): string {
    return input
        .replace(/<[^>]*>/g, '')       // strip HTML tags
        .replace(/[<>]/g, '')          // remove any remaining angle brackets
        .trim()
        .substring(0, maxLength);
}

// Validate email format
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Validate phone format (optional field, allow digits, spaces, dashes, parens, plus)
function isValidPhone(phone: string): boolean {
    if (!phone) return true; // phone is optional
    const phoneRegex = /^[0-9\s\-\+\(\)\.]+$/;
    return phoneRegex.test(phone) && phone.length <= 20;
}

export async function POST(request: Request) {
    try {
        // Rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again in a minute.' },
                { status: 429 }
            );
        }

        // Parse and validate content type
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { error: 'Invalid content type.' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { name, email, phone, message } = body;

        // Validate required fields exist and are strings
        if (!name || typeof name !== 'string' ||
            !email || typeof email !== 'string' ||
            !message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Name, email, and message are required and must be text.' },
                { status: 400 }
            );
        }

        // Validate formats
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        if (phone && !isValidPhone(String(phone))) {
            return NextResponse.json(
                { error: 'Please provide a valid phone number.' },
                { status: 400 }
            );
        }

        // Sanitize all inputs
        const sanitizedData = {
            name: sanitize(name, 100),
            email: sanitize(email, 254),
            phone: sanitize(String(phone || ''), 20),
            message: sanitize(message, 2000),
        };

        // Validate sanitized fields are not empty
        if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
            return NextResponse.json(
                { error: 'Please provide valid input without HTML tags.' },
                { status: 400 }
            );
        }

        // 1. Save to Supabase
        const supabase = createServerClient();
        const { error: dbError } = await supabase.from('contact_submissions').insert({
            name: sanitizedData.name,
            email: sanitizedData.email,
            phone: sanitizedData.phone,
            message: sanitizedData.message,
        });

        if (dbError) {
            console.error('❌ DB Error:', dbError);
            return NextResponse.json(
                { error: 'Something went wrong. Please try again.' },
                { status: 500 }
            );
        }

        console.log('✅ Submission saved to Supabase');

        // 2. Send email notification (optional, needs credentials)
        await sendContactNotification(sanitizedData);

        // Don't leak internal IDs or implementation details
        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for contacting Fine Line Auto Body. We will get back to you shortly!'
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
