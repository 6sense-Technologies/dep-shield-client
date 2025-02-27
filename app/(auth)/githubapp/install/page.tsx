'use client';
import Loader from '@/components/loader';
import { GitHub_APP_URL} from '@/config';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const InstallRoute = () => {
  const params = useSearchParams();
  const authCode = params.get('code');
  const installation_id = params.get('installation_id');
  const session = useSession();
  const router = useRouter();

  let accessToken = null;

  if (session?.status === 'authenticated') {
    accessToken = session?.data?.accessToken;
  }
  // console.log("ACCESSTOKEN", accessToken);
  // console.log("SESSION", session);

  useEffect(() => {
    const installGithubApp = async () => {
      try {
        if (authCode && installation_id && accessToken) {
          const req = await axios.get(`${GitHub_APP_URL}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log("Success", req.data);
          router.push('/integrations');
        }
      } catch (error) {
        router.push('/integrations');
      }
    };

    installGithubApp();
  }, [authCode, installation_id, accessToken, router]);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default InstallRoute;