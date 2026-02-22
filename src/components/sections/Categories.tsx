'use client';

import { useGetProductsByCategoryQuery } from '@/redux/services/productApi';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Categories = () => {
    const { data: products, isLoading } = useGetProductsByCategoryQuery({
        categoryId: 4,
        limit: 20,
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const productCount = products?.length || 0;

    const handleNext = () => {
        if (productCount <= 2) return;
        setCurrentIndex((prev) => (prev + 1 >= productCount - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        if (productCount <= 2) return;
        setCurrentIndex((prev) => (prev - 1 < 0 ? productCount - 2 : prev - 1));
    };

    const visibleProducts = products?.slice(currentIndex, currentIndex + 2) || [];

    return (
        <section className="mt-8">
            {/* Dark Header */}
            <div className="bg-primary rounded-t-[48px] p-8 md:p-14 pb-28 md:pb-36 flex items-center justify-between">
                <h2 className="text-white text-5xl md:text-7xl lg:text-[74px] font-bold uppercase leading-none tracking-tight">
                    Categories
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={productCount <= 2}
                        className="bg-[#E7E7E3]/20 hover:bg-[#E7E7E3]/30 disabled:opacity-30 disabled:cursor-not-allowed w-12 h-12 rounded-lg flex items-center justify-center text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={productCount <= 2}
                        className="bg-[#E7E7E3] disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-lg flex items-center justify-center text-primary hover:bg-white transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Category Cards */}
            <div className="-mt-20 md:-mt-28 flex flex-col md:flex-row gap-0 overflow-hidden rounded-[32px] md:rounded-[64px] bg-[#ECEEF0]">
                {isLoading ? (
                    // Skeleton Loaders
                    [...Array(2)].map((_, i) => (
                        <div key={i} className={`flex-1 min-h-[500px] md:min-h-[600px] bg-white/20 animate-pulse ${i === 0 ? 'border-r border-white/10' : ''}`} />
                    ))
                ) : (
                    visibleProducts.map((product, idx) => {
                        const imageUrl = product?.images?.[0] || '';
                        // Format title: Take first 2 words and make uppercase
                        const displayTitle = product.title
                            .split(' ')
                            .slice(0, 2)
                            .join(' ')
                            .toUpperCase();

                        return (
                            <div key={product.id} className={`group relative flex-1 min-h-[500px] md:min-h-[600px] transition-all duration-500 ${idx === 0 ? 'border-r border-white/10' : ''}`}>
                                {/* Product Image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 mb-20">
                                    <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
                                        <Image
                                            src={imageUrl}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>

                                {/* Info Bar */}
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex items-end justify-between">
                                    <h3 className="text-primary text-3xl md:text-5xl font-bold uppercase leading-[1] max-w-[300px]">
                                        {displayTitle}
                                        <br />
                                        SHOES
                                    </h3>
                                    <button className="bg-primary text-white w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center group-hover:bg-secondary transition-all transform group-hover:scale-110">
                                        <ArrowUpRight size={28} strokeWidth={2.5} />
                                    </button>
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
