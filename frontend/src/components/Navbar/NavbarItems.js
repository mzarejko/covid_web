import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import * as SiIcons from "react-icons/si";

export const NavbarItems = [
    {
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        path: '/shopping',
        icon: <TiIcons.TiShoppingCart />,
        cName: 'nav-text'

    },
    {
        path: '/profile',
        icon: <SiIcons.SiOpsgenie />,
        cName: 'nav-text'
    }
]
