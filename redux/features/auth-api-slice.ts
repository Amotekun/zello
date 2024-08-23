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
        }),
        boards: builder.mutation({
            query: ({
                title,
                slug,
                image_id,
                image_thumb_url,
                image_full_url,
                image_user_name, 
                image_link_html,
                workspace_slug,
            }) => ({
                url: '/boards/',
                method: 'POST',
                body: {
                    title,
                    slug,
                    image_id,
                    image_thumb_url,
                    image_full_url,
                    image_user_name,
                    image_link_html,
                    workspace_slug
                },
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
    useBoardsMutation
} = authApiSlice