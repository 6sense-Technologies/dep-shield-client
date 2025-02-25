'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import OrDivider from '../_components/orDivider';
import { useRouter } from 'next/navigation';
import Logo from "../../../public/logo/depSheildLogo.svg";
import GoogleLogo from "../../../public/logo/googleLogo.svg";
import FacebookLogo from "../../../public/logo/facebookLogo.svg";
import AppleLogo from "../../../public/logo/appleLogo.svg";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TBasicSignupFormInputs } from '@/types/Auth.types';

import { useMutation } from '@tanstack/react-query';

import { BaseInput } from '@/components/BaseInput';
import { Circle } from '@phosphor-icons/react';
import Link from 'next/link';
import PageTitle from '@/components/PageTitle';
import { signIn, useSession } from 'next-auth/react';
import Loader from '@/components/loader';
import { Eye, EyeOff } from 'lucide-react';
import SmallLogo from '../../../public/logo/smallLogo.svg';
import axios from 'axios';
import { Toaster } from '@/components/ui/toaster';
import { SignupSchema } from '@/schema/authSchema';
import { handleBasicSignup } from '@/helpers/Auth/authApi';
import FooterTexts from '../_components/footerText';
import { Button } from '@/components/ui/button';
import comingSoonAlert from '@/components/comingsoonAlert';

