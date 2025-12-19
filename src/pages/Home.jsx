import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import QuickStats from "../components/home/QuickStats";
import About from "../components/home/About";
import Contact from "../components/home/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <QuickStats />

      <section id="about">
        <About />
      </section>

      <Features />

      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;
