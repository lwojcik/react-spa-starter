import type { z } from 'zod';

import { environment } from '@/config/environment';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface ApiGetOptions<T extends z.ZodType> {
  readonly path: string;
  readonly schema: T;
  readonly signal?: AbortSignal;
}

export async function apiGet<T extends z.ZodType>({
  path,
  schema,
  signal,
}: ApiGetOptions<T>): Promise<z.infer<T>> {
  const url = new URL(
    `${environment.apiBaseUrl}${path}`,
    globalThis.location.origin,
  );
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `GET ${path} failed with ${response.status}`,
    );
  }

  return schema.parse(await response.json());
}
