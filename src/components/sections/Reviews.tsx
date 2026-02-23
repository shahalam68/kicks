'use client';

import reviewsData from '@/data/reviews.json';
import { Star } from 'lucide-react';
import Image from 'next/image';

const Reviews = () => {
    return (
        <section className="mt-20 px-4 md:px-[60px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-5xl md:text-7xl lg:text-[74px] font-bold uppercase text-primary leading-none tracking-tight">
                    Reviews
                </h2>
                <button className="bg-[#4A69E2] text-white text-xs md:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors">
                    See All
                </button>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewsData.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-[32px] overflow-hidden flex flex-col"
                    >
                        {/* Top Info section */}
                        <div className="p-8 pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="max-w-[75%]">
                                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
                                        {review.title}
                                    </h3>
                                    <p className="text-[#70706E] text-xs md:text-sm font-medium leading-relaxed">
                                        {review.description}
                                    </p>
                                </div>
                                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#4A69E2] shrink-0">
                                    <Image
                                        src={review.user.avatar}
                                        alt={review.user.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-0.5 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < Math.floor(review.rating) ? "#FFA52F" : "none"}
                                        stroke={i < Math.floor(review.rating) ? "#FFA52F" : "#70706E"}
                                    />
                                ))}
                                <span className="ml-2 text-primary font-bold text-base md:text-lg">
                                    {review.rating.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        {/* Large Image Section */}
                        <div className="relative w-full aspect-[4/3] mt-auto overflow-hidden rounded-b-[32px]">
                            <Image
                                src={review.image}
                                alt="Product Review"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;
