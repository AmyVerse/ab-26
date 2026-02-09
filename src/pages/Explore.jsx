// src/pages/Explore.jsx

import { useState } from "react";

import ExploreHero from "@/components/explore/ExploreHero";
import ExploreTabs from "../components/explore/ExploreTabs";
import ExploreSection from "../components/explore/ExploreSection";

import { exploreData } from "../data/exploreData";

const Explore = () => {
    const [activeTab, setActiveTab] = useState("proShows");

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return (
        <main>
            {/* Hero Section */}
            <ExploreHero />

            {/* Black background content */}
            <section style={{ background: "#000", minHeight: "100vh" }}>
                <ExploreTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                <ExploreSection
                    items={exploreData[activeTab]}
                />
            </section>
        </main>
    );
};

export default Explore;
