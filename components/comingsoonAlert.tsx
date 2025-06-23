import { toast } from '@/hooks/use-toast'

const comingSoonAlert = () => {
    return (
        toast({
            title: 'Stay Tuned!',
            description:
                'This feature is coming soon.',
        })
    )
}

export default comingSoonAlert
