import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { useDataContext } from "./contexts/DataContext";
import DataTable from "./components/tables/DataTable";
import { useNavigate } from "react-router";
import DataListByPrice from "./components/tables/DataListByPrice";
import { getTranslation } from "./lib/translation";
import { useLanguageContext } from "./contexts/LanguageContext";
import ResetDataButton from "./components/ui/ResetDataButton";
import { FaChevronLeft } from "react-icons/fa6";

export default function Kaikei() {
  const { data } = useDataContext();
  const tl = getTranslation(useLanguageContext().language);
  const total = data.reduce((acc, d) => acc + d.price, 0);
  const totalWithTax = (total * 1.1).toFixed(1);

  const navigate = useNavigate();

  return (
    <Center minWidth={"50vw"}>
      <Stack marginY={"5"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={"3xl"}>
          {tl.checkout}
        </Text>
        <Text fontSize={"4xl"}>{totalWithTax} 円</Text>
        <Text fontSize={"lg"}>({total} 円 + 10% {tl.tax})</Text>
        <DataTable canDelete={false} />
        <DataListByPrice />
        <Button marginTop={"4"} onClick={() => navigate("/")}><FaChevronLeft />{tl.backButtonLabel}</Button>
        <ResetDataButton />
      </Stack>
    </Center>
  );
}
