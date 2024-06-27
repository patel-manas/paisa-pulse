// @ts-nocheck
import { atom } from "jotai";

export type FormFiled = {
  name: string;
  dob: Date;
  email?: string;
  salary: number;
  needs: number;
  wants: number;
  investments: number;
  inflation: number;
  expectedReturn: number;
  age?: number;
  retirementAge?: number;
  increment?: number;
  nps?: number;
  pf?: number;
};

export const baseInfoAtom = atom<FormFiled | null>(null);
