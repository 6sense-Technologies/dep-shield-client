import React from 'react'
import RepositorySearchbar from './repositorySearchbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const RepoSearchArea = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by repository name"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
            <Link href="/repositories/add"><Button size="xsExtended" className='lg:mt-4'>Add</Button></Link>
        </div>
    )
}

export default RepoSearchArea
