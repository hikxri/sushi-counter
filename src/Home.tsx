import {
  Button,
  Center,
  createListCollection,
  Field,
  Input,
  NumberInput,
  Portal,
  Select,
  Stack,
  Text,
  type ListCollection,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDataContext } from "./contexts/DataContext";
import { sushiPrices } from "./lib/sushiData";
import DataTable from "./components/tables/DataTable";
import ResetDataButton from "./components/ui/ResetDataButton";
import { getTranslation } from "./lib/translation";
import { useLanguageContext } from "./contexts/LanguageContext";
import { useNavigate } from "react-router";
import { FaCartShopping, FaPlus } from "react-icons/fa6";

export default function Home() {
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [note, setNote] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const { data, setData } = useDataContext();
  const index = useRef<number>(data.reduce((acc, d) => Math.max(acc, d.index), 0) + 1 || 0);
  const tl = getTranslation(useLanguageContext().language);
  const navigate = useNavigate();

  const options = createListCollection({
    items: [
      { label: tl.other, value: "other" },
      ...sushiPrices.map((p) => {
        return { label: p + " 円", value: p };
      }),
    ],
  });

  useEffect(() => {
    setTotal(
      data.reduce((acc, d) => {
        return acc + d.price;
      }, 0)
    );
  }, [data]);

  return (
    <Center minWidth={"50vw"}>
      <Stack marginY={"5"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={"3xl"}>
          {tl.title}
        </Text>
        <Text fontSize={"4xl"}>{(total * 1.1).toFixed(1)} 円</Text>
        <Text fontSize={"lg"}>
          ({total} 円 + 10% {tl.tax})
        </Text>
        {/* <Stack width={"100%"} marginY={3} direction={{ base: "column", md: "row" }}> */}
        <Stack width={"100%"} marginY={3}>
          <PriceSelector
            options={options}
            selected={selectedPrice}
            onSelect={setSelectedPrice}
            customPrice={customPrice}
            setCustomPrice={setCustomPrice}
          />
          <NoteInput note={note} setNote={setNote} />
        </Stack>
        <Button paddingX="5" onClick={onAdd}>
          <FaPlus />
          {tl.addButtonLabel}
        </Button>
        <DataTable />
        <Button paddingX="5" onClick={() => navigate("/kaikei")}>
          <FaCartShopping />
          {tl.checkout}
        </Button>
        <ResetDataButton />
      </Stack>
    </Center>
  );

  function onAdd() {
    if (selectedPrice.length === 0 && customPrice === 0) return;
    const price = Number(selectedPrice[0]);
    setData([
      ...data,
      {
        index: index.current++,
        name: note,
        price: price ? price : customPrice,
      },
    ]);
  }
}

function PriceSelector({
  options,
  selected,
  onSelect,
  customPrice,
  setCustomPrice,
}: {
  options: ListCollection;
  selected: string[];
  onSelect: (prices: string[]) => void;
  customPrice: number;
  setCustomPrice: (price: number) => void;
}) {
  const tl = getTranslation(useLanguageContext().language);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  return (
    <>
      <Select.Root
        variant="outline"
        collection={options}
        value={selected}
        onValueChange={(details) => {
          if (details.value[0] === "other") {
            setIsCustom(true);
            onSelect(["other"]);
            return;
          }
          setIsCustom(false);
          onSelect(details.value);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize="md">{tl.price}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={tl.pricePlaceholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.items.map((p) => (
                <Select.Item item={p} key={p.value}>
                  {p.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {/* <Input variant="outline" disabled={!isCustom} value={customPrice} onChange={(e) => setCustomPrice(Number(e.target.value))} /> */}
      {isCustom && (
        <NumberInput.Root
          variant="outline"
          disabled={!isCustom}
          value={String(customPrice)}
          onValueChange={(e) => setCustomPrice(Number(e.value))}
          min={0}
          inputMode="numeric"
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      )}
    </>
  );
}

function NoteInput({ note, setNote }: { note: string; setNote: (note: string) => void }) {
  const tl = getTranslation(useLanguageContext().language);

  return (
    <Field.Root>
      <Field.Label fontSize="md">{tl.note}</Field.Label>
      <Input
        variant="outline"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={tl.notePlaceholder}
      />
    </Field.Root>
  );
}
