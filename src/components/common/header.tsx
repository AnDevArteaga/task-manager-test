//Possible brand footer
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "../../assets/img/TASKLYletter.png";
import logoWhite from "../../assets/img/TASKLYletterWhite.png";
import DarkModeToggle from "./toggle-dark-mode";

export function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <header className="flex items-center justify-between bg-white dark:bg-gray-900 text-blue-600 px-6 py-4 shadow-md border-b border-gray-300 dark:border-gray-900">
            <div
                className="flex items-center gap-2 cursor-pointer w-32"
                onClick={() => navigate("/")}
            >
                <img
                    src={logoWhite}
                    alt="Logo"
                    className="w-auto dark:block hidden "
                />
                <img
                    src={logo}
                    alt="Logo"
                    className="w-auto block dark:hidden "
                />
            </div>

            <div className="flex items-center gap-2">
                {/* Toggle dark mode */}

                <DarkModeToggle />

                <LogOut
                    size={20}
                    onClick={handleLogout}
                    className="text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 cursor-pointer"
                />
            </div>
        </header>
    );
}

export default Header;
