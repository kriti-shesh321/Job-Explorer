import { getUser } from "@/app/lib/data";
import Profile from "@/app/ui/Profile";
import { auth } from '@/auth';

export default async function Page() {
    const session = await auth();
    const email = session?.user?.email;
    console.log('User Email:', email);
    const user = await getUser(email);
    return (
        <div className="bg-gray-50 w-full pt-28 h-screen">
            <div className="bg-white w-1/3 p-5 mx-auto shadow-sm">
                <Profile user={user} />
            </div>
        </div>
    );
}