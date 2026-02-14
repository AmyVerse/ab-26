import { useState } from "react";
import {
  FaChevronDown,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import ContactHero from "../components/contact/ContactHero";

// Team contacts
const teamContacts = [
  {
    name: "Sanskar Yede",
    role: "Marketing Lead",
    phone: "+91 86025 27698",
    email: "abhivyakti.marketing@iiitn.ac.in",
  },
  {
    name: "Vaibhav Chouksey",
    role: "Hospitality Lead",
    phone: "+91 96443 61455",
    email: "abhivyakti.hospitality@iiitn.ac.in",
  },
  {
    name: "Arkin Singh",
    role: "Corporate Lead",
    phone: "+91 83198 16357",
    email: "abhivyakti.corporate@iiitn.ac.in",
  },
];

// How to reach information
const reachUs = {
  railway: [
    "Take a cab to Sitabuldi (Panchsheel Square) and board a bus to IIIT.",
    "Take the Blue Line Metro to Sitabuldi or South Airport Metro Station and catch a bus from there.",
    "From Sitabuldi, you can also take a bus towards Butibori and get down near IIIT Nagpur highway → then take an E-Rickshaw.",
    "You can also take a CAB directly to IIIT Nagpur.",
    "Book an Auto.",
  ],
  airport: [
    "Take a bus to Butibori from South Airport Metro Station / Airport → then take an E-Rickshaw from the highway.",
    "Take a CAB directly to IIIT Nagpur.",
    "Book an Auto.",
  ],
  sitabuldi: [
    "From Sitabuldi (Panchsheel Square), board a bus to IIIT.",
    "Take a bus towards Butibori and get down near IIIT Nagpur highway → then take an E-Rickshaw.",
    "Take a CAB directly to IIIT Nagpur.",
    "Book an Auto.",
  ],
  butibori: [
    "Directly take an E-Rickshaw to IIIT Nagpur.",
    "Board a bus from Butibori towards Nagpur, get down near IIIT highway and take an E-Rickshaw.",
  ],
};

// Bus Schedule
const busSchedule = [
  { serial: 1, nagpur: "6:55 AM", iiitn: "7:55 AM" },
  { serial: 2, nagpur: "8:10 AM", iiitn: "9:10 AM" },
  { serial: 3, nagpur: "9:25 AM", iiitn: "10:25 AM" },
  { serial: 4, nagpur: "10:30 AM", iiitn: "11:30 AM" },
  { serial: 5, nagpur: "11:10 AM", iiitn: "12:10 PM" },
  { serial: 6, nagpur: "1:10 PM", iiitn: "2:10 PM" },
  { serial: 7, nagpur: "1:25 PM", iiitn: "2:25 PM" },
  { serial: 8, nagpur: "2:15 PM", iiitn: "3:15 PM" },
  { serial: 9, nagpur: "3:40 PM", iiitn: "4:40 PM" },
  { serial: 10, nagpur: "4:45 PM", iiitn: "5:45 PM" },
  { serial: 11, nagpur: "5:05 PM", iiitn: "6:05 PM" },
  { serial: 12, nagpur: "7:15 PM", iiitn: "8:15 PM" },
];

// Social Links
const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/abhivyakti_iiitn/",
    label: "Instagram",
  },
  {
    icon: FaWhatsapp,
    href: "https://whatsapp.com/channel/0029Vb76UV4It5rz4wHKru17",
    label: "WhatsApp",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/abhivyakti-iiitn/",
    label: "LinkedIn",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/AIiitn",
    label: "Twitter",
  },
];

