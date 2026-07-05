import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (location.pathname.includes("/uslu-sayilar")) {
    return null;
  }

  const navItems = [
    { path: "/", label: "Hakkımda" },
    { path: "/projeler", label: "Projeler" },
    { path: "/iletisim", label: "İletişim" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center relative z-50">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-center justify-center outline-none"
        >
          <div className="relative font-satoshi text-3xl sm:text-4xl font-black tracking-tighter text-white/90 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            M
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 tracking-wide">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-satoshi transition-all duration-300 pb-1 ${
                location.pathname === path
                  ? "text-white font-bold border-b-2 border-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white transition-transform duration-300 z-50"
          aria-label="Menüyü aç/kapat"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-0 z-40 bg-black"
          >
            <div className="container mx-auto px-6 py-8 h-full">
              <div className="flex flex-col space-y-6 mt-20">
                {navItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-satoshi text-2xl text-left py-3 transition-all duration-300 ${
                      location.pathname === path
                        ? "text-white font-bold border-b-2 border-white inline-block w-max"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;