import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: {
    css: true,
  },
  react: true,
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
  stylistic: {
    semi: true,
  },
  ignores: [
    'eslint.config.js',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/routeTree.gen.ts',
    '**/dummy-events.json',
    '**/read-events.mts',
  ],
});
