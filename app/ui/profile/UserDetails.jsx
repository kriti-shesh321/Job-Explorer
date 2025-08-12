'use client';

import { useState } from 'react';
import DetailsView from './DetailsView';
import EditDetailsForm from './EditDetailsForm';
import AvatarView from "./AvatarView";
import AvatarEdit from "./AvatarEdit";

export default function UserDetails({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [userData, setUserData] = useState(user);

    return (
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col lg:flex-row lg:items-center gap-6">       
            <div>
                {isEditingAvatar ? (
                    <AvatarEdit user={userData} setUserData={setUserData} onCancel={() => setIsEditingAvatar(false)} />
                ) : (
                    <AvatarView user={userData} onEdit={() => setIsEditingAvatar(true)} />
                )}
            </div>

            <div className="flex-1">
                {isEditing ? (
                    <EditDetailsForm user={user} setIsEditing={setIsEditing} setUserData={setUserData} />
                ) : (
                    <DetailsView user={userData} setIsEditing={setIsEditing} />
                )}
            </div>
        </div>
    );
}