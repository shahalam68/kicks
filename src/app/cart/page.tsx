'use client';

import { Recommendations } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFromCart, selectCartItems, updateQuantity } from '@/redux/slices/cartSlice';
import { ChevronDown, Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const delivery = cartItems.length > 0 ? 6.99 : 0;
    const total = subtotal + delivery;

    return (
        <div className="mx-auto px-4 md:px-15 py-10 min-h-screen">
            {/* Promo Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-[#232321] mb-2">Saving to celebrate</h1>
                <p className="text-[#232321]/70 text-sm md:text-base mb-2">
                    Enjoy up to 60% off thousands of styles during the End of Year sale - while supplies last. No code needed.
                </p>
                <div className="text-sm font-bold underline">
                    <Link href="#" className="hover:text-secondary">Join us</Link> or <Link href="#" className="hover:text-secondary">Sign-in</Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Your Bag Section */}
                <div className="lg:w-[65%]">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#232321]">Your Bag</h2>
                            <p className="text-[#232321]/60 text-sm">Items in your bag not reserved- check out now to make them yours.</p>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl font-medium text-gray-500 mb-6">Your bag is empty.</p>
                                <Link href="/" className="bg-[#232321] text-white px-8 py-3 rounded-xl font-bold uppercase transition-transform hover:scale-105 inline-block">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-[#E7E7E3] last:border-0 last:pb-0">
                                        {/* Item Image */}
                                        <div className="relative w-full sm:w-48 aspect-square bg-[#F6F6F6] rounded-2xl overflow-hidden p-2 shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex flex-col justify-between grow py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold uppercase text-[#232321] mb-1">{item.title}</h3>
                                                    <p className="text-[#232321]/70 font-medium mb-1">{item.category}</p>
                                                    <p className="text-[#232321]/70 font-medium mb-4">{item.colorDescription}</p>

                                                    <div className="flex gap-6 items-center">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#232321]/70 font-bold uppercase">Size</span>
                                                            <div className="flex items-center gap-1 font-bold text-[#232321]">
                                                                {item.size} <ChevronDown size={14} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#232321]/70 font-bold uppercase">Quantity</span>
                                                            <div className="flex items-center gap-1 font-bold text-[#232321]">
                                                                <select
                                                                    value={item.quantity}
                                                                    onChange={(e) => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: parseInt(e.target.value) }))}
                                                                    className="bg-transparent border-none focus:ring-0 cursor-pointer p-0"
                                                                >
                                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
                                                                        <option key={q} value={q}>{q}</option>
                                                                    ))}
                                                                </select>
                                                                <ChevronDown size={14} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-xl md:text-2xl font-bold text-[#4A69E2]">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 mt-6 sm:mt-0">
                                                <button className="text-[#232321] hover:text-[#4A69E2] transition-colors">
                                                    <Heart size={24} />
                                                </button>
                                                <button
                                                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                                                    className="text-[#232321] hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="lg:w-[35%]">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#232321] mb-8">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center font-bold text-lg md:text-xl text-[#232321]">
                                <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} ITEM</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-lg md:text-xl text-[#232321]">
                                <span>Delivery</span>
                                <span>${delivery.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-lg md:text-xl text-[#232321]">
                                <span>Sales Tax</span>
                                <span>-</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-xl md:text-2xl text-[#232321] pt-4 border-t border-[#E7E7E3]">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#232321] text-white py-5 rounded-xl font-bold uppercase tracking-wide hover:bg-black transition-all active:scale-95 shadow-lg mb-6">
                            Checkout
                        </button>

                        <button className="text-[#232321] font-bold underline hover:text-secondary block mx-auto py-2">
                            User a promo code
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-20 md:px-0">
                <Recommendations />
            </div>
        </div>
    );
};

export default CartPage;
