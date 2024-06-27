import { Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import heroImage from "../assets/hero.svg";

import "../styles/Main.scss";

type Props = {};

const Main = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigateToGetStarted = () => {
    navigate("/get-started");
  };

  return (
    <main className="main">
      <section className="info">
        <div className="hero_text">
          <Heading fontSize={"64px"}>
            Secure Your Future: Effortlessly Plan Your Retirement with
            PaisaPulse
          </Heading>
        </div>
        <div className="hero_desc">
          <Text>
            Unlock the door to a stress-free retirement with RetireEase.
            Tailored to your financial aspirations, RetireEase simplifies
            planning, investment management, and goal tracking. Embrace
            confidence in your retirement journey as you effortlessly pave the
            path to your dream lifestyle. Start shaping your future today with
            PaisaPulse
          </Text>
        </div>
        <div className="hero_action">
          <Button
            colorScheme="teal"
            size="md"
            onClick={handleNavigateToGetStarted}
          >
            Get Started
          </Button>
          <Button colorScheme="teal" size="md" variant="outline">
            Watch Demo
          </Button>
        </div>
      </section>
      <section className="hero_img">
        <img src={heroImage} alt="hero image" />
      </section>
    </main>
  );
};

export default Main;
