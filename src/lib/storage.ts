import fs from 'fs';
import path from 'path';

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submittedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contact-submissions.json');

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function readSubmissions(): ContactSubmission[] {
    ensureDataDir();
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export function saveSubmission(submission: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission {
    const submissions = readSubmissions();
    const newSubmission: ContactSubmission = {
        ...submission,
        id: `FL-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        submittedAt: new Date().toISOString(),
    };
    submissions.push(newSubmission);
    ensureDataDir();
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    return newSubmission;
}

export function getSubmissions(): ContactSubmission[] {
    return readSubmissions();
}
