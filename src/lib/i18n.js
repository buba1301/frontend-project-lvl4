import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      errors: {
        network: 'Network Error. Try Again',
      },
      modal: {
        spiner: 'Loading...',
        add: {
          header: 'Add channel',
        },
        rename: {
          header: 'Rename channel',
        },
        remove: {
          header: 'Remove channel',
          text: 'Are you sure you want to remove this channel? All messages will be deleted.',
        },
      },
      placeholder: {
        channel: 'Write the name of the channel',
        message: 'Write your message and press enter',
      },
      button: {
        adding: 'Add',
        renaming: 'Rename',
        removing: 'Remove',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
