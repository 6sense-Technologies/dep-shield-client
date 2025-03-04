import React from 'react'
import { Button } from '@/components/ui/button'
import RepositorySearchbar from '../../_components/repositorySearchbar'
import Link from 'next/link'

const AddRepoSearchArea = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by repository name"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative placeholder:font-normal"
                variant="light"
            />
            {/* <Link href="/repositories/add"> */}
            <Button size="xsExtended" className='lg:mt-4' disabled>Add all</Button>
            {/* </Link> */}
        </div>
    )
}

export default AddRepoSearchArea
