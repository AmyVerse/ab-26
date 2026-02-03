import { useEffect, useState } from "react"
import { motion } from "motion/react"

const Home = () => {

  const navLinks = [
    { content: "Home", to: "/" },
    { content: "About", to: "/" },
    { content: "Events", to: "/" },
    { content: "Sponsers", to: "/" },
    { content: "Teams", to: "/" },
    { content: "Contact Us", to: '/' }
  ]

  const scrollHandler = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  const [scale, setScale] = useState(window.innerWidth / 800)
  const scaleHandler = () => {
    const r = window.innerWidth / 800
    return r >= 1 ? 1 : r
  }
  useEffect(() => {
    const handleResize = () => {
      setScale(scaleHandler());
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-full h-full">

      {/* Hero section */}
      <section
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Home/image1.png')" }}
      >
        <div className="w-full h-full bg-linear-to-b from-black/90 to-black/60 flex flex-col justify-between">
          {/* Navbar */}
          <div className="px-6 py-3 w-full flex items-center justify-between gap-2.5">
            <div className="w-16 aspect-square">
              <img
                src="/Images/Home/ablogo.png"
                alt="AB Logo"
                className="invert w-full h-full aspect-square"
              />
            </div>
            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((n, i) => (
                <a key={i} href={n.to}>
                  <span className="text-white whitespace-nowrap">{n.content}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-white">
              <button type="button">Sign Up</button>
              <button
                type="button"
                className="px-6 py-1.5 bg-linear-to-b from-[#180308] to-[#440c17] border border-[#4d4d4d] rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
          <div className="px-10 sm:px-15 py-10 w-full h-fit flex flex-col items-center justify-center"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 1 } },
              }}
              className="flex gap-2.5 text-[#D4AF37] text-xl md:text-3xl translate-y-4"
            >
              {["THE", "ENCHANTED", "CIRCUS"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 1.5 } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            <div
              className="h-32 w-180 relative"
              style={{scale: scale}}
            >
              <div
                className="h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Images/Home/ab.png')" }}
              ></div>
              <motion.div
                animate={{
                  opacity: [0, 1, 1, 1, 0],
                  filter: [
                    "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                    "drop-shadow(0px 10px 25px rgba(212,175,55))",
                    "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  delay: 4
                }}
                className="absolute top-7 left-[calc(50%+2px)] z-10"
              >
                <img
                  src="/Images/Home/y.png"
                  alt=""
                  className="h-22.5"
                />
              </motion.div>
            </div>
            <motion.div
              animate={{
                opacity: [0, 1]
              }}
              transition={{
                duration: 1.5,
                delay: 3
              }}
              className="text-[#D4AF37] text-4xl md:text-6xl">
              2026
            </motion.div>
          </div>
          <div className="p-6 w-full h-fit flex flex-col md:flex-row gap-x-6 gap-y-3">
            <div className="w-full md:w-fit flex justify-center items-center gap-2">
              <div className="flex flex-col md:flex-row md:gap-4 items-center">
                <div className="h-10 aspect-square">
                  <img
                    src="/Images/Home/iiitn.png"
                    alt="IIITN"
                    className="h-full aspect-square"
                  />
                </div>
                <div className="text-white sm:whitespace-nowrap">
                  <div className="font-bold text-center">Indian Institute of Information Technology, Nagpur</div>
                  <div className="text-sm text-center md:text-left mt-0.5">An Institute of National Importance</div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2.5">
              <div className="w-[calc((100%-150px)/2)] h-0.5 rounded-full bg-white"></div>
              <div className="w-fit text-white font-bold whitespace-nowrap">
                19-21st March 2026
              </div>
              <div className="w-[calc((100%-150px)/2)] h-0.5 rounded-full bg-white"></div>
            </div>
            <div className="w-full md:w-fit h-full grid place-items-center">
              <button
                type="button"
                className="mt-2.5 md:mt-0 w-10 aspect-square rounded-2xl bg-contain bg-center bg-no-repeat duration-300 active:scale-85"
                onClick={scrollHandler}
                style={{ backgroundImage: "url('/Images/Home/arrow.png')" }}
              ></button>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section
        className="w-full h-fit bg-cover bg-center relative"
        style={{ backgroundImage: "url('/Images/Home/image2.jpg')" }}
      >
        <div className="w-full h-full backdrop-blur-xs bg-black/75">
          <div className="w-full min-h-screen flex flex-col">
            <div className="px-6 pt-16 pb-4 w-full h-fit bg-linear-to-b from-[#D4AF37]/35 to-transparent flex items-center gap-3 sm:gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-10 sm:w-26 h-0.5 rounded-full bg-white origin-left"
              />
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.5 } },
                }}
                className="flex gap-1.5"
              >
                {["The", "Annual", "Cultural", "Festival"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { duration: 1 } },
                    }}
                    className="text-white font-bold"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <div className="grow w-full h-fit px-8 flex flex-col">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 1,
                  delay: 2
                }}
                className="w-full max-w-150 h-16 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/Images/Home/aboutab.png')" }}
              ></motion.div>
              <div className="grow sm:px-3 py-6 w-full flex flex-col md:flex-row justify-evenly items-center gap-6">
                <div className="max-w-110">
                  <img
                    src="/Images/Home/magician.png"
                    alt="Magician"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full max-w-[max(700px,45vw)]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 1.5,
                      delay: 2.5
                    }}
                    className="w-full text-white md:text-xl text-justify"
                  >
                    Abhivyakti, the annual cultural extravaganza of IIIT Nagpur, is a grand celebration of creativity, artistry, and cultural diversity. True to its name, meaning “expression,” it offers students a vibrant platform to showcase their talents, push boundaries, and foster a spirit of camaraderie and collaboration. As one of the most awaited campus events, it transforms the institute into a lively hub of energy and artistic brilliance. The fest features electrifying concerts, mesmerizing dances, captivating plays, and stunning art exhibitions, inspiring participants to explore their potential and celebrate creativity in unique, memorable ways.
                  </motion.div>
                  <div className="mt-6 w-full md:w-fit grid place-items-center">
                    <button
                      type="button"
                      className="px-5 py-1.5 border border-[#676767] bg-linear-to-b from-[#3e1b08] to-[#602410] text-white rounded-md"
                    >
                      Explore Theme
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* Video section */}
        <div className="px-8 py-10 grid place-items-center">
          <div className="w-full max-w-200 border border-white/10 p-6 sm:px-14 sm:py-10 rounded-4xl">
            <div className="w-full h-100 overflow-hidden rounded-3xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/droNt6x2P7E"
                title='"The Greatest Show" Background Animation'
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Explore and Sponser Section*/}
      <section
        className="relative w-full bg-cover bg-center bg-red-950 bg-no-repeat h-fit"
        style={{ backgroundImage: "url('/Images/Home/red-royal-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div className="relative px-6 sm:px-10 lg:px-20 py-20 flex flex-col items-center gap-14">

          <div className="flex items-center gap-4">
            <div className="w-12 h-0.5 bg-white/80 rounded-full" />
            <span className="text-white text-sm sm:text-base tracking-wide">
              On Stage and Beyond
            </span>
            <div className="w-12 h-0.5 bg-white/80 rounded-full" />
          </div>

          <div
            className="w-full max-w-160 h-12 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Images/Home/EXPLORE.png')" }}
          />

          <div className="w-full max-w-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {[
              { img: "/Images/Home/pro-shows.png", title: "Explore Shows" },
              { img: "/Images/Home/Street-Activities.png", title: "Join The Fun" },
              { img: "/Images/Home/competition.png", title: "Compete Now" }
            ].map((item, i) => (
              <div
                key={i}
                className="group w-full max-w-80 rounded-4xl overflow-hidden bg-[#2a0e12]/80 border border-white/20 shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className="w-full h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                <div className="px-6 py-4 bg-[#7a4a2e] text-center text-white font-semibold tracking-wide">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* GUEST SECTION IN BETWEEN */}

        {/* Sponsers */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-20">

          <div className="mb-14">
            <h2 className="text-[#D4AF37] text-3xl tracking-widest font-semibold">
              SPONSORS
            </h2>
          </div>

          {/* Left -> Right */}
          <div className="overflow-hidden mb-10">
            <div
              className="flex gap-6 w-max animate-[marquee-right_25s_linear_infinite]"
            >
              {[...Array(10), ...Array(10)].map((_, i) => (
                <div
                  key={`top-${i}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Right → Left */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 w-max animate-[marquee-left_25s_linear_infinite]"
            >
              {[...Array(10), ...Array(10)].map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                />
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Home