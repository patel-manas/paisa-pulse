// @ts-nocheck
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

type Props = {};

const PersonalInfo = (props: Props) => {
  return (
    <FormControl width={"30%"} paddingY={"64px"}>
      <FormLabel>Your Name</FormLabel>
      <Input type="text" />
      <FormLabel>DOB</FormLabel>
      <Input type="date" />
      <FormLabel>Your Email (Optional)</FormLabel>
      <Input type="email" />

      <FormLabel>Your Salary(Monthly in hand after deduction)</FormLabel>
      <Input type="number" />
      <FormLabel>Increment</FormLabel>
      <Input type="number" />
    </FormControl>
  );
};

export default PersonalInfo;
