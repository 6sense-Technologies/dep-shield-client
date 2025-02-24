export type TFooterText = 
{
    heading: string;
    subHeading?: string;
}

export type OrDividerProps =
{
    text: string;
    className?: string;
}

export type TBasicSignInFormInputs = 
{
    emailAddress: string;
    password: string;
}

export type TBasicSignupFormInputs = 
{
    displayName: string;
    emailAddress: string;
    password: string;
}

export type TVerifyEmail = 
{
    token: string;
    emailAddress?: string;
}

export type TResndOtp =
{
    email: string | undefined;
}