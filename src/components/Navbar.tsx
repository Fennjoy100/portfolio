import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial logic
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 dark:bg-slate-950 bg-slate-50 transition-all duration-300",
        isScrolled ? "border-b dark:border-slate-800 border-slate-200 py-4 shadow-sm" : "border-b dark:border-slate-800 border-slate-200 py-6"
      )}
    >
      <div className="flex justify-between items-center px-2 md:px-0">
        <a href="#home" className="flex items-center gap-4 z-50 relative group">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-indigo-500 rounded-sm rotate-45 flex-shrink-0 group-hover:bg-indigo-400 transition-colors"></div>
          <span className="font-bold text-lg md:text-xl tracking-tight uppercase dark:text-slate-100 text-slate-900">Fennjoy<span className="text-indigo-500">. J</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 text-xs font-semibold uppercase tracking-widest dark:text-slate-400 text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="dark:hover:text-white hover:text-slate-900 border-b-2 border-transparent hover:border-indigo-500 pb-1 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <button 
            onClick={toggleTheme} 
            className="p-2 text-slate-500 hover:text-indigo-500 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden z-50 flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 text-slate-500 hover:text-indigo-500 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="relative p-2 dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 dark:bg-slate-950 bg-slate-50 flex flex-col items-center justify-center pt-20 border-b dark:border-slate-800 border-slate-200"
            >
              <ul className="flex flex-col items-center gap-8 text-sm font-semibold uppercase tracking-widest dark:text-slate-400 text-slate-600">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="dark:hover:text-white hover:text-slate-900 border-b-2 border-transparent hover:border-indigo-500 pb-1 transition-all"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
