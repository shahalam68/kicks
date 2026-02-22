import { ChevronDown, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between bg-white rounded-2xl px-8  shadow-sm py-8">
            {/* Left: Navigation Links */}
            <div className="flex flex-1 items-center gap-8 font-semibold text-primary">
                <Link href="#" className="flex items-center gap-1 hover:opacity-80">
                    New Drops <span role="img" aria-label="fire">🔥</span>
                </Link>
                <Link href="#" className="flex items-center gap-1 hover:opacity-80 whitespace-nowrap">
                    Men <ChevronDown size={16} />
                </Link>
                <Link href="#" className="flex items-center gap-1 hover:opacity-80 whitespace-nowrap">
                    Women <ChevronDown size={16} />
                </Link>
            </div>

            {/* Center: Logo */}
            <div className="text-center">
                <Link href="/" className="">
                    <Image src="/KicksLogo.png" alt="Logo" width={128} height={100} />
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-1 items-center justify-end gap-6">
                <button className="text-primary hover:opacity-70 transition-opacity">
                    <Search size={24} />
                </button>
                <button className="text-primary hover:opacity-70 transition-opacity">
                    <User size={24} />
                </button>
                <button className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#FFA52F] text-primary font-bold text-sm">
                    0
                </button>
            </div>
        </nav>
    );
};

export default NavBar;