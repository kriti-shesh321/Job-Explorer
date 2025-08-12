import { getUser, getUserBookmarks } from "@/app/lib/data";
import UserDetails from "@/app/ui/profile/UserDetails";
import BookmarkedJobs from "@/app/ui/profile/BookmarkedJobs";
import { auth } from '@/auth';
import DeleteAccount from "@/app/ui/profile/DeleteAccount";

export default async function Page() {
    const session = await auth();
    const user = session?.user;

    const userDetails = await getUser(user?.id);
    const bookmarks = user ? await getUserBookmarks(user?.id) : [];

    return (
        <div className="w-full bg-blue-50">
            <div className="max-w-5xl mx-auto p-4 space-y-6">
                <h1 className="text-2xl font-semibold text-blue-500 mt-3">Your Profile</h1>
                <UserDetails user={userDetails}/>
                <BookmarkedJobs jobs={bookmarks} />
                <DeleteAccount userId={userDetails?.id} />
            </div>
        </div>
    );
}