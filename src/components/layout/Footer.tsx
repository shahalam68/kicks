'use client';

import footerData from '@/data/footer.json';
import Image from 'next/image';
import Link from 'next/link';
import { FaTiktok } from 'react-icons/fa6';
import { LuFacebook, LuInstagram, LuTwitter } from 'react-icons/lu';

const Footer = () => {
    return (
        <footer className="w-full px-4 md:px-[60px] pb-10 mt-20">
            <div className=" mx-auto">
                {/* Newsletter / CTA Section */}
                <div className="bg-secondary rounded-t-[32px] md:rounded-t-[64px] p-8 md:p-16 md:pb-30 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden z-10 shadow-lg">
                    <div className="max-w-3xl relative z-10">
                        <h2 className="text-white text-4xl md:text-7xl font-bold mb-4 leading-tight uppercase font-rubik tracking-tight">
                            Join our KicksPlus <br /> club & get 15% off
                        </h2>
                        <p className="text-white/80 text-lg mb-8 uppercase font-medium">
                            Sign up for free! Join the community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white w-full"
                            />
                            <button className="bg-[#232321] text-white px-8 py-3 rounded-lg font-bold uppercase hover:bg-black transition-colors">
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* White Logo at Top */}
                    <div className="hidden lg:block relative z-10">
                        <div className="relative w-[300px] h-[120px]">
                            <Image
                                src="/logoWhite.png"
                                alt="Kicks Logo"
                                fill
                                className="object-contain"
                            />
                            {/* Plus Icon */}
                            <div className="absolute top-0 -right-2 bg-[#FFA52F] rounded-full size-6 flex items-center justify-center border-2 border-secondary shadow-sm">
                                <span className="text-white text-lg font-bold leading-none">+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Section */}
                <div className="bg-primary rounded-[32px] md:rounded-[64px] pt-10 md:pt-10 pb-0 px-8 md:px-16 relative overflow-hidden z-20 mt-[-60px] md:mt-[-80px] shadow-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 mt-5 md:mt-8">
                        {/* About us */}
                        <div>
                            <h3 className="text-[#FFA52F] text-2xl font-bold mb-6">{footerData.about.title}</h3>
                            <p className="text-white/70 leading-relaxed max-w-xs font-medium text-sm md:text-base">
                                {footerData.about.description}
                            </p>
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-[#FFA52F] text-2xl font-bold mb-6">{footerData.categories.title}</h3>
                            <ul className="space-y-4 text-white/90 font-bold uppercase text-sm md:text-base">
                                {footerData.categories.links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="hover:text-amber-500 transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-[#FFA52F] text-2xl font-bold mb-3">{footerData.company.title}</h3>
                            <ul className="space-y-4 text-white/90 font-bold uppercase text-sm md:text-base">
                                {footerData.company.links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="hover:text-amber-500 transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Follow us */}
                        <div>
                            <h3 className="text-[#FFA52F] text-2xl font-bold mb-3">{footerData.follow.title}</h3>
                            <div className="flex gap-4">
                                <Link href="#" className="bg-white text-black size-10 md:size-12 rounded-full flex items-center justify-center hover:bg-[#FFA52F] transition-colors">
                                    <LuFacebook size={20} />
                                </Link>
                                <Link href="#" className="bg-white text-black size-10 md:size-12 rounded-full flex items-center justify-center hover:bg-[#FFA52F] transition-colors">
                                    <LuInstagram size={20} />
                                </Link>
                                <Link href="#" className="bg-white text-black size-10 md:size-12 rounded-full flex items-center justify-center hover:bg-[#FFA52F] transition-colors">
                                    <LuTwitter size={20} />
                                </Link>
                                <Link href="#" className="bg-white text-black size-10 md:size-12 rounded-full flex items-center justify-center hover:bg-[#FFA52F] transition-colors">
                                    <FaTiktok size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Massive Background Logo at Bottom */}
                    <div className="relative w-full aspect-[1440/350] sm:aspect-[1440/300] mt-[-10px] md:mt-[-20px] select-none pointer-events-none mb-[-1%]">
                        <Image
                            src="/FooterLogo.png"
                            alt="Kicks Logo"
                            fill
                            className="object-contain object-bottom scale-110 px-10"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-gray-500 font-medium tracking-tight">
                © All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
