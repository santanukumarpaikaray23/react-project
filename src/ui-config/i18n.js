import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./locales/en/translation.json";
import translationHin from "./locales/hin/translation.json";
import translationKan from "./locales/kan/translation.json";
import translationMal from "./locales/mal/translation.json";
import translationTam from "./locales/tam/translation.json";
import translationTel from "./locales/tel/translation.json";
import translationMar from "./locales/mar/translation.json";


i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: translationEng
      },
      hin: {
        translations: translationHin
      },
      kan: {
        translations: translationKan
      },
      mal: {
        translations: translationMal
      },
      tam: {
        translations: translationTam
      },
      tel: {
        translations: translationTel
      },
      mar: {
        translations: translationMar
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;
