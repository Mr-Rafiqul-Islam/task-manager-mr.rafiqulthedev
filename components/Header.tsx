import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.webp"

export default function Header() {
    return (
        <nav className="py-6 md:py-8 sticky top-0 w-full !bg-[#191D26] z-50">
            <div className="container mx-auto flex items-center justify-between gap-x-6">
                <Link href="/">
                    <Image
                        className="h-[45px]"
                        src={logo}
                        alt="Lws"
                    />
                </Link>
            </div>
        </nav>
    );
}