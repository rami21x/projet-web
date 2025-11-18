"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";
import { useContent } from "@/hooks/useContent";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { navigation } = useContent();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Left navigation items - Only Home and Gallery
  const leftNav = navigation.filter((item) =>
    ["Home", "Accueil", "Gallery", "Galerie"].includes(item.name)
  );

  // Dropdown items - Everything except Home and Gallery
  const dropdownItems = navigation.filter((item) =>
    !leftNav.includes(item)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-light/95 dark:bg-light/95 backdrop-blur-sm border-b border-dark/10 dark:border-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Left Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {leftNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-body text-sm font-medium transition-colors relative group ${
                  pathname === item.href
                    ? "text-primary dark:text-primary"
                    : "text-dark dark:text-dark hover:text-primary dark:hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-primary transition-all group-hover:w-full ${
                    pathname === item.href ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 font-display text-2xl md:text-3xl font-bold text-dark dark:text-dark hover:text-primary dark:hover:text-primary transition-colors"
          >
            ARTERAL
          </Link>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* More Dropdown with all pages except Home and Gallery */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="font-body text-sm font-medium text-dark dark:text-dark hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                <Menu className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-white shadow-xl rounded-lg border border-dark/10 dark:border-dark/10 py-2 overflow-hidden"
                  >
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`block px-4 py-2 font-body text-sm transition-colors ${
                          pathname === item.href
                            ? "bg-primary text-white"
                            : "text-dark hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <LanguageToggle />
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button + Language + Dark Mode */}
          <div className="lg:hidden flex items-center gap-2 ml-auto">
            <LanguageToggle />
            <DarkModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-dark dark:text-dark hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-dark/10 dark:border-light/10 bg-light dark:bg-light"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-body text-base font-medium py-2 px-4 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-primary text-white dark:bg-primary dark:text-white"
                      : "text-dark dark:text-dark hover:bg-dark/5 dark:hover:bg-dark/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
