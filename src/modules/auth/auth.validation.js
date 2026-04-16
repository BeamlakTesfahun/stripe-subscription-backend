import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        fullName: z
            .string()
            .trim()
            .min(2, 'Full name must be at least 2 characters')
            .optional(),
        email: z.string().trim().email('Invalid email address').toLowerCase(),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password is too long'),
    }),
    params: z.object({}),
    query: z.object({}),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email('Invalid email address').toLowerCase(),
        password: z.string().min(1, 'Password is required'),
    }),
    params: z.object({}),
    query: z.object({}),
});
