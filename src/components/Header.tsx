// @ts-nocheck
import { Button, Text } from "@chakra-ui/react";

import logoImg from "../assets/salary.png";

import "../styles/Header.scss";
import { useNavigate } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <header className={"container"}>
      <section className={"logo"} onClick={handleNavigateToHome}>
        <img src={logoImg} alt="logoImghero image" />
        <Text fontSize="xl">Paisa Pulse</Text>
      </section>
      <nav className={"main_nav"}></nav>
      <section className={"actions"}>
        <Button colorScheme="teal" size="md">
          Sign Up
        </Button>
        <Button colorScheme="teal" size="md">
          Login
        </Button>
      </section>
    </header>
  );
};

export default Header;
