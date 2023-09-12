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
            cart: {
              cartTitle: "Cart",
              emptyCart: "Cart is empty",
              cartTotal: "Total: ",
              next: "Next"
            },
            filter: {
              title: "Filter",
              max: "Max Price:",
              min: "Min Price"
            },
            productPage: {
                addToCart: "Add to Cart",
                gross: " net",
                index: "Index: ",
                inCart: " in cart",
                remove: "Remove"
            },
            homePage: {
              sortBtn: {
                btnTitle: "Sort By",
                sortFromLowest: "Price: Lowest First",
                sortFromHighest: "Price: Highest First",
                sortAlphabetical: "Name: A-Z"
              }
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
            cart: {
              cartTitle: "Koszyk",
              emptyCart: "Koszyk jest pusty",
              cartTotal: "Suma: ",
              next: "Przejdź dalej"
            },
            filter: {
              title: "Filtruj",
              max: "Cena maksymalna:",
              min: "Cena minimalna:"
            },
            productPage: {
                addToCart: "Dodaj do koszyka",
                gross: " netto",
                index: "Indeks: ",
                inCart: " w koszyku",
                remove: "Usuń"
            },
            homePage: {
              sortBtn: {
                btnTitle: "Sortuj",
                sortFromLowest: "Cena: od najnizszej",
                sortFromHighest: "Cena: od najwyzszej",
                sortAlphabetical: "Nazwa: A-Z"
              }
            }
        }
      }
    }
  });

export default i18n;
