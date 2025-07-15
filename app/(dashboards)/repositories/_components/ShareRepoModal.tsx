import { shareRepo } from '@/app/(dashboards)/repositories/queryFn/queryFn';
import { Button } from '@/components/ui/button';
import { emailValidator } from '@/helpers/helpers';
import { Input, Modal } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner'

const ShareRepoModal = ({ selectedRepoId, close, opened, session }: { selectedRepoId: string, close: any, opened: boolean, session: any }) => {
    const shareRepoMutation = useMutation({ mutationFn: shareRepo })
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const onSubmit = () => {
        console.log('🚀 - MyRepoSearchArea - email:', email)
        setEmailError('')

        if (!emailValidator?.test(email)) {
            setEmailError('Invalid Email')

        } else {
            const data = {
                session,
                repoId: selectedRepoId,
                sharedWith: email
            }

            shareRepoMutation.mutate(data,
                {
                    onSuccess() {
                        toast.success('Repository shared successfully')
                        close()
                        setEmail('')
                    },
                    onError(error) {
                        console.log('🚀 - onError - error:', error)
                        toast.error('User not found')
                    },
                }
            )
        }
    }
    return (
        <Modal
            opened={opened}
            onClose={() => {
                setEmailError('')
                close()
                setEmail('')
            }}
            centered
            withCloseButton={false}
        >
            <section>
                <h2 className='font-semibold'>Share repository</h2>
                <div className='text-[#64748B] text-sm'>Share the repository via email or direct link.</div>
            </section>
            <section className='mt-8'>
                {/* <Radio.Group name="userRole" label="User Role" value={role} onChange={setRole}>
            <Group mt="xs">
              <Radio
                value="user"
                label="User"
                color="dark"
                variant="outline"
                styles={{
                  radio: { borderColor: 'black', borderRadius: '999px', width: '16px', height: '16px' },
                  icon: { backgroundColor: 'black', borderRadius: '999px', width: '10px', height: '10px', top: '3px', left: '3px' },
                  label: { color: 'black' },
                }}
              />
              <Radio
                value="admin"
                label="Admin"
                color="dark"
                variant="outline"
                styles={{
                  radio: { borderColor: 'black', borderRadius: '999px', width: '16px', height: '16px' },
                  icon: { backgroundColor: 'black', borderRadius: '999px', width: '10px', height: '10px', top: '3px', left: '3px' },
                  label: { color: 'black' },
                }}
              />
            </Group>
          </Radio.Group> */}
                <Input.Wrapper label="Email" className='mt-4' error={emailError}>
                    <Input
                        classNames={{ input: 'bg-[#F1F5F9]' }}
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e?.target?.value)
                            setEmailError('')
                        }}
                        error={emailError}
                    />
                </Input.Wrapper>
            </section>
            <section className='text-right ml-auto mt-10'>
                <Button onClick={onSubmit} disabled={!email} className=''>Share</Button>
            </section>
        </Modal>
    )
}

export default ShareRepoModal