import { Button, Checkbox, Table } from "@chakra-ui/react";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";
import { getTranslation } from "../../lib/translation";
import { useLanguageContext } from "../../contexts/LanguageContext";

export default function DataTable({ canDelete = true }: { canDelete?: boolean }) {
  const { data, setData } = useDataContext();
  const tl = getTranslation(useLanguageContext().language);
  const [selection, setSelection] = useState<number[]>([]);

  const rows = data.map((d) => (
    <Table.Row key={d.index} data-selected={selection.includes(d.index) ? "" : undefined}>
      {canDelete && (
        <Table.Cell>
          <Checkbox.Root
            size="sm"
            mt="0.5"
            aria-label="Select row"
            checked={selection.includes(d.index)}
            onCheckedChange={(changes) => {
              setSelection((prev) => (changes.checked ? [...prev, d.index] : selection.filter((i) => i !== d.index)));
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Table.Cell>
      )}
      <Table.Cell>{d.price} 円</Table.Cell>
      <Table.Cell>{d.name}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      {canDelete && (
        <Button variant="outline" disabled={selection.length === 0} onClick={onDelete}>
          {tl.deleteButtonLabel}
        </Button>
      )}
      <Table.Root marginY={"5"} variant={"line"} colorPalette={"border"}>
        <Table.Header>
          <Table.Row>
            {canDelete && <Table.ColumnHeader />}
            <Table.ColumnHeader>{tl.price}</Table.ColumnHeader>
            <Table.ColumnHeader>{tl.note}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );

  function onDelete() {
    setData(data.filter((d) => !selection.includes(d.index)));
    setSelection([]);
  }
}
