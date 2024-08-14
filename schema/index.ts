import * as z from 'zod'

export const RegisterSchema = z.object({
    first_name: z.string().min(1, {
        message: "Name is required",
    }),
    last_name: z.string().min(1, {
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    re_password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    })
}). refine((data) => data.password === data.re_password, {
    message: "Password do not match",
    path: ['re_password'], // this path will point to the field with the error
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
})

export const WorkspaceSchema = z.object({
    title: z.string().min(1, {
        message: "title is required",
    })
})