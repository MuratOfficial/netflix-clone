import { useState, useCallback, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";
import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackgorund, setShowBackgorund] = useState(false);

    useEffect(()=>{
        const handleScrool = () => {
if(window.screenY>=TOP_OFFSET) {
    setShowBackgorund(true);
} else {
    setShowBackgorund(false);
}
        }

        window.addEventListener('scroll', handleScrool);

        return window.removeEventListener('scroll', handleScrool);
    }, [])


    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
      }, []);

    const toggleAccountMenu = useCallback(()=>{
        setShowAccountMenu((current)=>!current)
    }, [])

    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackgorund?'bg-zinc-900 bg-opacity-90':''}`}>
                <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" active />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`w-4 text-white fill-white transition ${showMobileMenu?'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch className="w-6" />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell className="w-6" />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src="/images/default-red.png" alt="" />
                        </div>
                        <BsChevronDown className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
                
                
            </div>
        </nav>
    )
}

export default Navbar;