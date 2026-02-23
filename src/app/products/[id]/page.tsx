"use client"
import Recommendations from '@/components/sections/Recommendations';
import { useGetProductByIdQuery } from '@/redux/services/productApi';
import { addToCart } from '@/redux/slices/cartSlice';
import { ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Params {
    id: string;
}

const ProductDetails = ({ params }: { params: Promise<Params> }) => {
    const { id } = use(params);
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
    const [selectedSize, setSelectedSize] = useState<number>(38);
    const [selectedColor, setSelectedColor] = useState<string>('navy');
    const [activeImage, setActiveImage] = useState(0);

    const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

    const handleAddToCart = () => {
        if (!product) return;

        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            quantity: 1,
            category: product.category?.name || "Men's Road Running Shoes",
            colorDescription: selectedColor === 'navy' ? 'Shadow Navy / Army Green' : 'Army Green / Shadow Navy'
        }));
    };

    const handleBuyItNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-10 animate-pulse">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-2/3 grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-[48px]" />
                        ))}
                    </div>
                    <div className="lg:w-1/3 space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/4" />
                        <div className="h-12 bg-gray-200 rounded w-3/4" />
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                        <div className="h-20 bg-gray-200 rounded w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link href="/" className="text-secondary font-bold hover:underline">
                    Back to Catalog
                </Link>
            </div>
        );
    }

    const imagesToDisplay = product.images.slice(0, 4);

    return (
        <div className="mx-auto px-0 lg:px-15 py-10">
            {/* Breadcrumb - Hidden on mobile as per design */}
            <div className="hidden lg:flex items-center gap-2 text-sm font-bold uppercase tracking-tight mb-8">
                <Link href="/" className="text-primary/50 hover:text-primary">Home</Link>
                <ChevronRight size={16} className="text-primary/50" />
                <span className="text-primary">{product.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Side: Image Gallery */}
                <div className="lg:w-[65%] px-4 lg:px-0">
                    {/* Desktop Grid */}
                    <div className="hidden lg:grid grid-cols-2 gap-6">
                        {imagesToDisplay.map((imgSrc, index) => {
                            const roundedClass =
                                index === 0 ? 'rounded-tl-[48px]' :
                                    index === 1 ? 'rounded-tr-[48px]' :
                                        index === 2 ? 'rounded-bl-[48px]' :
                                            index === 3 ? 'rounded-br-[48px]' : 'rounded-3xl';

                            const imageRoundedClass =
                                index === 0 ? 'rounded-tl-[48px]' :
                                    index === 1 ? 'rounded-tr-[48px]' :
                                        index === 2 ? 'rounded-bl-[48px]' :
                                            index === 3 ? 'rounded-br-[48px]' : 'rounded-3xl';

                            return (
                                <div key={index} className={`relative aspect-[618/614] bg-[#F6F6F6] ${roundedClass} overflow-hidden group transition-all duration-300 hover:bg-[#ECEEF0] hover:scale-[1.02]`}>
                                    <Image
                                        src={imgSrc}
                                        alt={`${product.title} ${index + 1}`}
                                        fill
                                        className={`object-cover p-4 ${imageRoundedClass} transition-transform duration-500 group-hover:scale-105`}
                                        priority={index === 0}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Carousel Layout */}
                    <div className="lg:hidden flex flex-col gap-6">
                        <div className="relative aspect-[390/450] bg-[#F6F6F6] rounded-[48px] overflow-hidden">
                            <Image
                                src={imagesToDisplay[activeImage]}
                                alt={product.title}
                                fill
                                className="object-cover p-4 rounded-[40px]"
                                priority
                            />
                            {/* Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {imagesToDisplay.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-all ${activeImage === i ? 'bg-[#4A69E2] w-4' : 'bg-[#232321]/20'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3 px-2">
                            {imagesToDisplay.map((imgSrc, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative aspect-square bg-[#F6F6F6] rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#4A69E2]' : 'border-transparent'}`}
                                >
                                    <Image
                                        src={imgSrc}
                                        alt={`Thumbnail ${i + 1}`}
                                        fill
                                        className="object-cover p-1 rounded-xl"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Product Info */}
                <div className="lg:w-[35%] px-4 lg:px-0">
                    <div className="sticky top-24">
                        <span className="inline-block bg-[#4A69E2] text-white text-[12px] font-bold uppercase tracking-wide px-4 py-2 rounded-lg mb-6">
                            New Release
                        </span>

                        <h1 className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-2 md:mb-4 tracking-tighter text-[#232321]">
                            {product.title}
                        </h1>

                        <div className="text-2xl md:text-3xl font-bold text-[#4A69E2] mb-8">
                            ${product.price.toFixed(2)}
                        </div>

                        {/* Color Selection */}
                        <div className="mb-8">
                            <h3 className="text-base font-bold uppercase mb-4 text-[#232321]">Color</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setSelectedColor('navy')}
                                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === 'navy' ? 'border-[#232321]' : 'border-transparent'} p-0.5`}
                                >
                                    <div className="w-full h-full rounded-full bg-[#2B3A67]" />
                                </button>
                                <button
                                    onClick={() => setSelectedColor('green')}
                                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === 'green' ? 'border-[#232321]' : 'border-transparent'} p-0.5`}
                                >
                                    <div className="w-full h-full rounded-full bg-[#4F5D54]" />
                                </button>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-bold uppercase text-[#232321]">Size</h3>
                                <button className="text-sm font-bold uppercase underline text-[#232321] hover:text-[#4A69E2] transition-colors">
                                    Size Chart
                                </button>
                            </div>
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-12 border ${selectedSize === size ? 'bg-[#232321] text-white border-transparent' : 'bg-[#E7E7E3] text-[#232321]/50 border-transparent hover:bg-white hover:border-[#232321]'} rounded-lg font-bold transition-all text-sm`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-[4] bg-[#232321] text-white py-4 md:py-5 rounded-xl font-bold uppercase tracking-wide hover:bg-black transition-all active:scale-95"
                            >
                                Add to Cart
                            </button>
                            <button className="flex-1 border-2 border-[#232321] flex items-center justify-center rounded-xl hover:bg-[#F6F6F6] transition-all group">
                                <Heart size={24} className="text-[#232321] group-hover:fill-[#232321]" />
                            </button>
                        </div>
                        <button
                            onClick={handleBuyItNow}
                            className="w-full bg-[#4A69E2] text-white py-4 md:py-5 rounded-xl font-bold uppercase tracking-wide hover:bg-[#3b5bd9] transition-all active:scale-95 mb-10"
                        >
                            Buy it now
                        </button>

                        {/* Product Description */}
                        <div>
                            <h3 className="text-base font-bold uppercase mb-4 text-[#232321]">About the product</h3>
                            <div className="text-[#232321]/80 leading-relaxed mb-6">
                                <p className="mb-4">Shadow Navy / Army Green</p>
                                <p className="mb-6">{product.description}</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                                        <span>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                                        <span>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-20">
                <Recommendations
                    categoryId={product.category?.id}
                    currentProductId={product.id}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
