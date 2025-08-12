'use client';

import { useState } from 'react';
import { updateUserAvatar } from '@/app/lib/actions';

const avatars = [
    'avatar1.jpg',
    'avatar2.jpg',
    'avatar3.jpg',
    'avatar4.jpg',
];

export default function AvatarEdit({ user, setUserData, onCancel }) {
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        if (!selected) return;
        setLoading(true);

        const res = await updateUserAvatar(user.id, selected);
        setLoading(false);

        if (res.success) {
            setUserData((prev) => ({
                ...prev,
                image_url: `/users/avatars/${selected}`,
            }));
            onCancel();
        }
    }

    return (
        <div className="bg-blue-50 shadow-lg p-4 rounded-lg max-w-fit">
            <h3 className="font-semibold mb-2">Choose your avatar</h3>
            <div className="grid grid-cols-4 gap-3">
                {avatars.map((file) => (
                    <img
                        key={file}
                        src={`/users/avatars/${file}`}
                        alt={file}
                        className={`size-14 sm:size-20 rounded-full cursor-pointer border-2 ${selected === file ? 'border-blue-500' : 'border-transparent'
                            }`}
                        onClick={() => setSelected(file)}
                    />
                ))}
            </div>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={handleSave}
                    disabled={loading || !selected}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={onCancel}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}