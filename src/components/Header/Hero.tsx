'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const Hero = () => {
    const [images, setImages] = useState([
        '/heroOne.jpeg',
        '/heroTwo.jpeg',
        '/heroThree.jpeg',
    ]);

    const handleSwap = useCallback((index: number) => {
        setImages((prev) => {
            const newImages = [...prev];
            [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
            return newImages;
        });
    }, []);

    // Auto-rotate every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleSwap(1);
        }, 3000);
        return () => clearInterval(interval);
    }, [handleSwap]);

    return (
        <section className="flex flex-col gap-4 px-4 md:px-15">
            <div className="text-center">
                <h2 className="text-[48px] sm:text-[80px] md:text-[223.5px] font-bold text-primary uppercase leading-none tracking-tighter">
                    DO IT <span className="text-secondary italic">Right</span>
                </h2>
            </div>

            <div className="relative w-full h-[500px] lg:h-200 overflow-hidden rounded-3xl lg:rounded-[64px] bg-[#232321] text-white">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={images[0]}
                        alt="Nike Air Max Main"
                        fill
                        className="object-cover opacity-90 transition-all duration-500"
                        priority
                    />
                </div>

                {/* Vertical Badge - Hidden on mobile for better space utility */}
                <div className="hidden md:flex absolute top-20 left-0 h-75 w-16 items-center justify-center bg-[#232321]/80 backdrop-blur-sm z-10 border-r border-white/10 p-6 rounded-r-2xl">
                    <p className="whitespace-nowrap -rotate-90 text-[16px] font-semibold tracking-widest uppercase">
                        Nike product of the year
                    </p>
                </div>
                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-10 z-10 ">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-7xl uppercase font-bold mb-4">
                            NIKE AIR MAX
                        </h1>
                        <p className="text-base md:text-xl font-medium opacity-90 mb-6 lg:mb-8 max-w-sm">
                            Nike introducing the new air max for everyone&apos;s comfort
                        </p>
                        <button className="bg-[#4A69E2] hover:bg-[#3A59D2] text-white font-bold py-3 lg:py-4 px-8 lg:px-10 rounded-xl transition-all uppercase tracking-wider text-xs lg:text-sm">
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* Right Side Thumbnails */}
                <div className="absolute right-4 bottom-4 lg:right-8 lg:bottom-8 flex flex-col gap-3 lg:gap-4 z-20">
                    <div
                        onClick={() => handleSwap(1)}
                        className="w-16 h-16 sm:w-24 sm:h-24 lg:w-36 lg:h-36 rounded-xl lg:rounded-2xl overflow-hidden border-2 border-white shadow-2xl transition-transform hover:scale-105 cursor-pointer"
                    >
                        <Image
                            src={images[1]}
                            alt="Nike Air Max Thumbnail 1"
                            width={144}
                            height={144}
                            className="shrink-0 object-cover w-full h-full"
                        />
                    </div>
                    <div
                        onClick={() => handleSwap(2)}
                        className="w-16 h-16 sm:w-24 sm:h-24 lg:w-36 lg:h-36 rounded-xl lg:rounded-2xl overflow-hidden border-2 border-white shadow-2xl transition-transform hover:scale-105 cursor-pointer"
                    >
                        <Image
                            src={images[2]}
                            alt="Nike Air Max Thumbnail 2"
                            width={144}
                            height={144}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Bottom Gradient for Text Readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
        </section>
    );
};

export default Hero;
