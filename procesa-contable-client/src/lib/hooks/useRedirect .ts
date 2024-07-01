import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const useRedirect = (path: string, haveSubMenu?: boolean, subitems?: { path: string }[]) => {
    const router = useRouter();
    const pathName = usePathname();
    const [expanded, setExpanded] = useState(false);

    const redirect = () => {
        if (haveSubMenu) return setExpanded(!expanded);
        router.push(path);
    };

    const isActive = useMemo(() => {
        if (path === pathName) {
            return true;
        }
        return subitems?.some(subitem => subitem.path === pathName) || false;
    }, [path, pathName, subitems]);

    return { redirect, expanded, isActive };

}