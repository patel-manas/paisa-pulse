// @ts-nocheck
import { Box, Button, Heading } from "@chakra-ui/react";

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

import "../styles/GetStarted.scss";
import PersonalInfo from "./forms/PersonalInfo";
import IncomeInfo from "./forms/IncomeInfo";
import Expectation from "./forms/Expectation";
import React from "react";

type Props = {};

const steps = [
  { title: "First", description: "About you" },
  { title: "Second", description: "About your habits" },
  { title: "Third", description: "Expectations" },
];

interface FormMap {
  [key: string]: React.ReactNode;
}

const GetStarted = (props: Props) => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 1,
    count: steps.length,
  });

  const formMap: FormMap = {
    "1": <PersonalInfo />,
    "2": <IncomeInfo />,
    "3": <Expectation />,
  };

  console.log("activeStep", activeStep);

  return (
    <main className="get_started">
      <section className="header">
        <Heading>Hey there, lets get to know each other</Heading>
      </section>
      <section className="stepper">
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </section>
      <section className="form">{formMap[activeStep]}</section>
      <section className="controls">
        {activeStep > 1 && <Button onClick={goToPrevious}>Previous</Button>}
        {activeStep < steps.length && <Button onClick={goToNext}>Next</Button>}
        {activeStep === steps.length && (
          <Button onClick={() => alert("done")}>Submit</Button>
        )}
      </section>
    </main>
  );
};

export default GetStarted;
