import RepositorySearchbar from '@/app/(dashboards)/repositories/_components/repositorySearchbar'
import React from 'react'

const RepoSearchSection = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by repository name"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
        </div>
    )
}

export default RepoSearchSection
