import { passwordRegex } from '@/constants/globalConstants';
import { z } from 'zod';

export const LoginSchema = z.object({
  emailAddress: z
    .string({ required_error: 'Email is required.' })
    .min(1, { message: 'Email is required.' })
    .email('Incorrect email.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, { message: 'Password is required.' }),
});

export const SignupSchema = z.object({
  displayName: z
    .string({ required_error: 'Full name is required.' })
    .min(1, { message: 'Full name is required.' })
    .regex(/^[A-Za-z\s]+$/, { message: 'Invalid name. Use letters only.' }),
  emailAddress: z
    .string({ required_error: 'Email is required.' })
    .min(1, { message: 'Email is required.' })
    .email('Incorrect email.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .regex(
      passwordRegex,
      'Password needs: 8+ characters, A-Z, a-z, 0-9, & symbol.'
    ),
});

export const VerifyEmailSchema = z.object({
  token: z.string({ required_error: 'OTP is required.' }),
});
