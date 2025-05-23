import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/TASKLYletter.png";
import logoWhite from "../../assets/img/TASKLYletterWhite.png";
import DarkModeToggle from "./toggle-dark-mode";

export function Header() {
    const navigate = useNavigate();

    const handleLogoKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            navigate("/");
        }
    };

    return (
        <header
            className="flex items-center justify-between bg-white dark:bg-gray-900 text-blue-600 px-6 py-4 shadow-md border-b border-gray-300 dark:border-gray-900"
            role="banner"
            aria-label="Encabezado principal"
        >
            <div
                role="button"
                tabIndex={0}
                aria-label="Ir al inicio"
                title="Ir al inicio"
                className="flex items-center gap-2 cursor-pointer w-32"
                onClick={() => navigate("/")}
                onKeyDown={handleLogoKeyPress}
            >
                <img
                    src={logoWhite}
                    alt="Logo Taskly versión clara"
                    className="w-auto dark:block hidden"
                />
                <img
                    src={logo}
                    alt="Logo Taskly versión oscura"
                    className="w-auto block dark:hidden"
                />
            </div>

            {/* Toggle dark mode */}
            <div className="flex items-center gap-2" aria-label="Controles de visualización">
                <DarkModeToggle />
            </div>
        </header>
    );
}

export default Header;
