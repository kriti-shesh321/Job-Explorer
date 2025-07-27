'use client';

import { logout } from "../lib/actions";

export default function LogoutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Logout
            </button>
        </form>
    );
}