import React from 'react'
import { VulnabalitiesDropdown } from '../../repositories/[id]/details/_components/VulnabalitiesDropdown'
import RepositorySearchbar from '../../repositories/_components/repositorySearchbar'

const DependenciesSearchArea = () => {
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
                    <div className='flex justify-end lg:justify-start'>
                        <VulnabalitiesDropdown
                            placeholder='None'
                            name="vulStatus"
                            active={false}
                            className="mt-4 w-[172px] lg:w-[160px] h-10 !placeholder:text-black"
                        />
                    </div>
                </div>
            </div>
        )
    }

export default DependenciesSearchArea
