"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import CustomButton from "./custom-button";
import { useRouter, usePathname } from "next/navigation";

/* ================= TYPES ================= */

type NavLink = {
  label: string;
  href: string;
  dropdown?: NavLink[];
};

/* ================= LINKS ================= */

const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Latest News", href: "/latestnews" },
  { label: "Works", href: "/works" },
  { label: "Certificates", href: "/certificates" },
  { label: "Gallery", href: "/gallery" },
];

/* ================= COMPONENT ================= */

function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (link: NavLink) => {
    setMobileMenuOpen(false);
    setDesktopDropdownOpen(null);
    setMobileDropdownOpen(null);
    router.push(link.href);
  };

  const handleDonate = () => router.push("/donate");

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <img
              className="w-[250px] h-[60px] cursor-pointer"
              src="/NEED-FOUNDATION-TRUST.jpg"
              alt="need foundation logo"
              onClick={() => handleLinkClick({ label: "Home", href: "/" })}
            />
          </div>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <ul className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <li key={link.label} className="relative group">

                {link.dropdown ? (
                  <>
                    <span
                      onClick={() =>
                        setDesktopDropdownOpen(
                          desktopDropdownOpen === link.label ? null : link.label
                        )
                      }
                      className={`flex items-center gap-1 px-4 py-2 text-[16px] font-medium rounded-lg transition-all duration-300 cursor-pointer
                        ${
                          pathname.startsWith(link.href)
                            ? "text-pink-600"
                            : "text-gray-500 hover:text-[#f47216]"
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </span>

                    {desktopDropdownOpen === link.label && (
                      <div className="absolute top-12 left-0 w-56 bg-white shadow-lg border border-gray-200 rounded-lg py-2 z-50">
                        {link.dropdown.map((item) => (
                          <div
                            key={item.label}
                            onClick={() => handleLinkClick(item)}
                            className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded-md text-gray-700"
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <span
                    onClick={() => handleLinkClick(link)}
                    className={`relative px-4 py-2 text-[16px] font-medium rounded-lg transition-all duration-300 cursor-pointer group
                      ${
                        pathname === link.href
                          ? "text-pink-600"
                          : "text-gray-500 hover:text-[#f47216]"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#f47216] transform origin-left transition-transform duration-300
                        ${
                          pathname === link.href
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <CustomButton onClick={handleDonate}>
              Donate Now
            </CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 relative z-50
        ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-gray-50 border-t border-gray-200">
          {links.map((link) => (
            <div key={link.label}>

              {link.dropdown ? (
                <>
                  <div
                    className="flex justify-between items-center px-4 py-3 text-base font-medium cursor-pointer bg-white rounded-lg"
                    onClick={() =>
                      setMobileDropdownOpen(
                        mobileDropdownOpen === link.label ? null : link.label
                      )
                    }
                  >
                    <span className="text-gray-700">{link.label}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        mobileDropdownOpen === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {mobileDropdownOpen === link.label && (
                    <div className="ml-4 mt-2 space-y-1">
                      {link.dropdown.map((item) => (
                        <div
                          key={item.label}
                          onClick={() => handleLinkClick(item)}
                          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md cursor-pointer"
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  onClick={() => handleLinkClick(link)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium cursor-pointer
                    ${
                      pathname === link.href
                        ? "bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-md"
                        : "text-gray-700 bg-white"
                    }`}
                >
                  {link.label}
                </div>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="pt-4">
            <button
              onClick={handleDonate}
              className="w-full px-6 py-3 bg-[#f47216] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default NavigationMenu;
