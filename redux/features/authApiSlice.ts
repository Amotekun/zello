import { apiSlice } from "@/redux/services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: ({
                first_name,
                last_name,
                email,
                password,
                re_password,
            }) => ({
                url: '/users/',
                method: 'POST',
                body: {
                    first_name,
                    last_name,
                    email,
                    password,
                    re_password,
                },
            }),
        }),
        activation: builder.mutation({
            query: ({uid, token}) => ({
                url: '/users/activation/',
                method: 'POST',
                body: { uid, token },
            }),
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: '/jwt/create/',
                method: 'POST',
                body: { email, password },
            }),
        }),
    }),
});

export const { 
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
} = authApiSlice