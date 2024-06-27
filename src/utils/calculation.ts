import { sipReturns } from "personal-finance-calculator";
import { FormFiled } from "../jotai/Atoms";

const SAFE_INVESTEMNT_RETURNS = {
  PF: 7.1,
  NPS: 12,
};

export type FinancilaDetails = {
  age: number;
  year: number;
  starting_salary: number;
  increment: number;
  ending_salary: number;
  needs: number;
  wants: number;
  investments: number;
  portfolio: number;
};

const currentYear = new Date().getFullYear();

export const calculateFinancialDetails = (
  data: FormFiled | null
): {
  financialDetails: FinancilaDetails[] | [];
  pfAmount: number;
  npsAmount: number;
} => {
  if (!data) {
    return { financialDetails: [], pfAmount: 0, npsAmount: 0 };
  }

  const financialDetails: Array<FinancilaDetails> = [];
  const {
    age,
    retirementAge,
    salary: monthlySalary,
    needs,
    wants,
    inflation,
    expectedReturn,
    investments,
    increment,
    pf,
    nps,
  } = data;

  // see the base row
  financialDetails.push({
    age: age ?? 0,
    year: currentYear,
    starting_salary: 0,
    increment: 0,
    ending_salary: monthlySalary * 12,
    needs: monthlySalary * 12 * (needs / 100),
    wants: monthlySalary * 12 * (wants / 100),
    investments: monthlySalary * 12 * (investments / 100),
    portfolio: monthlySalary * 12 * (investments / 100),
  });

  // for rest of the rows
  for (let i = 1; i < (retirementAge ?? 0) - (age ?? 0); i++) {
    const lastYearSalary = financialDetails[i - 1].ending_salary;
    const endingSalary = lastYearSalary * (1 + (increment ?? 0) / 100);
    const lastYearPortfolio = financialDetails[i - 1].portfolio;

    financialDetails.push({
      age: (age ?? 0) + i,
      year: currentYear + i,
      starting_salary: lastYearSalary,
      increment: increment ?? 0,
      ending_salary: endingSalary,
      needs: endingSalary * (needs / 100),
      wants: endingSalary * (wants / 100),
      investments: endingSalary * (investments / 100),
      portfolio:
        lastYearPortfolio * (1 + expectedReturn / 100) +
        endingSalary * (investments / 100),
    });
  }

  let pfAmount = 0;
  let npsAmount = 0;
  if (pf) {
    pfAmount = safeInvestmentReturns(
      pf,
      (retirementAge ?? 0) - (age ?? 0),
      SAFE_INVESTEMNT_RETURNS.PF
    );
  }

  if (nps) {
    npsAmount = safeInvestmentReturns(
      nps,
      (retirementAge ?? 0) - (age ?? 0),
      SAFE_INVESTEMNT_RETURNS.NPS
    );
  }

  return { financialDetails, pfAmount, npsAmount };
};

export function formatToIndianRupees(amount: number) {
  // Check if input is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return amount;
  }

  // Convert the number to Indian Rupees format
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(amount);
}

export const safeInvestmentReturns = (
  amount: number,
  period: number,
  returnPct: number
): number => {
  // const yearlyAmount = amount * 12;
  // let returnAmount = 0;
  // for (let i = 0; i <= period; i++) {
  //   returnAmount += yearlyAmount * (1 + returnPct / 100);
  // }

  // return returnAmount;
  return +sipReturns(amount, period * 12, returnPct / 100);
};
