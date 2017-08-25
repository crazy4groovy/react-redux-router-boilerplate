import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const errors = require('./en/errors.json')

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: {
      default: ['en']
    },

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    returnObjects: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    resources: {
      en: {
        errors
      }
    }
  })

export const ns = fixedNs => i18next.getFixedT(null, fixedNs)

export default i18next
