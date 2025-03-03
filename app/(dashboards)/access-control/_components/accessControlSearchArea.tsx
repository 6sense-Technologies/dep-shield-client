import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import RepositorySearchbar from '../../repositories/_components/repositorySearchbar';
import RemoveAllModal from './RemoveAllModal';

type AccessControlSearchAreaProps = {

    empty?: boolean;

};


const AccessControlSearchArea: FC<AccessControlSearchAreaProps> = ({ empty }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemoveAllClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmRemoveAll = () => {
        // Add your logic to remove all access here
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col lg:flex-row justify-between w-full'>
            <RepositorySearchbar
                placeholder="Search by name or email"
                name="search"
                btntext="Search"
                className="mt-4 mb-[26px] gap-x-2 w-full lg:max-w-[300px] relative"
                variant="light"
            />
            <Button variant="destructive" size="xsExtended" className='lg:mt-4' onClick={handleRemoveAllClick} disabled={empty}>Remove all</Button>

            <RemoveAllModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmRemoveAll}
            />
        </div>
    );
};

export default AccessControlSearchArea;