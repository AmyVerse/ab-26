// components/team/TeamSection.jsx

import TeamGroup from "./TeamGroup";
import styles from "./team.module.css";

const TeamSection = () => {
  const teamOne = [
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
  ];

  const teamTwo = [
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
  ];

  const clubs = [
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
    { name: "Name Here", designation: "Designation" },
  ];

  return (
    <div className={styles.teamSection}>
      <TeamGroup title="TEAM NAME" members={teamOne} />
      <TeamGroup title="TEAM NAME" members={teamTwo} />
      <TeamGroup title="CLUBS" members={clubs} />
    </div>
  );
};

export default TeamSection;
