import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React, { FC } from 'react'


type ProfileAvatarSectionProps = {
    defaultAvatarUrl: string;
    session: any;
    getInitials: (name: string) => string;


    
}

const ProfileAvatarSection :FC<ProfileAvatarSectionProps> = ({defaultAvatarUrl,session,getInitials}) => {
    return (
        <div className="lg:px-20 xl:px-72 pt-10  pb-6 border-b">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:gap-48">
                <div>
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={defaultAvatarUrl} alt="Avatar" />
                        {/* <AvatarImage src={session?.avatarUrl || defaultAvatarUrl} alt="Avatar" /> */}
                        <AvatarFallback className="bg-primary text-white">
                            {session.data?.user?.name ? getInitials(session.data.user.name) : "NA"}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center w-full gap-2 justify-center lg:justify-start pt-4 lg:pt-0">
                    <Button variant="light" className="text-xs pl-3">Change Picture</Button>
                    <Button variant="lightDestructive" className="text-xs pl-3">Remove Picture</Button>

                </div>
            </div>
        </div>
    )
}

export default ProfileAvatarSection
