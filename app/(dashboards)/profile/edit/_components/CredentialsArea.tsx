import { BaseInput } from '@/components/BaseInput'
import { Button } from '@/components/ui/button';
import { SignupSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CredentialsArea = () => {


    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(SignupSchema),
    });


    return (
        <div className="px-3 lg:px-20 xl:px-72 py-6">
            <div>
                <p className="text-[16px] font-medium pb-4 border-b">Basic Info</p>
                <div className="flex flex-col gap-[38px] pt-4 w-full">
                    <div className="flex flex-col w-full">
                        <label className='text-sm font-medium text-deepBlackColor pb-1' >First Name</label>
                        <BaseInput
                            control={control}
                            name='firstName'
                            type='text'
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className='text-sm font-medium text-deepBlackColor pb-1' >Last Name</label>
                        <BaseInput
                            control={control}
                            name='LastName'
                            type='text'
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className='text-sm font-medium text-deepBlackColor pb-1' >Email</label>
                        <BaseInput
                            control={control}
                            name='firstName'
                            type='email'
                        />
                        <Button variant="defaultEx" className='mt-6'>Update Profile</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CredentialsArea
