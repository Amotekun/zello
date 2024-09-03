import { apiSlice } from "@/redux/services/apiSlice";
import { Boards, List, Workspaces } from "@/types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveWorkspaces: builder.query<Workspaces[], void>({
            query: () => '/workspace/list/',
        }),
        retrieveBoards: builder.query<Boards[], string | undefined>({
            query: (workspaceSlug) => `/boards/${workspaceSlug}/`,
        }),
        retrieveWorkspaceBoards: builder.query<Boards, {workspaceSlug: string; boardSlug: string}>({
            query: ({
                workspaceSlug, 
                boardSlug
            }) => `/workspace/${workspaceSlug}/${boardSlug}/`
        }),
        retrieveList: builder.query<List[], {workspaceSlug: string | string[]; boardSlug: string | string[]}>({
            query: ({
                workspaceSlug, 
                boardSlug
            }) => `/list/${workspaceSlug}/${boardSlug}/`,
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
        }),
        boardUpdate: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                title,
                slug
            }) => ({
                url: `/workspace/${workspaceSlug}/${boardSlug}/`,
                method: "PATCH",
                body: {
                    title,
                    slug
                },
            })
        }),
        boardDelete: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug
            }) => ({
                url: `/workspace/${workspaceSlug}/${boardSlug}/`,
                method: "DELETE",
            })
        }),
        list: builder.mutation({
            query: ({
                workspace_slug,
                board_slug,
                title,
                slug
            }) => ({
                url: `/list/`,
                method: 'POST',
                body: {
                    workspace_slug,
                    board_slug,
                    title,
                    slug,

                },
            })
        }),
        listUpdate: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                title,
                slug,
                id
            }) => ({
                url: `/list/${workspaceSlug}/${boardSlug}/`,
                method: "PATCH",
                body: {
                    title,
                    slug,
                    id
                },
            })
        }),
    })
});

export const { 
    useRetrieveWorkspacesQuery,
    useRetrieveBoardsQuery,
    useRetrieveWorkspaceBoardsQuery,
    useRetrieveListQuery,
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useLogoutMutation,
    useWorkspaceMutation,
    useBoardsMutation,
    useBoardUpdateMutation,
    useBoardDeleteMutation,
    useListMutation,
    useListUpdateMutation,
} = authApiSlice