'use client';

import { useState } from 'react';
import { deleteAccount } from '@/app/lib/actions';

export default function DeleteAccount({ userId }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await deleteAccount(userId);
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Deleting your account is permanent and cannot be undone.
                </p>
                <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    className="w-full sm:w-auto px-5 py-2 text-sm font-medium rounded 
                     bg-red-500 text-white hover:bg-red-700 
                     focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Delete Account
                </button>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-80">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Confirm Deletion
                        </h4>
                        <p className="text-sm text-gray-600 mb-5">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                className="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}