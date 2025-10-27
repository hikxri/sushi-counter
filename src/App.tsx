import { HashRouter, Route, Routes } from "react-router";
import Home from "./Home";
import Kaikei from "./Kaikei";
import { DataContext, type DataType } from "./contexts/DataContext";
import { useState } from "react";
import { Provider } from "./components/ui/provider";
import { getLocalData, setLocalData } from "./lib/localData";
import { Center, createListCollection, Portal, Select } from "@chakra-ui/react";
import { LanguageContext, type Language, type LanguageContextType } from "./contexts/LanguageContext";

export default function App() {
  const [data, setData] = useState<DataType[]>(getLocalData() || []);
  const [language, setLanguage] = useState<Language>("en");

  function updateData(d: DataType[]) {
    setData(d);
    setLocalData(d);
  }

  return (
    <Provider>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <DataContext.Provider value={{ data, setData: updateData }}>
          <Center marginTop="2">
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </Center>
          <HashRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="kaikei" element={<Kaikei />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </HashRouter>
        </DataContext.Provider>
      </LanguageContext.Provider>
    </Provider>
  );
}

function LanguageSelector({ language, setLanguage }: LanguageContextType) {
  return (
    <Select.Root
      collection={languages}
      size="md"
      width="90px"
      value={[language]}
      onValueChange={(e) => setLanguage(e.value[0] as Language)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger justifyContent={"center"}>
          <Select.ValueText placeholder="Language" />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {languages.items.map((lang) => (
              <Select.Item item={lang} key={lang.value}>
                {lang.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

const languages = createListCollection({
  items: [
    { label: "English", value: "en" },
    { label: "日本語", value: "ja" },
  ],
});
