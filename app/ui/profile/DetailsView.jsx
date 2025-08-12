import { EditIcon } from 'lucide-react';

export default function DetailsView({ user, setIsEditing }) {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 mt-4 px-2 py-1 text-xs md:text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
      >
        <span>Edit</span>
        <EditIcon className="size-3" />
      </button>
    </>
  );
}