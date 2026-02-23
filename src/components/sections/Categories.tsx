'use client';

import { useGetProductsByCategoryQuery } from '@/redux/services/productApi';
import type { Product } from '@/types/product';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const SHOES_CATEGORY_ID = 4;

const Categories = () => {
    const { data: allProducts, isLoading } = useGetProductsByCategoryQuery({
        categoryId: SHOES_CATEGORY_ID,
        limit: 20,
    });

    // Defensive Filtering: Remove products with broken image URLs
    const products = allProducts || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const productCount = products.length;

    const handleNext = () => {
        if (productCount <= 2) return;
        setCurrentIndex((prev) => (prev + 1 >= productCount - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        if (productCount <= 2) return;
        setCurrentIndex((prev) => (prev - 1 < 0 ? productCount - 2 : prev - 1));
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + 2);

    return (
        <section className="mt-8 pl-4 overflow-x-hidden bg-primary md:pl-[60px]">
            {/* Header */}
            <div className="bg-primary rounded-tl-3xl md:rounded-tl-[48px] p-6 sm:p-8 md:p-14 md:pr-14 pb-24 sm:pb-28 md:pb-36 flex items-center justify-between">
                <h2 className="text-white text-2xl sm:text-4xl md:text-7xl lg:text-[74px] font-bold uppercase leading-none tracking-tight">
                    Categories
                </h2>
                <div className="flex gap-2 sm:gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={productCount <= 2}
                        className="bg-[#232321] border border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft size={20} className="sm:hidden" />
                        <ChevronLeft size={24} className="hidden sm:block" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={productCount <= 2}
                        className="bg-white hover:bg-[#E7E7E3] disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-primary transition-colors"
                    >
                        <ChevronRight size={20} className="sm:hidden" />
                        <ChevronRight size={24} className="hidden sm:block" />
                    </button>
                </div>
            </div>

            {/* Product Cards */}
            <div className="-mt-20 md:-mt-28 flex flex-col md:flex-row gap-0 overflow-hidden rounded-tl-[32px] md:rounded-tl-[64px] ">
                {isLoading ? (
                    [...Array(2)].map((_, i) => (
                        <div key={i} className="flex-1 min-h-[500px] md:min-h-[600px] bg-white/20 animate-pulse" />
                    ))
                ) : (
                    visibleProducts.map((product: Product, idx: number) => {
                        const imageUrl = product?.images?.[0] || '';
                        const mainTitle = product.title.toUpperCase();
                        const bgColor = idx === 0 ? 'bg-[#ECEEF0]' : 'bg-[#F6F6F6]';

                        return (
                            <div key={product.id} className={`group relative flex-1 min-h-[500px] md:min-h-[600px] transition-all duration-500 ${bgColor}`}>
                                {/* Product Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-14 mb-24">
                                    <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
                                        <Image
                                            src={imageUrl}
                                            alt={product.title}
                                            fill
                                            className="object-contain p-4"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>

                                {/* Info Bar */}
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="text-primary text-2xl sm:text-3xl md:text-5xl font-bold uppercase leading-[0.9] tracking-tight">
                                            {mainTitle}
                                        </h3>
                                    </div>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="bg-primary text-white w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center group-hover:bg-secondary transition-all transform group-hover:scale-110 shrink-0"
                                    >
                                        <ArrowUpRight size={28} strokeWidth={2.5} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default Categories;
