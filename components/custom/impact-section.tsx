"use client";
import { Hand } from "lucide-react";
import "../../app/globals.css";
import { motion } from "framer-motion";

const impactStats = [
  {
    icon: "restaurant",
    // number: "4mn+",
    label: "meals provided ",
  },
  {
    icon: "groups",
    // number: "90000+",
    label: " Migrants Supported",
  },
  {
    icon: "airwave",
    // number: "300+",
    label: "Oxygen Concentrators",
  },
  {
    icon: "child_care",
    // number: "100+",
    label: "Paediatric Support Initiatives",
  },
];

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative py-20 px-4 sm:px-6 lg:py-28 lg:px-8 bg-gray-50 overflow-hidden "
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-3  bg-linear-to-tl from-orange-600 via-orange-500 to-yellow-400 rounded-full mb-6 shadow-lg"
        >
          {" "}
          <Hand className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white uppercase tracking-wider">
            Impact Created
          </span>
        </motion.div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
          Impact
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-tl mt-4 from-orange-600 via-orange-500 to-yellow-400 ">
            That Matters
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Our efforts have made a tangible difference in communities. Here's a
          look at the numbers.
        </p>
      </div>

      {/* Scrolling container */}
      <div className="overflow-hidden">
        <div className="flex gap-8 animate-scroll-slow w-full mb-7">
          {[...impactStats, ...impactStats].map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white rounded-xl shadow-md flex flex-col items-center text-center p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-6 border-2 border-cyan-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3">
                <div className="bg-cyan-100 rounded-full p-6 flex items-center justify-center">
                  <span className="material-symbols-outlined text-cyan-600 text-5xl">
                    {item.icon}
                  </span>
                </div>
              </div>
              {/* <p className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
                {item.number}
              </p>*/}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.label}
              </p> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
