// @ts-nocheck
import { Box, Tooltip } from "@chakra-ui/react";
import { formatToIndianRupees } from "../utils/calculation";

type SafeInvestmentsProps = {
  npsAmount?: number;
  pfAmount?: number;
  period?: number;
  pf?: number;
  nps?: number;
  myInvestemt?: number;
  myReturnOnInvestemnt?: number;
};

const SafeInvestments = ({
  npsAmount = 0,
  nps = 0,
  pfAmount = 0,
  pf = 0,
  period = 0,
  myInvestemt = 0,
  myReturnOnInvestemnt = 0,
}: SafeInvestmentsProps) => {
  const npsInvested = nps * 12 * period;
  const npsMultiplier = Math.floor(npsAmount / npsInvested);
  const npsMultiplierPct = Math.floor(100 / (npsMultiplier + 1));

  const pfInvested = pf * 12 * period;
  const pfMultiplier = Math.floor(pfAmount / pfInvested);
  const pfMultiplierPct = Math.floor(100 / (pfMultiplier + 1));

  const myInvMultiplier = Math.floor(myReturnOnInvestemnt / myInvestemt);
  const myInvMultiplierPct = Math.floor(100 / (myInvMultiplier + 1));
  console.log("==> x", {
    myInvestemt,
    myReturnOnInvestemnt,
    myInvMultiplier,
    myInvMultiplierPct,
  });

  console.log("==>", {
    nps,
    npsAmount,
    npsInvested,
    npsMultiplier,
    npsMultiplierPct,
  });
  return (
    <Box
      height="500px"
      width="100%"
      justifyContent="space-around"
      flexDirection="row"
      gap="100px"
      display="flex"
    >
      {npsAmount > 0 && (
        <Box
          height="100%"
          gap="20px"
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="row"
            gap="20px"
            alignItems="flex-end"
          >
            <Tooltip
              label={`Amount Invested in NPS: ${formatToIndianRupees(
                npsInvested
              )}`}
            >
              <Box
                className="nps invested"
                backgroundColor="cyan"
                height={`${npsMultiplierPct}%`}
                width="100px"
                display="flex"
              ></Box>
            </Tooltip>
            <Tooltip
              label={`
      Esimated Returs in NPS: ${formatToIndianRupees(
        npsAmount - npsInvested
      )} <br />
      Total value in NPS: ${formatToIndianRupees(npsAmount)} 
  `}
            >
              <Box
                className="nps return"
                backgroundColor="blue"
                height={`${npsMultiplier * npsMultiplierPct}%`}
                width="100px"
                display="flex"
              ></Box>
            </Tooltip>
          </Box>
          <Box>
            <h1>NPS</h1>
          </Box>
        </Box>
      )}
      {pfAmount > 0 && (
        <Box
          height="100%"
          gap="20px"
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="row"
            gap="20px"
            alignItems="flex-end"
          >
            <Tooltip
              label={`Amount Invested in PF: ${formatToIndianRupees(
                pfInvested
              )}`}
            >
              <Box
                className="nps invested"
                backgroundColor="cyan"
                height={`${pfMultiplierPct}%`}
                width="100px"
                display="flex"
              ></Box>
            </Tooltip>
            <Tooltip
              label={`
    Esimated Returs in PF: ${formatToIndianRupees(pfAmount - pfInvested)} <br />
    Total value in PF: ${formatToIndianRupees(pfAmount)} 
`}
            >
              <Box
                className="nps return"
                backgroundColor="blue"
                height={`${pfMultiplier * pfMultiplierPct}%`}
                width="100px"
                display="flex"
              ></Box>
            </Tooltip>
          </Box>
          <Box>
            <h1>PF</h1>
          </Box>
        </Box>
      )}

      {myInvestemt && myReturnOnInvestemnt && (
        <Box
          height="100%"
          gap="20px"
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="row"
            gap="20px"
            alignItems="flex-end"
          >
            <Tooltip
              label={`Amount Invested in My Investemnts: ${formatToIndianRupees(
                myInvestemt
              )}`}
            >
              <Box
                className="nps invested"
                backgroundColor="cyan"
                height={`${npsMultiplierPct}%`}
                width="100px"
                display="flex"
              ></Box>
            </Tooltip>
            <Tooltip
              label={`
            Esimated Returs in My Investments: ${formatToIndianRupees(
              myReturnOnInvestemnt - myInvestemt
            )} <br />
            Total value in NPS: ${formatToIndianRupees(myReturnOnInvestemnt)} 
        `}
            >
              <Box
                className="nps return"
                backgroundColor="blue"
                height={`${myInvMultiplier * myInvMultiplierPct}%`}
                width="100px"
                display="flex"
              ></Box>
            </Tooltip>
          </Box>
          <Box>
            <h1>My Investements</h1>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SafeInvestments;
