'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFromCart, selectCartCount, selectCartItems, updateQuantity } from '@/redux/slices/cartSlice';
import { ChevronDown, Menu, Minus, Plus, Search, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useAppSelector(selectCartItems);
    const cartCount = useAppSelector(selectCartCount);
    const subtotal = useAppSelector((state) =>
        state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'New Drops', href: '#', emoji: '🔥' },
        { name: 'Men', href: '#', hasDropdown: true },
        { name: 'Women', href: '#', hasDropdown: true },
        { name: 'Kids', href: '#', hasDropdown: true },
        { name: 'Sale', href: '#', isSale: true },
    ];

    return (
        <nav className="relative flex items-center justify-between bg-white rounded-3xl lg:rounded-2xl px-6 lg:px-8 shadow-sm py-4 lg:py-8 mx-4 md:mx-15 mt-4 lg:mt-8 z-[100]">
            {/* Desktop Left: Navigation Links */}
            <div className="hidden lg:flex flex-1 items-center gap-8 font-semibold text-primary">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-1 hover:opacity-80 whitespace-nowrap ${link.isSale ? 'text-secondary' : ''}`}
                    >
                        {link.name} {link.emoji && <span>{link.emoji}</span>} {link.hasDropdown && <ChevronDown size={16} />}
                    </Link>
                ))}
            </div>

            {/* Mobile Left: Hamburger Menu */}
            <div className="lg:hidden flex flex-1 items-center">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-primary hover:opacity-70 transition-opacity"
                >
                    <Menu size={24} />
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] animate-in fade-in duration-300">
                        <div
                            ref={menuRef}
                            className="bg-white w-[80%] h-full p-8 flex flex-col gap-6 animate-in slide-in-from-left duration-300 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-black uppercase tracking-tighter text-[#232321]">Kicks</span>
                                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-black">
                                    <X size={28} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4 mt-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-2xl font-bold uppercase ${link.isSale ? 'text-secondary' : 'text-primary'}`}
                                    >
                                        {link.name} {link.emoji && <span>{link.emoji}</span>}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-auto border-t pt-8 space-y-6">
                                <Link href="#" className="flex items-center gap-4 text-primary font-bold">
                                    <Search size={24} /> Search
                                </Link>
                                <Link href="#" className="flex items-center gap-4 text-primary font-bold">
                                    <User size={24} /> Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Center: Logo */}
            <div className="text-center flex-1 lg:flex-none">
                <Link href="/" className="inline-block">
                    {/* Using Text logo for consistency with design if images aren't loading, but keeping Image component as primary */}
                    <span className="lg:hidden text-2xl font-black uppercase tracking-tighter text-[#232321]">Kicks</span>
                    <div className="hidden lg:block">
                        <Image src="/KicksLogo.png" alt="Logo" width={128} height={100} />
                    </div>
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-1 items-center justify-end gap-3 lg:gap-6 relative">
                <button className="hidden lg:block text-primary hover:opacity-70 transition-opacity">
                    <Search size={24} />
                </button>
                <button className="text-primary hover:opacity-70 transition-opacity">
                    <User size={24} />
                </button>

                {/* Cart Toggle */}
                <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA52F] text-primary font-bold text-sm hover:scale-110 transition-transform"
                >
                    {cartCount}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-14 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in zoom-in duration-200"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#232321]">Recent Bag</h3>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black">
                                <X size={20} />
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">Your bag is empty</p>
                                <Link
                                    href="/"
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-sm font-bold underline uppercase"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="max-h-60 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                                    {cartItems.map((item) => (
                                        <div key={`${item.id}-${item.size}`} className="flex gap-4 group/item">
                                            <div className="relative w-20 h-20 bg-[#F6F6F6] rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                                <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0 grow">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h4 className="font-bold text-sm text-[#232321] truncate uppercase grow">{item.title}</h4>
                                                    <button
                                                        onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-gray-500 font-medium mb-1">Size: {item.size}</p>

                                                <div className="flex justify-between items-center mt-1">
                                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-7 bg-white">
                                                        <button
                                                            onClick={() => item.quantity > 1 && dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity - 1 }))}
                                                            className="px-2 h-full hover:bg-gray-50 text-gray-500 transition-colors border-r border-gray-200 flex items-center justify-center"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="px-3 text-xs font-bold text-[#232321]">{item.quantity}</span>
                                                        <button
                                                            onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, quantity: item.quantity + 1 }))}
                                                            className="px-2 h-full hover:bg-gray-50 text-gray-500 transition-colors border-l border-gray-200 flex items-center justify-center"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm font-bold text-[#4A69E2]">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-center font-bold text-[#232321] mb-1">
                                        <span className="uppercase text-xs tracking-wider">Subtotal</span>
                                        <span className="text-lg">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsCartOpen(false)}
                                        className="bg-white border-2 border-[#232321] text-[#232321] py-3 rounded-xl font-bold uppercase text-xs text-center hover:bg-gray-50 transition-colors"
                                    >
                                        View Bag
                                    </Link>
                                    <Link
                                        href="/cart"
                                        onClick={() => setIsCartOpen(false)}
                                        className="bg-[#232321] text-white py-3 rounded-xl font-bold uppercase text-xs text-center hover:bg-black transition-colors"
                                    >
                                        Checkout
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
