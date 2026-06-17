import { IFooter } from "@/types";

export const footerData: IFooter[] = [
    {
        title: "Pages",
        links: [
            { name: "Home", href: "#" },
            { name: "Generate", href: "#support" },
            { name: "Recreate", href: "#pricing" },
            { name: "Community", href: "#affiliate" },
        ]
    },
    {
        title: "Company",
        links: [
            { name: "Contact Us", href: "#blogs" },
            { name: "Pricing", href: "#community" },
            { name: "Careers", href: "#careers" },
            { name: "About Us", href: "/about" },
            { name: "", href: "#company" },
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "#privacy" },
            { name: "Terms and Conditions", href: "#terms" },
            { name: "Refund Policy", href: "#refund" },
        ]
    }
];