import { Button } from '@/components/ui/button';
import { getRepositoryBranches, updateDefaultBranch } from '@/helpers/githubApp/githubApi';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { IHeadingProps, RepositoryBranch, RepositoryBranches, RepositoryDetails } from '@/types/repo.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import CustomAlertDialog from '../../../_components/CustomAlartDialog';
import SharedMenu from './SharedMenu';
import { DropdownOption, VulnabalitiesDropdown } from './VulnabalitiesDropdown';

interface PageHeadingWithDeleteButtonProps extends IHeadingProps {
    repoId: string;
    repositoryDetails?: RepositoryDetails;
}

const PageHeadingWithDeleteButton: FC<PageHeadingWithDeleteButtonProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, repoId, repositoryDetails }) => {
    const session = useSession();
    const [selectedBranch, setSelectedBranch] = useState<string>("");

    const { data: branchesData } = useQuery<RepositoryBranches>({
        queryKey: ['branchesData', repoId, session],
        queryFn: () => getRepositoryBranches(repoId as string, session),
        enabled: !!repoId && !!session.data?.accessToken,
    });

    // Set the selected branch to the default branch when repository details are loaded
    useEffect(() => {
        if (repositoryDetails?.defaultBranch && !selectedBranch) {
            setSelectedBranch(repositoryDetails.defaultBranch);
        }
    }, [repositoryDetails?.defaultBranch, selectedBranch]);

    const updateDefaultBranchMutation = useMutation({
        mutationFn: ({ repoId, branch, session }: { repoId: string; branch: string; session: any }) =>
            updateDefaultBranch(repoId, branch, session)
    })

    const handleUpdateDefaultBranch = (branch: string) => {
        updateDefaultBranchMutation.mutate({ repoId, branch, session }, {
            onSuccess: () => {
                toast({
                    title: 'Default branch updated successfully',
                    variant: 'default',
                });
            },
            onError: () => {
                toast({
                    title: 'Failed to update default branch',
                    variant: 'destructive',
                });
            }
        });
    }

    // Prepare branch options for dropdown
    const branchOptions: DropdownOption[] = Array.isArray(branchesData?.data)
        ? branchesData.data.map((branch: RepositoryBranch) => ({ value: branch.name, label: branch.name }))
        : [];

    // Use the default branch from repository details or fallback to "main"
    const defaultBranchName = repositoryDetails?.defaultBranch || "main";

    return (
        <div className='flex items-center gap-x-4 flex-wrap'>
            <div className={cn(className)}>
                <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
            </div>
            <div className='flex items-center gap-x-2'>
                <div>
                    <VulnabalitiesDropdown
                        placeholder={defaultBranchName}
                        name="vul"
                        active={true}
                        className="mt-4 w-[140px] !placeholder:text-black"
                        options={branchOptions}
                        value={selectedBranch || defaultBranchName}
                        onChange={(val) => {
                            setSelectedBranch(val);
                            handleUpdateDefaultBranch(val);
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <SharedMenu />
                </div>
                <CustomAlertDialog trigger={<Button variant="lightDestructive" size="tight" className='mt-4'><Trash2 size={12} className='text-destructive mx-auto' /></Button>} />
            </div>
        </div>
    );
};

export default PageHeadingWithDeleteButton;