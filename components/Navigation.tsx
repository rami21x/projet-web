"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/content";
import DarkModeToggle from "./DarkModeToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-light/95 dark:bg-light/95 backdrop-blur-sm border-b border-dark/10 dark:border-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl font-bold text-dark dark:text-dark hover:text-primary dark:hover:text-primary transition-colors"
          >
            ARTERAL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
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
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button + Dark Mode */}
          <div className="md:hidden flex items-center gap-3">
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
            className="md:hidden border-t border-dark/10 dark:border-light/10 bg-light dark:bg-light"
          >
            <div className="px-4 py-4 space-y-3">
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
