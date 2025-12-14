import z from "zod";

export const profileDetailsSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 4 characters.",
    }),
    userId: z.string({
        message: "userId must be at least 4 characters.",
    }), 
    email: z.string({
        message: "Provide a valid email address",
    }).email(), 
    phone: z
        .string()
        .refine(Number, { message: "Invalid phone number" }),
    gender: z.string({
        message: "gender must be provided",
    }), 
    dateOfBirth: z
        .string({
            message: "dateOfBirth must be provided",
        })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: "Invalid date format. Use YYYY-MM-DD.",
        }), 
})