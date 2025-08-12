'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { updateUserDetails } from '@/app/lib/actions';

export default function EditDetailsForm({ user, setIsEditing, setUserData }) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(formData) {
        setError(null);
        setSuccess(null);

        const res = await updateUserDetails(null, formData, user.id);

        if (res?.error) {
            setError(res.error);
        } else {
            setUserData({
                ...user,
                name: formData.get('name'),
                email: formData.get('email'),
            });

            setSuccess('Profile updated!');
            setIsEditing(false);

            router.refresh();
        }
    }

    return (
        <form action={handleSubmit} className="space-y-2 flex flex-col text-sm">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <input
                type="text"
                name="name"
                defaultValue={user.name}
                placeholder="Name"
                className="border border-gray-200 px-2 py-1 rounded w-full md:w-1/2"
            />
            <input
                type="email"
                name="email"
                defaultValue={user.email}
                placeholder="Email"
                className="border border-gray-200 px-2 py-1 rounded w-full md:w-1/2"
            />
            <input
                type="password"
                name="password"
                placeholder="New Password (leave blank to keep current)"
                className="border border-gray-200 px-2 py-1 rounded w-full md:w-1/2"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-0.5 rounded hover:bg-blue-600"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border px-2 py-0.5 rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}