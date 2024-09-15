import { apiSlice } from "@/redux/services/apiSlice";
import {
    ActivityLog,
    Boards,
    CardWithList,
    ListWithCards,
    WorkspaceLimit,
    Workspaces
} from "@/types";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveWorkspaces: builder.query<Workspaces[], void>({
            query: () => '/workspace/list/',
        }),
        retrieveBoards: builder.query<Boards[], string | undefined>({
            query: (workspaceSlug) => `/boards/${workspaceSlug}/`,
        }),
        retrieveWorkspaceBoards: builder.query<Boards, {
            workspaceSlug: string;
            boardSlug: string
        }>({
            query: ({
                workspaceSlug,
                boardSlug
            }) => `/workspace/${workspaceSlug}/${boardSlug}/`
        }),
        retrieveList: builder.query<ListWithCards[], {
            workspaceSlug: string | string[];
            boardSlug: string | string[];
        }>({
            query: ({
                workspaceSlug,
                boardSlug,
            }) => `/list/${workspaceSlug}/${boardSlug}/`
        }),
        retrieveCard: builder.query<CardWithList, {
            workspaceSlug: string | string[];
            boardSlug: string | string[];
            cardId: string | undefined;
            listId: string | undefined;
        }>({
            query: ({
                workspaceSlug,
                boardSlug,
                cardId,
                listId
            }) => `/card/${workspaceSlug}/${boardSlug}/${cardId}/${listId}/`
        }),
        retrieveActivityLog: builder.query<ActivityLog[], {
            workspaceSlug: string | string[];
            cardId?: string | undefined;
            listId?: string | undefined;
        }>({
            query: ({
                workspaceSlug,
                cardId,
                listId
            }) => {
                if (cardId && listId) {
                    return `/activity/${workspaceSlug}/${cardId}/${listId}/`
                } else {
                    return `/activity/${workspaceSlug}/`
                }
            }
        }),
        retrieveWorkspaceLimit: builder.query<WorkspaceLimit, string | undefined>({
            query: ( workspaceSlug ) => `/workspace_board_limit/${workspaceSlug}/limit/`
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
            query: ({ uid, token }) => ({
                url: '/users/activation/',
                method: 'POST',
                body: { uid, token },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
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
            query: ({ title, slug }) => ({
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
        listDelete: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                id
            }) => ({
                url: `/list/${workspaceSlug}/${boardSlug}/`,
                method: "DELETE",
                body: {
                    id
                },
            })
        }),
        cards: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                listId,
                title,
                slug
            }) => ({
                url: `/card/${workspaceSlug}/${boardSlug}/`,
                method: 'POST',
                body: {
                    title,
                    slug,
                    listId
                },
            })
        }),
        duplicateList: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                listId,
            }) => ({
                url: `/duplicatelist/${workspaceSlug}/${boardSlug}/`,
                method: 'POST',
                body: {
                    listId,
                },
            })
        }),
        cardUpdate: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                cardId,
                listId,
                title,
                slug,
                description,
            }) => {

                const body = {
                    ...(title !== undefined && { title }),
                    ...(slug !== undefined && { slug }),
                    ...(description !== undefined && { description })
                };

                return {
                    url: `/card/${workspaceSlug}/${boardSlug}/${cardId}/${listId}/`,
                    method: 'PATCH',
                    body: body
                };
            },
        }),
        cardDelete: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                cardId,
                listId
            }) => ({
                url: `/card/${workspaceSlug}/${boardSlug}/${cardId}/${listId}/`,
                method: 'DELETE',
            }),
        }),
        cardDuplicate: builder.mutation({
            query: ({
                workspaceSlug,
                boardSlug,
                cardId,
                listId
            }) => ({
                url: `/card_duplicate/${workspaceSlug}/${boardSlug}/${cardId}/${listId}/`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useRetrieveWorkspacesQuery,
    useRetrieveBoardsQuery,
    useRetrieveWorkspaceBoardsQuery,
    useRetrieveListQuery,
    useRetrieveCardQuery,
    useRetrieveActivityLogQuery,
    useRetrieveWorkspaceLimitQuery,
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
    useListDeleteMutation,
    useCardsMutation,
    useDuplicateListMutation,
    useCardUpdateMutation,
    useCardDeleteMutation,
    useCardDuplicateMutation
} = authApiSlice;