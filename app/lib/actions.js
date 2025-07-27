'use server';

import { signOut } from '@/auth';
import { hash } from 'bcryptjs';
import postgres from 'postgres';
import { getUser } from './data';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function signupUser(_, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const image_url = "/users/rei-sora.png";

    try {
        const existing = await getUser(email);
        if (existing) {
            return { error: 'User already exists' };
        }

        const hashed = await hash(password, 10);
        await sql`
            INSERT INTO users (name, email, password, image_url)
            VALUES (${name}, ${email}, ${hashed}, ${image_url})
        `;

    } catch (error) {
        console.error('Error during signup:', error);
        return { error: 'Signup failed' };
    }

    redirect('/login');
}

export async function logout() {
    await signOut({ redirectTo: '/login' });
}

// export async function addBookmark(jobId) {
//     const session = await auth();
//     const email = session?.user?.email;

//     if (!email) {
//         throw new Error('Unauthorized');
//     }

//     const user = await sql`SELECT id FROM users WHERE email = ${email}`;
//     if (!user[0]) throw new Error('User not found');

//     await sql`
//     INSERT INTO bookmarks (user_id, job_id)
//     VALUES (${user[0].id}, ${jobId})
//     ON CONFLICT DO NOTHING;
//   `;
// }

// export async function removeBookmark(jobId) {
//     const session = await auth();
//     const email = session?.user?.email;

//     if (!email) {
//         throw new Error('Unauthorized');
//     }

//     const user = await sql`SELECT id FROM users WHERE email = ${email}`;
//     if (!user[0]) throw new Error('User not found');

//     await sql`
//     DELETE FROM bookmarks
//     WHERE user_id = ${user[0].id} AND job_id = ${jobId};
//   `;
// }