const SignUp = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inviteData, setInviteData] = useState<{
    displayName: string;
    emailAddress: string;
  } | null>(null);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TBasicSignupFormInputs>({
    resolver: zodResolver(SignupSchema),
  });
  const session = useSession();


  const basicSignUpMutation = useMutation({
    mutationFn: handleBasicSignup,
    onSuccess: (data, formData: TBasicSignupFormInputs) => {
      signIn('credentials', {
        redirect: false,
        emailAddress: formData.emailAddress,
        password: formData.password,
      }).then(() => {
        session.update().then(() => {
          localStorage.setItem('user-email', data.userInfo.emailAddress);
          router.push('/sign-up/verification');
        });
      });
    },
    onError: (error: any) => {
      console.log(error.message);
      if (error.message === 'User already exists') {
        setErrorMessage('Email already exists.');
      }
      else
        setErrorMessage('Something went wrong. Please try again.');
    },
  });

  const handleSubmission: SubmitHandler<TBasicSignupFormInputs> = (data) => {
    setErrorMessage(null);
    basicSignUpMutation.mutate(data);
  };

  console.log("SignUp Status", session.status);

  useEffect(() => {
    if (session.status === 'loading') {
      <Loader />;
    }

    if (session.status === 'authenticated') {
      if (!session.data?.isVerified) {
        router.push('/sign-up/verification');
      } else if (session.data?.isVerified) {
        router.push('/dashboard');
      }
    } else if (session.status === 'unauthenticated') {
      router.push('/sign-in');
    }
  }, [session.status, session.data, router]);

  return (
    <div className='grid h-screen w-full grid-cols-1 overflow-y-hidden md:grid-cols-2'>
      <PageTitle
        pageName='Create Account'
        title='Try DepShield for Free • DepShield.io'
      />
      <div className='hidden w-full bg-blackishBg md:flex md:flex-col md:justify-between'>
        <div className='pl-[36px] pt-[36px]'>
          <Image src={Logo} alt='Depsheild Logo' width={160} />
        </div>
        <FooterTexts
          heading='Understand a library’s dependencies, licenses, and vulnerabilities before using it in a project to ensure security, compliance, and stability.'
        />
      </div>
      <div className='w-full overflow-y-auto bg-white pb-4'>
        <Toaster />
        <div className='mx-4 mr-9 mt-12 lg:flex lg:justify-end lg:gap-0'>
          <div className='flex justify-center px-3 text-center md:hidden'>
            <Image src={SmallLogo} alt='Ops4Team Logo' width={140} />
          </div>

          <Link href='/sign-in'>
            <Button variant='light' className='hidden text-sm lg:block'>
              Sign in
            </Button>
          </Link>
        </div>

        <div className='mx-auto w-full max-w-[465px] px-8 pb-5 pt-4 lg:px-5 lg:pt-0 2xl:pt-20'>
          <div>
            <p className='pt-6 text-3xl font-semibold text-black lg:pb-6'>
              Sign up
            </p>
          </div>
          <div className='flex gap-x-4 pt-8 pb-3'>
            {/* <Link href={"/sign-up/sso"}> */}
            <Button
              variant='extralight'
              size='minixl'
              onClick={() =>
                comingSoonAlert()}
            >
              SSO
            </Button>
            {/* </Link> */}
            <div className='flex gap-x-[16px]'>
              <Button
                variant='extralight'
                size='smallest'
                onClick={() =>
                  comingSoonAlert()}
              >
                <Image
                  src={GoogleLogo}
                  width={24}
                  height={24}
                  alt='googleLogo'
                />
              </Button>
              <Button
                variant='extralight'
                size='smallest'
                onClick={() =>
                  comingSoonAlert()}
              >
                <Image
                  src={FacebookLogo}
                  width={24}
                  height={24}
                  alt='facebookLogo'
                />
              </Button>
              <Button
                variant='extralight'
                size='smallest'
                onClick={() =>
                  comingSoonAlert()}
              >
                <Image src={AppleLogo} width={24} height={24} alt='applelogo' />
              </Button>
            </div>
          </div>
          <OrDivider
            text='OR CONTINUE WITH'
            className='text-[12px] text-textMuted'
          />

          <form onSubmit={handleSubmit(handleSubmission)}>
            <div className='w-full pt-2 lg:pt-0'>
              <label
                htmlFor='displayName'
                className='text-sm font-medium text-black'
              >
                Full Name
              </label>
              <BaseInput
                control={control}
                name='displayName'
                errors={errors}
                placeholder='Enter your full name'
                className='mt-[4px] w-full placeholder:text-subHeading'
                disabled={!!inviteData}
              />
            </div>
            <div className='w-full pt-6 lg:pt-5'>
              <label
                htmlFor='emailAddress'
                className='text-sm font-medium text-black'
              >
                Email
              </label>
              <BaseInput
                type='email'
                control={control}
                name='emailAddress'
                errors={errors}
                externalError={errorMessage}
                placeholder='Enter your email'
                className='mt-[4px] w-full placeholder:text-subHeading'
                disabled={!!inviteData}
              />
            </div>
            <div className='w-full pt-6 lg:pt-5'>
              <label
                htmlFor='password'
                className='text-sm font-medium text-black'
              >
                Password
              </label>
              <div className='relative'>
                <BaseInput
                  control={control}
                  name='password'
                  type={passwordVisible ? 'text' : 'password'}
                  errors={errors}
                  placeholder='Password'
                  className='mt-[4px] w-full placeholder:text-subHeading'
                />
                <button
                  type='button'
                  onClick={handlePasswordVisibility}
                  className='absolute right-5 top-2.5'
                >
                  {passwordVisible ? (
                    <Eye size={20} className='text-xl text-inputFooterColor' />
                  ) : (
                    <EyeOff
                      size={20}
                      className='text-xl font-normal text-inputFooterColor'
                    />
                  )}
                </button>
              </div>
            </div>

            <Button variant='dark' className='mt-[52px] w-full lg:mt-8'>
              {basicSignUpMutation.isPending ? (
                <Circle className='animate-spin' />
              ) : (
                'Sign up'
              )}
            </Button>
          </form>

          <div className='mt-4 block lg:hidden'>
            <Link href={'/sign-in'}>
              <Button variant='light' className='w-full text-sm'>
                Sign in
              </Button>
            </Link>
          </div>

          <div>
            <p
              className='px-10 pt-3 text-center text-sm text-textMuted'
              onClick={() =>
                comingSoonAlert()
              }
            >
              By clicking continue, you agree to our {''}
              <span className='cursor-pointer underline'>
                Terms of Service
              </span>{' '}
              and{' '}
              <span className='cursor-pointer underline'>Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
