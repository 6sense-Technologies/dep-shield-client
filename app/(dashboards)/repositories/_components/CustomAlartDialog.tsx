import React from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

interface DisableModalProps {
    trigger: React.ReactNode;
    // togglefn: (data: string) => any;
}

const CustomAlertDialog: React.FC<DisableModalProps> = ({ trigger }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive text-[18px] font-semibold">Remove repository</AlertDialogTitle>
                    <AlertDialogDescription className='text-sm text-inputFooterColor'>
                    Remove the selected repository from your list. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='bg-white text-black hover:bg-white'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive text-white hover:bg-destructive'>Remove</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialog;