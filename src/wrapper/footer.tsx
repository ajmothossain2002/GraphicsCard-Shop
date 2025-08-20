"use client";


import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 text-white px-4 sm:px-8 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-5">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg mr-3">
                <span className="text-xl font-bold text-white">SE</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Graphics Store
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Stay connected with Graphics Store for the latest techology
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos repellat iste praesentium labore ad nobis 
              numquam repellendus? Aut laudantium hic quaerat ipsa quis?, exclusive offers, 
              and style inspiration. 
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-slate-800 hover:bg-cyan-600 p-3 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-slate-800 hover:bg-blue-400 p-3 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="bg-slate-800 hover:bg-pink-600 p-3 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="bg-slate-800 hover:bg-red-600 p-3 rounded-full transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="font-semibold text-lg mb-5 text-cyan-400">COMPANY</p>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-2">
            <p className="font-semibold text-lg mb-5 text-cyan-400">SUPPORT</p>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <p className="font-semibold text-lg mb-5 text-cyan-400">GET IN TOUCH</p>
            
            {/* Newsletter Subscription */}
            <div className="mb-6">
              <p className="text-gray-400 mb-3">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-slate-800 border border-slate-700 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full"
                />
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 rounded-r-lg transition-all duration-300">
                  <Mail size={20} />
                </Button>
              </div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:9641514646">+91 9641514646</a>
              </li>
              <li className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ajmot123.hossain@gmail.com">ajmot123.hossain@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-slate-800">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">We accept:</span>
            <div className="flex space-x-2">
              <div className="bg-white p-1 rounded">
                <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.641 6.658H7.788L6.92 9.184H8.773L9.641 6.658Z" fill="#142668"/>
                  <path d="M18.433 6.493H17.27L16.97 7.583H16.928L16.463 6.493H15.23L14.687 7.656L14.26 6.493H13.027L13.817 8.508L13.349 9.349H14.582L15.023 8.267H15.065L15.506 9.349H16.739L16.271 8.508L17.061 6.493H18.224L17.796 7.656L18.433 6.493Z" fill="#142668"/>
                  <path d="M21.333 6.493H20.1V9.349H21.333V6.493Z" fill="#142668"/>
                  <path d="M22.4 6.493H21.167V9.349H22.4V6.493Z" fill="#142668"/>
                  <path d="M23.467 6.493H22.234V9.349H23.467V6.493Z" fill="#142668"/>
                  <path d="M10.5 6.493H9.267V9.349H10.5V6.493Z" fill="#142668"/>
                  <path d="M11.567 6.493H10.334V9.349H11.567V6.493Z" fill="#142668"/>
                  <path d="M12.634 6.493H11.401V9.349H12.634V6.493Z" fill="#142668"/>
                  <path d="M8.5 6.493H7.267V9.349H8.5V6.493Z" fill="#142668"/>
                  <path d="M7.433 6.493H6.2V9.349H7.433V6.493Z" fill="#142668"/>
                  <path d="M6.366 6.493H5.133V9.349H6.366V6.493Z" fill="#142668"/>
                  <path d="M5.3 6.493H4.067V9.349H5.3V6.493Z" fill="#142668"/>
                  <path d="M4.233 6.493H3V9.349H4.233V6.493Z" fill="#142668"/>
                  <path d="M0 6.493H1.233V9.349H0V6.493Z" fill="#142668"/>
                  <path d="M1.067 6.493H2.3V9.349H1.067V6.493Z" fill="#142668"/>
                  <path d="M2.134 6.493H3.367V9.349H2.134V6.493Z" fill="#142668"/>
                  <path d="M3.2 6.493H4.433V9.349H3.2V6.493Z" fill="#142668"/>
                  <path d="M19.367 6.493H18.134V9.349H19.367V6.493Z" fill="#142668"/>
                  <path d="M20.434 6.493H19.201V9.349H20.434V6.493Z" fill="#142668"/>
                </svg>
              </div>
              <div className="bg-white p-1 rounded">
                <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 4.5H8.5V11.5H15.5V4.5Z" fill="#EB001B"/>
                  <path d="M9 4.5C7.3 4.5 5.9 5.9 5.9 7.6C5.9 9.3 7.3 10.7 9 10.7C10.7 10.7 12.1 9.3 12.1 7.6C12.1 5.9 10.7 4.5 9 4.5Z" fill="#FF5F00"/>
                  <path d="M15 4.5C13.3 4.5 11.9 5.9 11.9 7.6C11.9 9.3 13.3 10.7 15 10.7C16.7 10.7 18.1 9.3 18.1 7.6C18.1 5.9 16.7 4.5 15 4.5Z" fill="#FF5F00"/>
                </svg>
              </div>
              <div className="bg-white p-1 rounded">
                <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 4.5H8.5V11.5H15.5V4.5Z" fill="#002F6C"/>
                  <path d="M9 4.5C7.3 4.5 5.9 5.9 5.9 7.6C5.9 9.3 7.3 10.7 9 10.7C10.7 10.7 12.1 9.3 12.1 7.6C12.1 5.9 10.7 4.5 9 4.5Z" fill="#0071BC"/>
                  <path d="M15 4.5C13.3 4.5 11.9 5.9 11.9 7.6C11.9 9.3 13.3 10.7 15 10.7C16.7 10.7 18.1 9.3 18.1 7.6C18.1 5.9 16.7 4.5 15 4.5Z" fill="#0071BC"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Graphics Store - All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;