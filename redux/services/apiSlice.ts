import { 
    createApi, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError, 
    fetchBaseQuery 
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logout, setAuth } from "@/redux/features/auth-slice"

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api`,
    credentials: `include`,
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async(args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const releaseResult = await baseQuery(
                    {
                        url: '/jwt/refresh/',
                        method: 'POST',
                    },
                    api, extraOptions
                );
                if (releaseResult.data) {
                   /*  api.dispatch(setAuth()); */
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());

                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                }
            } catch (error) {
                console.log("BaseQueryWithReauth error: ", error);
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});