const Contact = () => {
  const [showBusSchedule, setShowBusSchedule] = useState(false);
  return (
    <main>
      <ContactHero />
      <div className="w-full px-6 sm:px-10 md:px-20 lg:px-60 mx-auto bg-black">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-center">
          CONTACT US
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-10 md:gap-12 pb-12 sm:pb-16">
          {/* Left: Team Contacts */}
          <div className="space-y-6 sm:space-y-8">
            <h2
              style={{ fontFamily: "var(--font-besta-baru)" }}
              className="text-3xl sm:text-3xl md:text-4xl tracking-wider font-bold text-white mb-6 sm:mb-8"
            >
              REACH OUT TO OUR TEAM
            </h2>

            {/* Team Members */}
            <div className="space-y-7 sm:space-y-9">
              {teamContacts.map((contact, index) => (
                <div
                  key={index}
                  className="border-l-4 border-red-500 pl-4 sm:pl-6"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-base sm:text-lg text-yellow-200 font-medium mb-3">
                    {contact.role}
                  </p>
                  <div className="space-y-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition"
                    >
                      <FaPhone size={16} />
                      <span className="text-sm sm:text-base">
                        {contact.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition break-all"
                    >
                      <FaEnvelope size={16} />
                      <span className="text-sm sm:text-base">
                        {contact.email}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Follow Us - Hidden on mobile */}
            <div className="hidden md:block mt-10 md:mt-12 pt-8 md:pt-10 border-t border-gray-700">
              <h3 className="text-lg md:text-xl font-semibold text-yellow-200 mb-6">
                FOLLOW US
              </h3>
              <div className="flex gap-6 md:gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-200 transition-colors"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: How to Reach */}
          <div>
            <h2
              style={{ fontFamily: "var(--font-besta-baru)" }}
              className="text-3xl sm:text-3xl md:text-4xl font-bold text-white tracking-wider mb-6 sm:mb-8"
            >
              HOW TO REACH IIIT Nagpur
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {/* From Railway Station */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-3">
                  🚉 From Railway Station
                </h3>
                <ul className="space-y-2">
                  {reachUs.railway.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 text-sm sm:text-base leading-relaxed"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* From Airport */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-3">
                  ✈️ From Airport
                </h3>
                <ul className="space-y-2">
                  {reachUs.airport.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 text-sm sm:text-base leading-relaxed"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* From Sitabuldi */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-3">
                  🚌 From Sitabuldi Bus Stop
                </h3>
                <ul className="space-y-2 mb-4">
                  <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    • {reachUs.sitabuldi[0]}
                  </li>
                </ul>
                {/* Bus Schedule Dropdown */}
                <button
                  onClick={() => setShowBusSchedule(!showBusSchedule)}
                  className="flex items-center gap-2 text-white px-3 sm:px-4 py-1 sm:py-2 mb-4 rounded text-sm sm:text-base font-semibold transition-all hover:brightness-110"
                  style={{
                    background: "rgb(123, 15, 31)",
                  }}
                >
                  <span>View Bus Schedule</span>
                  <FaChevronDown
                    size={16}
                    className={`transition-transform ${showBusSchedule ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Bus Schedule Table */}
                {showBusSchedule && (
                  <div className="overflow-x-auto bg-gray-900 rounded mb-4 border-gray-700">
                    <table className="w-full text-center text-xs sm:text-sm">
                      <thead>
                        <tr style={{ background: "rgb(123, 15, 31)" }}>
                          <th className="px-3 py-2 border border-gray-600 text-white">
                            Serial No.
                          </th>
                          <th className="px-3 py-2 border border-gray-600 text-white">
                            Nagpur (Sitabuldi)
                          </th>
                          <th className="px-3 py-2 border border-gray-600 text-white">
                            IIIT Nagpur
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {busSchedule.map((row, idx) => (
                          <tr key={idx} className="border border-gray-600">
                            <td className="px-3 py-2 text-gray-300">
                              {row.serial}
                            </td>
                            <td className="px-3 py-2 text-gray-300">
                              {row.nagpur}
                            </td>
                            <td className="px-3 py-2 text-gray-300">
                              {row.iiitn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <ul className="space-y-2">
                  {reachUs.sitabuldi.slice(1).map((item, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 text-sm sm:text-base leading-relaxed"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* From Butibori */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-3">
                  🛺 From Butibori
                </h3>
                <ul className="space-y-2">
                  {reachUs.butibori.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 text-sm sm:text-base leading-relaxed"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
