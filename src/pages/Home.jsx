import About from "../components/home/About/About";
import AboutTheme from "../components/home/AboutTheme/AboutTheme";
import Explore from "../components/home/Explore/Explore";
import GuestsSpeakers from "../components/home/GuestsSpeakers/GuestsSpeakers";
import Hero from "../components/home/Hero/Hero";
import Sponsors from "../components/home/Sponsors/Sponsors";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <About />
      <Explore />
      <GuestsSpeakers />
      <Sponsors />
      <AboutTheme />
    </div>
  );
};

export default Home;
