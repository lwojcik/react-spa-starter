import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { apiGet } from './client';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

export type User = z.infer<typeof userSchema>;

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: ({ signal }) =>
      apiGet({ path: '/users', schema: z.array(userSchema), signal }),
  });
