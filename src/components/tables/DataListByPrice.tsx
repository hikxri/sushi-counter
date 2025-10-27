import { Box, HStack, Text } from "@chakra-ui/react";
import { useDataContext, type DataType } from "../../contexts/DataContext";
import { getTranslation } from "../../lib/translation";
import { useLanguageContext } from "../../contexts/LanguageContext";

export default function DataListByPrice() {
  const { data } = useDataContext();
  const tl = getTranslation(useLanguageContext().language);

  const categorizedData = Object.entries(
    data.reduce((acc: { [key: number]: number }, d: DataType) => {
      if (acc[d.price] !== undefined) {
        acc[d.price] += 1;
      } else {
        acc[d.price] = 1;
      }
      return acc;
    }, {})
  ).sort((a, b) => Number(a[0]) - Number(b[0]));

  return (
    <Box>
      {categorizedData.map(([price, count]) => (
        <HStack justifyItems={"center"}>
          <Text>{price} 円: </Text>
          <Text>{count} {tl.items}</Text>
        </HStack>
      ))}
    </Box>
  );
}
