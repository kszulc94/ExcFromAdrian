import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            navbar: {
                home: "Home",
                about: "About",
                panel: {
                    title: "Panel",
                    loginRegister: "Login/Register",
                    rules: "Rules",
                    contact: "Contact",
                    orders: "My Orders"
                }
            },
            card: {
                details: "Details"
            },
            productPage: {
                addToCart: "Add to Cart",
                gross: " net",
                index: "Index: "
            }
        }
      },
      pl: {
        translation: {
            navbar: {
                home: "Strona Domowa",
                about: "O Nas",
                panel: {
                    title: "Panel",
                    loginRegister: "Logowanie/Rejestracja",
                    rules: "Regulamin",
                    contact: "Kontakt",
                    orders: "Moje zamówienia"
                }
            },
            card: {
                details: "Więcej"
            },
            productPage: {
                addToCart: "Dodaj do koszyka",
                gross: " netto",
                index: "Indeks: "
            }
        }
      }
    }
  });

export default i18n;
