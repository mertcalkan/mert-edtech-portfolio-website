import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", label: "Hakkımda" },
    { path: "/projeler", label: "Projeler" },
    { path: "/iletisim", label: "İletişim" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-questrial font-bold text-2xl text-white tracking-widest"
        >
          MERT.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 tracking-wide">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-questrial transition-colors duration-300 hover:text-primary ${
                location.pathname === path ? "text-primary font-bold" : "text-foreground/80"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground"
          aria-label="Menüyü aç/kapat"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-background z-40">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col space-y-6">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-questrial text-xl text-left py-3 border-b border-border/30 hover:bg-white/5 rounded-md px-4 transition-colors ${
                    location.pathname === path ? "text-primary font-bold" : "text-foreground"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;