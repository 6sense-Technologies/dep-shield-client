import React from 'react'
import { Button } from '@/components/ui/button'
import RepositorySearchbar from '../../../_components/repositorySearchbar'
import { VulnabalitiesDropdown } from './VulnabalitiesDropdown'

const LicensesSearchArea = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by name"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
            <div className='flex flex-col lg:flex-row space-y-4 lg:space-x-4'>
                <div className='flex gap-x-4'>
                    <VulnabalitiesDropdown
                        placeholder='Critical'
                        name="LicStatus"
                        active={false}
                        className="mt-4 w-full lg:w-[160px] h-10 !placeholder:text-black"
                    />
                    <VulnabalitiesDropdown
                        placeholder='Low'
                        name="LowStatus"
                        active={false}
                        className="mt-4 w-full lg:w-[160px] h-10 !placeholder:text-black"
                    />
                </div>
                <Button size="xsExtended" className='mr-4 lg:mt-4'>Scan</Button>
            </div>
        </div>
    )
}

export default LicensesSearchArea
