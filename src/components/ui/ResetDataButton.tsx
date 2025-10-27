import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { getTranslation } from "../../lib/translation";
import { useLanguageContext } from "../../contexts/LanguageContext";

export default function ResetDataButton({ onClick }: { onClick: () => void }) {
  const tl = getTranslation(useLanguageContext().language);

  return (
    <Dialog.Root size={"xs"} placement={"center"}>
      <Dialog.Trigger asChild>
        <Button variant="outline" width="60%">{tl.resetButtonLabel}</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{tl.resetDialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>{tl.resetDialogDescription}</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{tl.cancelButtonLabel}</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={onClick}>{tl.resetButtonLabel}</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}