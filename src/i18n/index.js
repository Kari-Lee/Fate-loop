import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./zh.json";
import en from "./en.json";

const savedLang = typeof localStorage !== "undefined" ? localStorage.getItem("yidu-lang") : null;

i18n.use(initReactI18next).init({
  resources: { zh: { translation: zh }, en: { translation: en } },
  lng: savedLang || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
