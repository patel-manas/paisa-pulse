import React, { ReactNode, useCallback } from "react";
import {
  Button,
  ComponentWithAs,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAtom } from "jotai";
import { baseInfoAtom } from "../jotai/Atoms";
import { useNavigate } from "react-router-dom";

type Props = {};

type FormField = {
  name: keyof FormFields;
  label: string;
  type?: string;
  Component?: ComponentWithAs<"button", ButtonProps>;
  validation?: Record<string, any>;
  defaultValue?: string;
  custom?: boolean;
};

type FormFields = {
  name: string;
  dob: Date;
  email?: string;
  needs: number;
  wants: number;
  investments: number;
  inflation: number;
  expectedReturn: number;
  age?: number;
  retirementAge?: number;
  increment: number;
  salary: number;
  nps: number;
  pf: number;
};

function calculateAge(dateOfBirth: Date) {
  var dob = new Date(dateOfBirth);
  var currentDate = new Date();

  var age = currentDate.getFullYear() - dob.getFullYear();
  var monthDiff = currentDate.getMonth() - dob.getMonth();

  // If the current month is less than the birth month
  // or if they are in the same month but the current day is less than the birth day,
  // subtract 1 from age
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

const validateSum = (fields: Partial<FormFields>) => {
  console.log("fields", fields);
  const { needs, wants, investments } = fields;
  const sum = (needs || 0) + (wants || 0) + (investments || 0);
  return (
    sum <= 100 ||
    "Total sum of needs, wants, and investments should not exceed 100"
  );
};

const fieldDefinitions: FormField[] = [
  {
    name: "name",
    label: "Your Name",
    type: "text",
    validation: { required: "Name is required" },
  },
  {
    name: "dob",
    label: "DOB",
    defaultValue: "1995-05-22",
    type: "date",
    validation: { required: "DOB is required" },
  },
  {
    name: "retirementAge",
    label: "Retirement Age",
    type: "number",
    validation: {},
  },
  { name: "email", label: "Your Email (Optional)", type: "email" },
  {
    name: "salary",
    label: "Monthly Takehome Salary (After Tax, PF and NPS deduction)",
    type: "number",
    validation: {
      required: "Salary is the essential part ",
    },
  },
  {
    name: "needs",
    label: "Needs",
    type: "number",
    validation: {
      required: "Needs is required",
      validate: validateSum,
    },
  },
  {
    name: "wants",
    label: "Wants",
    type: "number",
    validation: {
      required: "Wants is required",
      validate: validateSum,
    },
  },
  {
    name: "investments",
    label: "Investments",
    type: "number",
    validation: {
      required: "Investments is required",
      validate: validateSum,
      onChange: (e) => console.log("e", e),
    },
  },
  {
    name: "increment",
    label: "Increment",
    type: "number",
    validation: {
      required: "Increment is required",
      max: 60,
    },
  },
  {
    name: "inflation",
    label: "Inflation",
    type: "number",
    validation: { required: "Inflation is required" },
  },
  {
    name: "expectedReturn",
    label: "Expected Return",
    type: "number",
    validation: { required: "Expected return is required" },
  },
  {
    name: "nps",
    label: "Nps Amount ( Mothly deduction toward NPS )",
    type: "number",
    validation: {},
  },
  {
    name: "pf",
    label: "PF Amount ( Mothly deduction toward PF )",
    type: "number",
    validation: {},
  },
];

const NewGetStarted = (props: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors = {} },
  } = useForm<FormFields>({
    defaultValues: {
      name: "Manas Patel",
      dob: new Date("1995-05-22"),
      email: "mp@45.com",
      needs: 50,
      wants: 10,
      investments: 40,
      inflation: 6,
      expectedReturn: 12,
      increment: 8,
      salary: 230000,
      retirementAge: 50,
      nps: 10000,
      pf: 32000,
    },
  });
  const navigate = useNavigate();
  const [_, setBaseInfo] = useAtom(baseInfoAtom);
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    const { dob } = data;
    setBaseInfo(Object.assign({}, data, { age: calculateAge(dob) }));
    console.log("dob", Object.assign({}, data, { age: calculateAge(dob) }));
    navigate("/calculation");
  };

  const handleTotalPct = useCallback(
    (e) => {
      console.log("getValues", getValues());
      const { needs, wants, investments } = getValues();
      console.log({ needs, wants, investments });
      const affctedFields: ["needs", "wants", "investments"] = [
        "needs",
        "wants",
        "investments",
      ];
      if (Number(needs) + Number(wants) + Number(investments) > 100) {
        affctedFields.forEach((field) => {
          setError(field, {
            type: "manual",
            message:
              "Total sum of needs, wants, and investments should not exceed 100",
          });
        });
      } else {
        affctedFields.forEach((filed) => {
          clearErrors(filed);
        });
      }
    },
    [getValues]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl width={"30%"} paddingY={"64px"}>
          {fieldDefinitions.map(
            ({ name, label, type, validation, defaultValue }) => (
              <React.Fragment key={name}>
                <FormLabel>{label}</FormLabel>
                <Input
                  type={type}
                  isInvalid={!!errors[name]}
                  {...(defaultValue ? { value: defaultValue } : {})}
                  {...register(name, {
                    ...validation,
                    ...(["needs", "wants", "investments"].includes(name)
                      ? { onChange: handleTotalPct }
                      : {}),
                  })}
                />

                <FormHelperText>
                  {errors[name] ? errors[name].message : ""}
                </FormHelperText>
              </React.Fragment>
            )
          )}
        </FormControl>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

export default NewGetStarted;
