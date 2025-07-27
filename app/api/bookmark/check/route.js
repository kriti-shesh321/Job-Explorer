import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isJobBookmarked } from "@/app/lib/data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function GET(req) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ isBookmarked: false });
    }

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    const userId = session.user.id;

    if (!jobId) {
        return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

    const bookmarked = await isJobBookmarked(userId, jobId);
    return NextResponse.json({ isBookmarked: bookmarked });
}