import type { Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProductsByCategory: builder.query<
            Product[],
            { categoryId: number; limit?: number; offset?: number }
        >({
            query: ({ categoryId, limit = 4, offset = 0 }) =>
                `/categories/${categoryId}/products?offset=${offset}&limit=${limit}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Product' as const,
                            id,
                        })),
                        { type: 'Product', id: 'LIST' },
                    ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),
    }),
});

export const { useGetProductsByCategoryQuery } = productApi;
