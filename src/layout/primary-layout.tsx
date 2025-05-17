import React from "react";
import Header from "../components/common/header"
import Footer from "../components/common/footer"


interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
    React.useEffect(() => {
        document.title = title; 
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-background-light dark:bg-background-dark">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
