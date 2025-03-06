import React from 'react'
import { Button } from '@/components/ui/button'
import RepositorySearchbar from '../../../_components/repositorySearchbar'
import { VulnabalitiesDropdown } from './VulnabalitiesDropdown'

const DependenciesSearchArea = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by name or license"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
            <div className='flex flex-col lg:flex-row space-y-4 lg:space-x-4 items-end lg:items-start'>
                <div className='flex justify-end lg:justify-start'>
                    <VulnabalitiesDropdown
                        placeholder='Critical'
                        name="vulStatus"
                        active={false}
                        className="mt-4 w-[172px] lg:w-[160px] h-10 !placeholder:text-black"
                    />
                </div>
                <div className='w-full'>
                    <Button size="xsExtended" className='mr-4'>Scan</Button>
                </div>
            </div>
        </div>
    )
}

export default DependenciesSearchArea
