'use client';

import { useGetProductsByCategoryQuery } from '@/redux/services/productApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface RecommendationsProps {
    categoryId?: number;
    currentProductId?: number;
}

const Recommendations = ({ categoryId = 4, currentProductId }: RecommendationsProps) => {
    const { data: allProducts, isLoading, isError } = useGetProductsByCategoryQuery({
        categoryId,
        limit: 12,
    });

    const products = allProducts?.filter(p => p.id !== currentProductId) || [];
    const [startIndex, setStartIndex] = useState(0);

    // Number of items to show based on screen size (simplified for now)
    const itemsToShow = 4;
    const maxIndex = Math.max(0, products.length - itemsToShow);

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
    };

    const visibleProducts = products.slice(startIndex, startIndex + itemsToShow);

    // If less than itemsToShow, pad with remaining or loop (simplified)
    const displayProducts = visibleProducts.length < itemsToShow && products.length > itemsToShow
        ? [...visibleProducts, ...products.slice(0, itemsToShow - visibleProducts.length)]
        : visibleProducts;

    if (isLoading) return <div className="py-20 text-center uppercase font-bold text-gray-400">Loading Recommendations...</div>;
    if (isError || products.length === 0) return null;

    return (
        <section className="">
            <div className="flex items-center justify-between mb-8 lg:mb-12">
                <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold text-[#232321] tracking-tight">
                    You may also like
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-lg bg-[#A3A3A3] text-white flex items-center justify-center hover:bg-[#232321] transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-lg bg-[#232321] text-white flex items-center justify-center hover:bg-[#4a4a4a] transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 justify-items-center">
                {displayProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group transition-transform duration-300 hover:scale-[1.02] flex flex-col p-2 w-full"
                    >
                        {/* Image Container */}
                        <div className="relative bg-white rounded-3xl overflow-hidden aspect-302/334 shrink-0 w-full">
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

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-12">
                {[...Array(Math.min(4, products.length))].map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${startIndex === i ? 'bg-[#4A69E2] w-12' : 'bg-[#232321]/20 w-8'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Recommendations;
