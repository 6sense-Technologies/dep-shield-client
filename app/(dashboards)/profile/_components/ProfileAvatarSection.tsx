import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ProfileAvatarSectionProps } from '@/types/profile.types';
import Link from 'next/link';
import React, { FC } from 'react'



const ProfileAvatarSection: FC<ProfileAvatarSectionProps> = ({ defaultAvatarUrl, session, getInitials }) => {
    return (
        <div className="lg:px-20 xl:px-72 pt-10  pb-6 border-b">
            <div className="flex items-center">
                <div>
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={defaultAvatarUrl} alt="Avatar" />
                        {/* <AvatarImage src={session?.avatarUrl || defaultAvatarUrl} alt="Avatar" /> */}
                        <AvatarFallback className="bg-primary text-white">
                            {session.data?.user?.name ? getInitials(session.data.user.name) : "NA"}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className='w-full min-w-[200px]'>
                        <p className="text-sm font-semibold pl-3 text-miniSubheadingColor">Ahsan Aasim</p>
                        <p className="text-twelve font-normal pl-3 text-miniSubheadingColor">ahsan@example.com</p>
                    </div>

                    <Link href="/profile/edit"><Button variant="light" className="text-xs pl-3">Edit Profile</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileAvatarSection
