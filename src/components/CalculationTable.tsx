import { useAtom } from "jotai";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { FormFiled, baseInfoAtom } from "../jotai/Atoms";
import { generateColumns } from "../utils/table-config";
import {
  FinancilaDetails,
  calculateFinancialDetails,
  formatToIndianRupees,
} from "../utils/calculation";
import SafeInvestments from "./SafeInvestments";
import { ROIPieChart } from "./ROIPieChart";

type Props = {};

const formatFieldToIndianRupees = (
  key: string,
  value: Partial<FinancilaDetails>
) => {
  const fieldsToConvert = [
    "starting_salary",
    "ending_salary",
    "needs",
    "wants",
    "investments",
    "portfolio",
  ];
  if (fieldsToConvert.includes(key)) {
    return formatToIndianRupees(value as number);
  }
  return value;
};

const CalculationTable = (props: Props) => {
  const [baseInfo, _] = useAtom(baseInfoAtom);
  const { financialDetails, npsAmount, pfAmount } =
    calculateFinancialDetails(baseInfo);
  const columnConfig = generateColumns<FinancilaDetails>(financialDetails[0]);

  const myInvestemntDetails = (financialDetails ?? []).reduce(
    (a, c) => (a += c.investments),
    0
  );

  const myRetursOnInv = financialDetails[financialDetails.length - 1].portfolio;
  console.log("==> y", myInvestemntDetails, myRetursOnInv);
  return (
    <>
      <div style={{ width: "70vh" }}>
        <ROIPieChart tableData={financialDetails ?? []} />
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Your kaccha chitha</TableCaption>
          <Thead>
            <Tr>
              {columnConfig.map(({ key, label }) => (
                <Th key={key}>{label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {(financialDetails ?? []).map((rowData) => {
              return (
                <Tr key={rowData.year}>
                  {columnConfig.map(({ key }) => {
                    console.log("rowData", rowData, "key", key);
                    return (
                      <Td>{formatFieldToIndianRupees(key, rowData[key])}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <SafeInvestments
        nps={baseInfo?.nps}
        npsAmount={npsAmount}
        period={(baseInfo?.retirementAge ?? 0) - (baseInfo?.age ?? 0)}
        pf={baseInfo?.pf}
        pfAmount={pfAmount}
        myInvestemt={myInvestemntDetails}
        myReturnOnInvestemnt={myRetursOnInv}
      />
      {/* <section>
        {pfAmount > 0 && (
          <div>
            You will have ${formatToIndianRupees(pfAmount)} rupees in PF as you
            have invested ${formatToIndianRupees(baseInfo?.pf ?? 0)} rupees per
            month for {(baseInfo?.retirementAge ?? 0) - (baseInfo?.age ?? 0)}{" "}
            years.
          </div>
        )}
        {npsAmount > 0 && (
          <div>
            You will have ${formatToIndianRupees(npsAmount)} rupees in NPS as
            you have invested ${formatToIndianRupees(baseInfo?.nps ?? 0)} rupees
            per month for{" "}
            {(baseInfo?.retirementAge ?? 0) - (baseInfo?.age ?? 0)} years.
          </div>
        )}
      </section> */}
    </>
  );
};

export default CalculationTable;
