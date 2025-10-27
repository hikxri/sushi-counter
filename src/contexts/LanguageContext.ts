import { createContext, useContext } from "react";

export type Language = "en" | "ja";

export type LanguageContextType = {
  language: Language;
  setLanguage: (data: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export function useLanguageContext() {
  return useContext(LanguageContext);
}
