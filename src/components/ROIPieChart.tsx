import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FinancilaDetails } from "../utils/calculation";

ChartJS.register(ArcElement, Tooltip, Legend);

const getData = (totalInvestement: number, totalReturns: number) => {
  const data = {
    labels: ["Investement", "Total Returns"],
    datasets: [
      {
        label: "Value in INR:",
        legend: "some hisng ",
        data: [totalInvestement ?? 0, totalReturns ?? 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return data;
};
export function ROIPieChart({
  tableData = [],
}: {
  tableData: FinancilaDetails[];
}) {
  const totalInvestement = tableData.reduce((a, c) => (a += c.investments), 0);
  const totalReturns = tableData[tableData.length - 1].portfolio ?? 0;
  return <Pie data={getData(totalInvestement, totalReturns)} />;
}
