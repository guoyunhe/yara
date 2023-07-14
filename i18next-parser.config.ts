// https://github.com/i18next/i18next-parser

export default {
  locales: ['en', 'zh'],
  input: ['resources/assets/**/*.{js,jsx,ts,tsx}'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  indentation: 2,
  keySeparator: false,
  namespaceSeparator: false,
  defaultValue: (locale: string, namespace: string, key: string) => {
    return locale === 'en' ? key : '';
  },
};
