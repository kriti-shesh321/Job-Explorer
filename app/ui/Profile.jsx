export default function Profile({user}) {
    return (
        <div className="bg-gray-50 w-full pt-28">
            <div className="bg-white w-1/3 p-5 mx-auto shadow-sm">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <p className="text-gray-700">{user?.email}</p>
            </div>
        </div>
    );
}