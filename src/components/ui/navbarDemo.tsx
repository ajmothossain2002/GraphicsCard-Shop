"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "@mui/material";

// Type definitions
interface UserProfile {
  name?: string;
  avatar?: string;
}

interface NavbarProps {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  onLogout: () => void;
}

export function NavbarDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  // State Management - Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (token) {
      setIsLoggedIn(true);
      if (userData) {
        try {
          setUserProfile(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  // LocalStorage Auth Token Management
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserProfile(null);
    router.push("/login");
  };

  return (
    <div className="relative w-full">
      <Navbar
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        onLogout={handleLogout}
      />
    </div>
  );
}

function Navbar({ isLoggedIn, userProfile, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-black text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-white hover:text-gray-300"
              >
                Graphics World
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/collection"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Collection
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 transition-colors"
              >
                About
              </Link>
              <Link
                href="/cart"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                onClick={() => setProfileDropdownOpen(false)}
              >
                🛒 Cart
              </Link>

              {/* Authentication Section */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 focus:outline-none"
                  >
                    {userProfile?.avatar ? (
                      <Image
                        src={userProfile.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm">
                          {userProfile?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                    <span className="hidden lg:block">
                      {userProfile?.name || "User"}
                    </span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                      
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        View Profile
                      </Link>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Admin
                      </Link>
                      <button
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={toggleMobileMenu}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/collection"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={closeMobileMenu}
              >
                Collection
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              {/* Mobile Authentication */}
              {isLoggedIn ? (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center px-3 py-2">
                    {userProfile?.avatar ? (
                      <Image
                        src={userProfile.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white">
                          {userProfile?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-white font-medium">
                        {userProfile?.name || "User"}
                      </div>
                      <div className="text-gray-400 text-sm">Signed in</div>
                    </div>
                  </div>

                  <Link
                    href="/cart"
                    className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    🛒 Cart
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-3 py-2 text-red-400 hover:bg-gray-800 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-700 pt-4 space-y-1">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-16"></div>
    </>
  );
}
