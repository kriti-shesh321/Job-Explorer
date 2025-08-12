import { EditIcon } from 'lucide-react';
import Image from "next/image";

export default function AvatarView({ user, onEdit }) {
    return (
        <div className="relative group">
            <button
                type="button"
                className="absolute z-10 bottom-0 left-25 lg:top-[35%] lg:left-[35%] lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-gray-100 rounded p-1 h-fit"
                title="Edit Avatar"
                onClick={onEdit}
            >
                <EditIcon className="size-4 lg:size-6" />
            </button>
            <Image
                height={200}
                width={200}
                src={user.image_url || '/users/perry-jhonson.jpg'}
                alt="Profile"
                className="w-24 h-24 bg-blue-50 rounded-full object-cover border border-blue-100 lg:group-hover:opacity-70 transition-opacity duration-300"
            />
        </div>
    );
}
