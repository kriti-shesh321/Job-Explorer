import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { addBookmark, isJobBookmarked } from "@/app/lib/data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function POST(req) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId } = await req.json();
    const userId = session.user.id;

    if (!jobId) {
        return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }

    // Check if already bookmarked
    const existing = await isJobBookmarked(userId, jobId);

    let isBookmarked;

    if (existing) {
        // Remove bookmark
        await sql`
            DELETE FROM bookmarks
            WHERE user_id = ${userId} AND job_id = ${jobId}
        `;
        isBookmarked = false;
    } else {
        // Add bookmark
        await addBookmark(userId, jobId);
        isBookmarked = true;
    }

    return NextResponse.json({ isBookmarked });
}