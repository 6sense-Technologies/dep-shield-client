"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/logo/depSheildLogo.svg";
import { useRouter } from "next/navigation";
import AuthPageHeader from "../../_components/authPageHeader";
import PageTitle from "@/components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { TVerifyEmail } from "@/types/Auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Otpfields from "./_components/otpfields";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader";
import { Circle } from "@phosphor-icons/react";
import SmallLogo from '../../../../public/logo/smallLogo.svg';
import { VerifyEmailSchema } from "@/schema/authSchema";
import { handleOtp, handleResendOTP } from "@/helpers/Auth/authApi";
import FooterTexts from "../../_components/footerText";
import { Button } from "@/components/ui/button";
const Verify = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes timer
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("user-email");
    setUserEmail(email);

    const endTime = localStorage.getItem("endTime");
    const otpExpired = localStorage.getItem("otpExpired");

    if (otpExpired === "true") {
      setIsExpired(true);
      setTimeLeft(0);
    } else if (endTime) {
      const remainingTime = Math.floor((parseInt(endTime, 10) - Date.now()) / 1000);
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        setIsExpired(true);
        setTimeLeft(0);
        localStorage.setItem("otpExpired", "true");
      }
    } else {
      localStorage.setItem("endTime", (Date.now() + timeLeft * 1000).toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      localStorage.removeItem("endTime");
      localStorage.setItem("otpExpired", "true");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          setIsExpired(true);
          localStorage.removeItem("endTime");
          localStorage.setItem("otpExpired", "true");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resetTimer = () => {
    const newEndTime = Date.now() + 120 * 1000;
    setTimeLeft(120);
    setIsExpired(false);
    localStorage.setItem("endTime", newEndTime.toString());
    localStorage.setItem("otpExpired", "false");
  };

  const formatTime = (seconds: number) => {
    if (seconds <= 0) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TVerifyEmail>({
    resolver: zodResolver(VerifyEmailSchema),
  });

  const { data: session, status, update } = useSession();

  const otpMutation = useMutation({
    mutationFn: handleOtp,
    onSuccess: (data) => {
      update({ isVerified: data.isValidated }).then(() => {
        router.push("/dashboard");
      });
      localStorage.removeItem("endTime");
    },
    onError: (error) => {
      if (error.message) {
        setVerifyError("Incorrect OTP.");
      }
    },
  });

  const handleSubmission: SubmitHandler<TVerifyEmail> = (data) => {
    setVerifyError(null);
    const email = userEmail || "";
    const payload: TVerifyEmail = {
      token: data.token,
    };
    otpMutation.mutate(payload);
  };

  const ResendOTPHandler = (email: string) => {
    handleResendOTP(email);
    resetTimer();
    reset({ token: "" });
    if (errors.token) {
      errors.token.message = "";
    }
    setVerifyError(null);
  };

  console.log("SignUp Status",status);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    if (!session.isVerified) {
      router.push("/sign-up/verification");
    }
    if (session.isVerified) {
      router.push("/dashboard");
      return <Loader />;
    }
  } else if (status === "unauthenticated") {
    router.push("/sign-in");
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 ">
      <PageTitle
        pageName="Verify Account"
        title="Try Ops4 Team for Free • Ops4 Team"
      />
      <div className="bg-blackishBg w-full h-screen md:flex md:flex-col md:justify-between hidden">
        <div className="pl-[36px] pt-[36px]">
          <Image src={Logo} alt="Ops4Team Logo" />
        </div>
        <FooterTexts
          heading="“This library has saved me countless hours of work and helped me deliver
        stunning designs to my clients faster than ever before.”"
          subHeading="Sofia Davis"
        />
      </div>
      <div className="bg-white w-full my-auto">
        <div className="flex justify-center lg:justify-start md:hidden mt-9 mx-4 md:mr-9  md:gap-0">
          <div className="block md:hidden text-center px-3">
            <Image src={SmallLogo} alt="Ops4Team Logo" />
          </div>
        </div>

        <div className="w-full max-w-[465px] mx-auto px-8 pt-6 lg:px-6 lg:pt-0">
          <div>
            <AuthPageHeader
              title="Verify Email"
              subTitle={`We sent a six digit code to ${userEmail}. Enter the code below:`}
              titleclassName="text-2xl md:text-2xl text-deepBlackColor pt-[22px]"
              subTitleClassName="text-sm md:text-sm pt-[4px] pb-[20px]"
            />
          </div>

          <form onSubmit={handleSubmit(handleSubmission)}>
            <div className="w-full relative pt-6 lg:pt-0">
              <label htmlFor="otp" className="text-black font-medium text-sm">
                One-Time Password
              </label>
              <div className="flex mt-4">
                <Otpfields control={control} />
              </div>
              <div className="flex justify-between items-center relative max-w-[310px] lg:max-w-[240px]">
                <p className="text-sm text-destructive font-medium pt-2">
                  {isExpired
                    ? "OTP is expired."
                    : errors.token
                      ? errors.token.message
                      : verifyError
                        ? verifyError
                        : ""}
                </p>

                <p className="text-sm text-textMuted pt-2">
                  {`${formatTime(timeLeft)}`}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-textMuted pt-4 text-start">
                Didn&apos;t receive an email? Try checking your junk folder.
              </p>
              {isExpired && (
                <p
                  className="text-sm text-deepBlackColor font-medium underline pt-1 cursor-pointer"
                  onClick={() => {
                    ResendOTPHandler(userEmail || "");
                  }}
                >
                  Resend
                </p>
              )}
            </div>

            <Button
              variant="submit"
              className="mt-6 bg-primary hover:bg-primary hidden lg:block"
            >
              {otpMutation.isPending ? (
                <Circle className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>

            <Button
              variant="submitExtended"
              className="mt-6 bg-primary hover:bg-primary block lg:hidden"
            >
              {otpMutation.isPending ? (
                <Circle className="animate-spin mx-auto" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;