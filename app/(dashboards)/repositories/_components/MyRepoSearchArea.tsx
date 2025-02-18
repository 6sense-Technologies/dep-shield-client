import React from 'react'
import RepositorySearchbar from './repositorySearchbar'
import { Button } from '@/components/ui/button'
import { ScanText, Share } from 'lucide-react'

const MyRepoSearchArea = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by repository name"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
            <div className='flex flex-col lg:flex-row space-y-4 lg:space-x-4'>
                <div className='flex space-x-4'>
                    <Button size="xsTight" variant="light" className='lg:mt-4'><Share /> <span className='text-sm font-medium text-deepBlackColor lg:hidden'>Share</span></Button>
                    <Button size="xsExtended" variant="light" className='lg:mt-4'><ScanText className='lg:hidden'/>Scan All</Button>
                </div>
                <Button size="xsExtended" className='mr-4 lg:mt-4'>Add</Button>
            </div>
        </div>
    )
}

export default MyRepoSearchArea
