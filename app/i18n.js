import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import en from "./Languages/en.js";
import es from "./Languages/es.js";

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  es
};

export default I18n;