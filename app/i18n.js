'use strict';
import I18n from 'react-native-i18n';
import en from './Languages/en'
import es from './Languages/es'

I18n.fallbacks = true;
I18n.translations = {
  en,
  es,
};

export default I18n;