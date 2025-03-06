import React, { FC } from 'react'
import { Button } from '@/components/ui/button'
import RepositorySearchbar from '../../_components/repositorySearchbar'
import { useMutation } from '@tanstack/react-query'
import { AddAllRepositories } from '@/helpers/githubApp/githubApi'
import { useRouter } from 'next/navigation'


type AddRepoSearchAreaProps = {
 
    session: any
    
}


const AddRepoSearchArea : FC<AddRepoSearchAreaProps> = ({session}) => {

    const router = useRouter();

    const addAllRepoMutation = useMutation({
        mutationFn: () => AddAllRepositories(session),
        onSuccess: () => {
            router.push(`/repositories`)
        },
    });


    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by repository name"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative placeholder:font-normal"
                variant="light"
            />

            <Button size="xsExtended" className='lg:mt-4'
                onClick={() => addAllRepoMutation.mutate()}
            >Add all</Button>

        </div>
    )
}

export default AddRepoSearchArea
