import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

/**
 * Flat ESLint config (ESLint v9). We don't extend Next's bundled config —
 * its legacy shape collides with @next/eslint-plugin-next v16 metadata when
 * loaded through the v9 compat layer. Cherry-pick the recommended rule-sets
 * instead.
 */
export default [
  { ignores: ['.next/**', '.open-next/**', 'node_modules/**', 'next-env.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
