'use client'

import { Button } from '@/components/ui/button';
import { Group, Input, Modal, Radio } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ScanText, Share } from 'lucide-react';
import Link from 'next/link';
import RepositorySearchbar from './repositorySearchbar';
import { useState } from 'react';

const MyRepoSearchArea = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const onSubmit = () => {
    console.log('🚀 - MyRepoSearchArea - role:', role)
    console.log('🚀 - MyRepoSearchArea - email:', email)
    setEmailError('')

  }

  return (
    <div className='flex w-full flex-col justify-between lg:flex-row'>
      <RepositorySearchbar
        placeholder='Search by repository name'
        name='MyReposearch'
        btntext='MyRepoSearch'
        className='relative mb-[26px] mt-4 w-full gap-x-2 lg:max-w-[300px]'
        variant='light'
      />
      <div className='flex flex-col space-y-4 lg:flex-row lg:space-x-4'>
        <div className='flex space-x-4'>
          <Button onClick={open} size='xsTight' variant='light' className='lg:mt-4'>
            <Share />
            <span className='text-sm font-medium text-deepBlackColor lg:hidden'>
              Share
            </span>
          </Button>
          <Button size='xsExtended' variant='light' className='lg:mt-4'>
            <ScanText className='lg:hidden' />
            Scan all
          </Button>
        </div>
        <Link href='/repositories/add'>
          <Button size='xsExtended' className='mr-4'>
            Add
          </Button>
        </Link>
      </div>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <section>
          <h2 className='font-semibold'>Share repository</h2>
          <div className='text-[#64748B] text-sm'>Share the repository via email or direct link.</div>
        </section>
        <section className='mt-8'>
          <Radio.Group name="userRole" label="User Role" value={role} onChange={setRole}>
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
          </Radio.Group>
          <Input.Wrapper label="Email" className='mt-4' error={emailError}>
            <Input classNames={{ input: 'bg-[#F1F5F9]' }} placeholder="Email" onChange={(e) => setEmail(e?.target?.value)} error={emailError} />
          </Input.Wrapper>
        </section>
        <section className='text-right ml-auto mt-10'>
          <Button onClick={onSubmit} disabled={!role || !email} className=''>Share</Button>
        </section>
      </Modal>
    </div>
  );
};

export default MyRepoSearchArea;
