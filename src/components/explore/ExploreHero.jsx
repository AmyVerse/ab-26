import { motion } from "framer-motion";
import "./ExploreHero.css";

import bgExplore from "@/assets/background/explore_bg.webp";

import img1 from "@/assets/background/card_1.webp";
import img2 from "@/assets/background/card_2.webp";
import img3 from "@/assets/background/card_3.webp";
import img4 from "@/assets/background/card_4.webp";
import img5 from "@/assets/background/card_5.webp";

const cards = [img1, img2, img3, img4, img5];

/* cards enter together */
const enter = {
  hidden: { y: "120vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

/* subtle floating */
const float = (i) => ({
  animate: {
    y: [0, -6 - i * 1.2, 0],
    x: [0, (i % 2 === 0 ? 1 : -1) * 2, 0],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3,
    },
  },
});

export default function ExploreHero() {
  return (
    <section className="explore-hero">
      {/* background */}
      <div
        className="explore-bg"
        style={{ backgroundImage: `url(${bgExplore})` }}
      />

      {/* cards + explore wrapper */}
      <motion.div
        className="explore-stage"
        variants={enter}
        initial="hidden"
        animate="visible"
      >
        <div className="explore-cards">
          {cards.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt=""
              className={`explore-card pos-${i}`}
              variants={float(i)}
              animate="animate"
            />
          ))}
        </div>

        {/* EXPLORE text */}
        <motion.h1
          className="explore-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          EXPLORE
        </motion.h1>
      </motion.div>

      {/* stats */}
      <div className="explore-stats">
        <div className="stat">
          <span className="stat-num">10+</span>
          <span className="stat-text">Guests & Artists</span>
        </div>
        <div className="stat">
          <span className="stat-num">30+</span>
          <span className="stat-text">Events & Competitions</span>
        </div>
        <div className="stat">
          <span className="stat-num">10+</span>
          <span className="stat-text">Lakh Prize Pool</span>
        </div>
      </div>
    </section>
  );
}
