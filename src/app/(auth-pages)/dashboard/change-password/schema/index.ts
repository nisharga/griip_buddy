import { z } from "zod";

export const ChangePasswordSchema = z.object({ 
    oldPassword: z.string()
    .min(8, { message: "Be at least 8 characters long" }),
        
    password: z.string()
    .min(8, { message: "Be at least 8 characters long" }),

    confirmPassword: z.string()
        .min(8, { message: "Be at least 8 characters long" }) 
}).superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        })
    }
})