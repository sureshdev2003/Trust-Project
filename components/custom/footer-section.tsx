"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact-us"
      className="bg-[#2f3b4a] text-gray-300 pt-14 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">

        {/* ABOUT */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/Logo.jpg"
            alt="Need Foundation Trust"
            width={200}
            height={160}
            className="rounded-xl bg-white p-2 shadow-md mb-4"
          />

          <h2 className="text-xl font-semibold text-white mb-3">
            About Our Trust
          </h2>

          <p className="text-sm leading-relaxed max-w-xs">
            We are a non-profit organization dedicated to serving the community
            through education, healthcare, and social welfare initiatives.
          </p>
        </div>

        {/* QUICK LINKS */}
        {/* <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h2>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/work" className="hover:text-white transition">
                Works
              </a>
            </li>
            <li>
              <a href="/donate" className="hover:text-white transition">
                Donate
              </a>
            </li>
          </ul>
        </div> */}
        {/* Certificates */}
         <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Certificates Quick Links
          </h2>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="" className="hover:text-white transition">
                Ers Certificates
              </a>
            </li>
            <li>
              <a href="/work" className="hover:text-white transition">
                Works
              </a>
            </li>
            <li>
              <a href="/donate" className="hover:text-white transition">
                Donate
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Contact Us
          </h2>

          <p className="text-sm leading-7">
            TS No.75/1A, 1B,<br />
            Sri Selva Vinayagar Complex<br />
            60 Ft, STC Scheme Road<br />
            Perumalpuram,<br />
            Tirunelveli – 627 007
          </p>

          <p className="flex items-center justify-center md:justify-start gap-3">
           <Mail className="w-5 h-5 text-orange-500" /> {" "}
            <a
              href="mailto:nellaiconnectad@gmail.com"
              className="hover:text-white"
            >
                nellaiconnectad@gmail.com
            </a>
          </p>

          <p className="flex items-center justify-center md:justify-start gap-3">
            <Phone className="w-5 h-5 text-orange-500" />{" "}
            <a href="tel:+919952541141" className="hover:text-white">
              +91 99525 41141
            </a>
          </p>
        </div>

        {/* MANAGING TEAM */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Managing Team
          </h2>

          <div className="space-y-5 text-sm">
             <div className="bg-gray-800/60 rounded-lg p-4">
              <p className="text-white font-medium">
                E.SA. Agilantam
              </p>
              <p className="text-gray-400">Managing Trustee</p>
            </div>
            <div className="bg-gray-800/60 rounded-lg p-4">
              <p className="text-white font-medium">
                Gomathy Akilandam
              </p>
              <p className="text-gray-400">Trustee</p>
            </div>

           
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-gray-600 mt-12 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Need Foundation Trust. All rights reserved.
      </div>
    </footer>
  );
}
