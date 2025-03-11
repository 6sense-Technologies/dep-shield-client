'use client';
import Loader from '@/components/loader';
import { TEMP_BACKEND_URL } from '@/config';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

const InstallContent = () => {
  const params = useSearchParams();
  const authCode = params.get('code');
  const installation_id = params.get('installation_id');
  const session = useSession();
  const router = useRouter();

  let accessToken = null;

  if (session?.status === 'authenticated') {
    accessToken = session?.data?.accessToken;
  }

  const installGithubApp = async () => {
    if (authCode && installation_id && accessToken) {
      const req = await axios.get(`${TEMP_BACKEND_URL}/github-app/install?code=${authCode}&installation_id=${installation_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return req.data;
    }
  };

  const installGithubAppMutation = useMutation({
    mutationFn: installGithubApp,
    onSuccess: (data) => {
      console.log("Success", data);
      router.push('/integrations');
    },
    onError: () => {
      router.push('/integrations');
    },
  });

  useEffect(() => {
    if (authCode && installation_id && accessToken){
      installGithubAppMutation.mutate();
    }
  }, [accessToken]);

  return (
    <div>
      <Loader />
    </div>
  );
};

const InstallRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <InstallContent />
    </Suspense>
  );
};

export default InstallRoute;