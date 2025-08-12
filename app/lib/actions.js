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

export async function updateUserDetails(_, formData, userId) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if (!name || !email) {
            return { error: 'Name and Email are required' };
        }

        if (password) {
            const hashed = await hash(password, 10);
            await sql`
                UPDATE users
                SET name = ${name}, email = ${email}, password = ${hashed}
                WHERE id = ${userId}
            `;
        } else {
            await sql`
                UPDATE users
                SET name = ${name}, email = ${email}
                WHERE id = ${userId}
            `;
        }

        return { success: true };
    } catch (err) {
        console.error('Update failed:', err);
        return { error: 'Update failed' };
    }
}

export async function updateUserAvatar(userId, avatarFileName) {
    try {
        if (!avatarFileName) {
            return { error: 'Avatar file is required' };
        }

        await sql`
            UPDATE users
            SET image_url = ${`/users/avatars/${avatarFileName}`}
            WHERE id = ${userId}
        `;

        return { success: true };
    } catch (err) {
        console.error('Avatar update failed:', err);
        return { error: 'Avatar update failed' };
    }
}

export async function deleteAccount(_, userId) {
    try {
        await sql`
            DELETE FROM users
            WHERE id = ${userId}
        `;
        await signOut({ redirectTo: '/signup' });
    } catch (err) {
        console.error('Account deletion failed:', err);
        return { error: 'Deletion failed' };
    }
}