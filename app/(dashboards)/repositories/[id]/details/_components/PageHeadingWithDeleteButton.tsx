import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IHeadingProps } from '@/types/repo.types';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import CustomAlertDialog from '../../../_components/CustomAlartDialog';
import SharedMenu from './SharedMenu';
import { DropdownOption, VulnabalitiesDropdown } from './VulnabalitiesDropdown';

interface PageHeadingWithDeleteButtonProps extends IHeadingProps {
  branches?: DropdownOption[];
  selectedBranch?: string;
  onBranchChange?: (branch: string) => void;
}

const PageHeadingWithDeleteButton: FC<PageHeadingWithDeleteButtonProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, branches, selectedBranch, onBranchChange }) => {
    return (
        <div className='flex items-center gap-x-2'>
            <div className={cn(className)}>
                <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
            </div>
            <div className='hidden md:block'>
                <VulnabalitiesDropdown
                    placeholder="main"
                    name="vul"
                    active={true}
                    className="mt-4 w-[140px] !placeholder:text-black"
                    options={branches}
                    value={selectedBranch}
                    onChange={onBranchChange}
                />
            </div>
            <div className='hidden md:block mt-4'>
                <SharedMenu />
            </div>
            <CustomAlertDialog trigger={<Button variant="lightDestructive" size="tight" className='mt-4 hidden md:block'><Trash2 size={12} className='text-destructive mx-auto' /></Button>} />
        </div>
    );
};

export default PageHeadingWithDeleteButton;