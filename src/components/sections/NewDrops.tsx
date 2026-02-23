'use client';

import { useGetProductsByCategoryQuery } from '@/redux/services/productApi';
import Image from 'next/image';
import Link from 'next/link';

const SHOES_CATEGORY_ID = 4;


const NewDrops = () => {
    const {
        data: allProducts,
        isLoading,
        isError,
    } = useGetProductsByCategoryQuery({
        categoryId: SHOES_CATEGORY_ID,
        limit: 10,
        offset: 0,
    });

    // Defensive Filtering: Remove products with broken image URLs (usually split by commas in Platzi API)
    const products = allProducts?.slice(0, 4) || [];

    console.log(products);
    return (
        <section className="mt-16 px-4 md:px-15">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 lg:mb-12">
                <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold uppercase leading-tight lg:leading-[0.9] text-primary">
                    Don&rsquo;t miss out
                    <br />
                    new drops
                </h2>
                <button className="bg-[#4A69E2] text-white text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider py-2.5 lg:py-4 px-4 lg:px-8 rounded-lg lg:rounded-xl hover:bg-[#3b5bd9] transition-colors shrink-0">
                    Shop New Drops
                </button>
            </div>

            {/* Product Grid */}
            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-white/60 rounded-[28px] aspect-square mb-4" />
                            <div className="h-4 bg-white/60 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-white/60 rounded w-1/2 mb-3" />
                            <div className="h-12 bg-[#d4d4d0] rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <p className="text-center text-red-500 py-10">
                    Failed to load products. Please try again later.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 justify-items-center">
                    {products?.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group transition-transform duration-300 hover:scale-[1.02] flex flex-col p-2 w-full"
                        >
                            {/* Image Container */}
                            <div className="relative bg-white rounded-3xl overflow-hidden aspect-302/334 shrink-0 w-full">
                                {/* New Badge */}

                                <Image
                                    src={product.images[0]}
                                    alt={product.title}
                                    fill
                                    className="p-2 rounded-[29px] "
                                />
                                <span className="absolute top-2 left-2 z-10 w-14.5 h-9.5 flex items-center justify-center bg-[#4A69E2] text-white text-[12px] font-medium rounded-tl-3xl rounded-br-3xl">
                                    New
                                </span>
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col gap-4 grow pt-4">
                                <h3 className="text-sm md:text-2xl font-semibold uppercase text-[#232321] leading-tight line-clamp-2">
                                    {product.title}
                                </h3>

                                {/* CTA Button */}
                                <button className="mt-auto w-full bg-[#232321] text-white text-xs md:text-sm font-bold uppercase tracking-wider py-4 px-4 rounded-xl hover:bg-[#3a3a38] transition-colors flex items-center justify-center gap-1">
                                    View Product -
                                    <span className="text-[#FFA52F]">
                                        ${product.price}
                                    </span>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default NewDrops;
