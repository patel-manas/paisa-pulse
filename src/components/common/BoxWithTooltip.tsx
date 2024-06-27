import { Box, Tooltip } from "@chakra-ui/react";
import React, { PropsWithChildren, ComponentProps } from "react";

type BoxWithTooltipProps = ComponentProps<typeof Box> &
  PropsWithChildren<{
    toltipContent: string;
  }>;

const BoxWithTooltip = (props: BoxWithTooltipProps) => {
  const { children, toltipContent, ...restProps } = props;
  <Tooltip label="toltipContent">
    <Box {...restProps}>{children}</Box>
  </Tooltip>;
};

export default BoxWithTooltip;
