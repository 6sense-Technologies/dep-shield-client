import React from 'react'

import { Button } from '@/components/ui/button'
import { ScanText, Share } from 'lucide-react'
import RepositorySearchbar from '../../../_components/repositorySearchbar'
import { VulnabalitiesDropdown } from './VulnabalitiesDropdown'

const VulnabalitiesSearchArea = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by name or dependency"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
            <div className='flex flex-col lg:flex-row space-y-4 lg:space-x-4'>
                <div>
                    <VulnabalitiesDropdown
                        placeholder='Critical'
                        name="vulStatus"
                        active={false}
                        className="mt-4 w-[140px] h-10 !placeholder:text-black"
                    />
                </div>
                <Button size="xsExtended" className='mr-4 lg:mt-4'>Add</Button>
            </div>
        </div>
    )
}

export default VulnabalitiesSearchArea
