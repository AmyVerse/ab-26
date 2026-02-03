// components/team/TeamMember.jsx

import { motion } from "framer-motion";
import styles from "./team.module.css";
import { itemVariants } from "./team.motion";

const TeamMember = ({ name, designation, column }) => {
  return (
    <motion.div
      className={`${styles.member} ${
        column === "left"
          ? styles.left
          : column === "right"
          ? styles.right
          : styles.center
      }`}
      variants={itemVariants}
    >
      <p className={styles.memberName}>{name}</p>
      <p className={styles.memberRole}>{designation}</p>
    </motion.div>
  );
};


export default TeamMember;
