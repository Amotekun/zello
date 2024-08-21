import { apiSlice } from "@/redux/services/apiSlice";
import { Workspaces } from "@/types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveWorkspaces: builder.query<Workspaces[], void>({
            query: () => '/workspace/list/',
        }),
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
        logout: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST',
            }),
        }),
        workspace: builder.mutation({
            query: ({title, slug}) => ({
                url: '/workspace/',
                method: 'POST',
                body: { title, slug },
            })
        })
    }),
});

export const { 
    useRetrieveWorkspacesQuery,
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useLogoutMutation,
    useWorkspaceMutation,
} = authApiSlice