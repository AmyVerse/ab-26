// components/team/TeamGroup.jsx

import { motion } from "framer-motion";
import styles from "./team.module.css";
import TeamMember from "./TeamMember";
import { sectionVariants } from "./team.motion";

const TeamGroup = ({ title, members }) => {
  return (
    <motion.section
      className={styles.group}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {/* Title Row */}
      <div className={styles.titleRow}>
        <span className={styles.line} />
        <h2 className={styles.title}>{title}</h2>
      </div>

      {/* Members Grid */}
      {/* Desktop Layout: Split Columns */}
      <div className={`${styles.membersGrid} ${styles.desktopLayout}`}>
        {members.map((member, index) => (
          <TeamMember
            key={`desktop-${index}`}
            name={member.name}
            designation={member.designation}
            column={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      {/* Mobile Layout: Unified Stack */}
      <div className={styles.mobileLayout}>
        {members.map((member, index) => (
          <TeamMember
            key={`mobile-${index}`}
            name={member.name}
            designation={member.designation}
            column="center"
          />
        ))}
      </div>


    </motion.section>
  );
};

export default TeamGroup;
