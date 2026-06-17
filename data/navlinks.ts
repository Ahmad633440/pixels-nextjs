// import { INavLink } from './../types';
// import { INavLink } from "@/types";
export interface INavLink {
    name: string;
    href: string;
    subLinks?: {name: string; href: string}[]
}

export const navlinks: INavLink[] = [
    { name: "Home", href: "/" },
    { name: "Generate", href: "#",
      subLinks: [
        {name: "Generate Thumbnail", href: "/generate"},
        {name: "Recreate Thumbnail", href: "/recreate"}
      ]
     },
    { name: "Library", href: "/myGenerationPage" },
    { name: "About", href: "/about" },
];