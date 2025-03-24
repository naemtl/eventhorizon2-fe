import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: {
    css: true,
  },
  react: true,
  stylistic: {
    semi: true,
  },
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/routeTree.gen.ts',
    '**/dummy-events.json',
    '**/read-events.mts',
  ],
});
