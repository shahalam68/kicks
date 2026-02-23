import type { Category, Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1',
    }),
    tagTypes: ['Product', 'Category'],

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
        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getCategories: builder.query<Category[], void>({
            query: () => '/categories',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Category' as const,
                            id,
                        })),
                        { type: 'Category', id: 'LIST' },
                    ]
                    : [{ type: 'Category', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery
} = productApi;

