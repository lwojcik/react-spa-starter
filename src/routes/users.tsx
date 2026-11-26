import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { usersQueryOptions } from '@/api/users';

import { Email, ErrorText, Item, List } from './users.styled';

export const Route = createFileRoute('/users')({
  loader: ({ context }) => context.queryClient.query(usersQueryOptions()),
  pendingComponent: () => <p>Loading users…</p>,
  errorComponent: ({ error }) => (
    <ErrorText role="alert">
      Could not load users:{' '}
      {error instanceof Error ? error.message : 'Unknown error'}
    </ErrorText>
  ),
  component: UsersPage,
});

function UsersPage() {
  const { data: users } = useSuspenseQuery(usersQueryOptions());

  return (
    <>
      <h1>Users</h1>
      <List>
        {users.map((user) => (
          <Item key={user.id}>
            <strong>{user.name}</strong>
            <Email>{user.email}</Email>
          </Item>
        ))}
      </List>
    </>
  );
}
