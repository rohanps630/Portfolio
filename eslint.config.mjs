import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
      "test-results/**",
      "playwright-report/**",
      "public/pagefind/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // next/core-web-vitals already registers the jsx-a11y plugin with a
    // partial rule set; this enables the full recommended set on app code.
    files: ["src/**/*.{ts,tsx}"],
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
]);
