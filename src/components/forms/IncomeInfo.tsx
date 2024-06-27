// @ts-nocheck
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

type Props = {};

const IncomeInfo = (props: Props) => {
  return (
    <FormControl width={"30%"} paddingY={"64px"}>
      <FormLabel>Your Salary(Monthly in hand after deduction)</FormLabel>
      <Input type="number" />
      <FormLabel>Increment</FormLabel>
      <Input type="number" />
    </FormControl>
  );
};

export default IncomeInfo;
