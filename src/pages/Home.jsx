import CarouselOne from "../components/Carousel/CarouselOne.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Goals from "../components/MissionVision/Goals.jsx";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FeedbackJ from "../components/Feedback/FeedbackJ.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <CarouselOne />
      <Hero />
      <FeedbackJ />
      <Goals />
      <Footer />
    </>
  );
}