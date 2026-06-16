import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export const metadata = {
    title: "Thumblify",
    description: "Thumblify is a free AI-based platform where you can make valuable thumbnails in seconds.",
};

export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preload" href="/assets/background-splash.svg" as="image" />
            </head>
            <body className={`${poppins.variable} font-sans antialiased relative min-h-screen overflow-x-hidden`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[943px] -z-50 pointer-events-none opacity-45">
                    <img 
                        src="/assets/background-splash.svg" 
                        alt="" 
                        className="w-full h-full object-cover" 
                        width={1440}
                        height={943}
                    />
                </div>
                <LenisScroll />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}