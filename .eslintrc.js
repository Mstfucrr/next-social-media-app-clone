// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  plugins: ['import', 'project-structure', 'sonarjs'],
  rules: {
    'no-console': 'warn', // Bu kural: console.log() kullanımını uyarı olarak gösterir.
    'react/display-name': 'off', // Bu kural: React componentlerinde displayName kullanımını kapatır.
    '@next/next/no-img-element': 'off', // Bu kural: next.js projelerinde img elementi kullanımını kapatır.
    'react/no-unescaped-entities': 'off', //
    '@typescript-eslint/no-unused-vars': 'error', // Bu kural: Kullanılmayan değişkenleri uyarı olarak gösterir.
    '@typescript-eslint/no-unused-expressions': 'error', // Bu kural: Kullanılmayan ifadeleri uyarı olarak gösterir.
    '@typescript-eslint/no-unused-imports': 'error', // Bu kural: Kullanılmayan importları uyarı olarak gösterir.
    '@typescript-eslint/no-non-null-assertion': 'off', // Bu kural: Non-null assertion kullanımını kapatır.
    '@typescript-eslint/no-empty-function': 'off' // Bu kural: Boş fonksiyonları kapatır.
  }
}
