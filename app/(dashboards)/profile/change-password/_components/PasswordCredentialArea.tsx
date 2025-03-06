import { BaseInput } from '@/components/BaseInput'
import { Button } from '@/components/ui/button';
import { SignupSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const PasswordCredentialsArea = () => {


    const {
        control
    } = useForm<any>({
        resolver: zodResolver(SignupSchema),
    });


    return (
        <div className="px-3 lg:px-20 xl:px-72 pt-6 pb-20">
            <div>
                <p className="text-[16px] font-medium pb-4 border-b">Change Password</p>
                <div className="flex flex-col gap-[26px] pt-4 w-full">
                    <div className="flex flex-col w-full">
                        <label className='text-sm font-medium text-deepBlackColor pb-1' >Current Password</label>
                        <BaseInput
                            control={control}
                            name='currentPassword'
                            type='password'
                            value="Faisal1212$$"
                            className='text-inputFooterColor'
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className='text-sm font-medium text-deepBlackColor pb-1' >New Password</label>
                        <BaseInput
                            control={control}
                            name='NewPassword'
                            type='password'
                            placeholder='Enter a new password'
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className='text-sm font-medium text-deepBlackColor pb-1' >Confirm New Password</label>
                        <BaseInput
                            control={control}
                            name='ConfirmNewPassword'
                            type='password'
                            placeholder='Confirm your new password'
                        />
                        <Button variant="defaultEx" className='mt-6'>Update Password</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordCredentialsArea
