import React from 'react'

const CredentialsArea = () => {
    return (
        <div className="px-3 lg:px-20 xl:px-72 py-6">
            <div>
                <p className="text-[16px] font-medium pb-4 border-b">Basic Info</p>
                <div className="flex gap-24 md:gap-52 pt-4">
                    <div className="flex flex-col">
                        <p className="text-sm text-inputFooterColor ">First Name</p>
                        <p className="text-sm text-medium pt-[2px] text-deepBlackColor">Ahsan</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-inputFooterColor ">Last Name</p>
                        <p className="text-sm text-medium pt-[2px] text-deepBlackColor">Aasim</p>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col pt-4">
                        <p className="text-sm text-inputFooterColor ">Email</p>
                        <p className="text-sm text-medium pt-[2px] text-deepBlackColor">ahsan@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CredentialsArea
