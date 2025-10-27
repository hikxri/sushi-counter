type Translation = {
  title: string;
  price: string;
  other: string;
  note: string;
  pricePlaceholder: string;
  notePlaceholder: string;
  addButtonLabel: string;
  deleteButtonLabel: string;
  resetButtonLabel: string;
  cancelButtonLabel: string;
  resetDialogTitle: string;
  resetDialogDescription: string;
  checkout: string;
  items: string;
  backButtonLabel: string;
  tax: string;
}

export const EN: Translation = {
  title: "Sushi Counter",
  price: "Price",
  other: "Other",
  note: "Note",
  pricePlaceholder: "Select...",
  notePlaceholder: "Sushi name?",
  addButtonLabel: "Add",
  deleteButtonLabel: "Delete selected",
  resetButtonLabel: "Reset data",
  cancelButtonLabel: "Cancel",
  resetDialogTitle: "Are you sure?",
  resetDialogDescription: "Are you sure you want to reset your data? This action cannot be undone.",
  checkout: "Checkout",
  items: "items",
  backButtonLabel: "Back",
  tax: "tax",
}

export const JA: Translation = {
  title: "寿司カウンター",
  price: "値段",
  other: "その他",
  note: "メモ",
  pricePlaceholder: "選択...",
  notePlaceholder: "寿司名?",
  addButtonLabel: "追加",
  deleteButtonLabel: "選択したものを削除",
  resetButtonLabel: "データをリセット",
  cancelButtonLabel: "キャンセル",
  resetDialogTitle: "確認",
  resetDialogDescription: "データをリセットしてもよろしいですか？この操作は戻せません。",
  checkout: "会計",
  items: "個",
  backButtonLabel: "戻る",
  tax: "税",
}

export function getTranslation(lang: string) {
  switch (lang) {
    case "en":
      return EN;
    case "ja":
      return JA;
    default:
      return EN;
  }
}