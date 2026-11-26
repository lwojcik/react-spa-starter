import { z } from 'zod';

const schema = z.object({
  VITE_APP_TITLE: z.string().min(1),
  VITE_API_BASE_URL: z.string().min(1),
  VITE_ENABLE_MOCKS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
});

const parsed = schema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}`,
  );
}

export const environment = {
  appTitle: parsed.data.VITE_APP_TITLE,
  apiBaseUrl: parsed.data.VITE_API_BASE_URL.replace(/\/$/, ''),
  enableMocks: parsed.data.VITE_ENABLE_MOCKS,
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
} as const;
