import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const PasswordArea = () => {
    return (
        <div className="px-3 lg:px-20 xl:px-72 pt-8 pb-7">
            <div>
                <p className="text-[16px] font-medium pb-4 border-b">Password</p>
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex justify-between items-center w-full rounded-md h-14">
                        <div className="w-full text-left">
                            <Link href="/profile/change-password">
                                <Button variant="default">
                                    <span className="inline">Change</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordArea
