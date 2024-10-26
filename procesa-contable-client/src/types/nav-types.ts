export type NavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    haveSubMenu?: boolean;
    subitems?: NavItem[];
};