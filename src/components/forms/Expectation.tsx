// @ts-nocheck
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

type Props = {};

const Expectation = (props: Props) => {
  return (
    <FormControl width={"30%"} paddingY={"64px"}>
      <FormLabel>Needs</FormLabel>
      <Input type="number" />
      <FormLabel>Wants</FormLabel>
      <Input type="number" />
      <FormLabel>Investments</FormLabel>
      <Input type="number" />
      <FormLabel>Infalation</FormLabel>
      <Input type="number" />
      <FormLabel>Expected Returm</FormLabel>
      <Input type="number" />
    </FormControl>
  );
};

export default Expectation;
