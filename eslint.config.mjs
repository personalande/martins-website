import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Enforce no unused variables (except prefixed with _)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Disallow explicit any
      '@typescript-eslint/no-explicit-any': 'warn',
      // Require consistent return types
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Prefer nullish coalescing
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      // No console.log in production (warnings allowed for error/warn)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // React hooks rules
      'react-hooks/exhaustive-deps': 'warn',
      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-role': 'error',
    },
  },
]

export default eslintConfig
