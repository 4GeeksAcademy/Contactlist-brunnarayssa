import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]); // Se ejecuta cada vez que cambia la ruta

    return children;
};

export default ScrollToTop;
