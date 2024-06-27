const transformkey = (value: string): string => {
  // Check if the word is not empty
  if (value.length > 0) {
    if (value.includes("_")) {
      return value
        .split("_")
        .map((v: string) => transformkey(v))
        .join(" ");
    }
    // Capitalize the first letter and concatenate it with the rest of the value
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    return value; // Return the word as is if it's empty
  }
};

export const generateColumns = <TableDataType extends Record<string, unknown>>(
  data: TableDataType
): Array<{ key: string; label: string }> => {
  return Object.keys(data).map((key: string) => {
    return {
      key,
      label: transformkey(String(key)),
    };
  });
};
