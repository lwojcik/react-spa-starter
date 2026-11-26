import { createFileRoute } from '@tanstack/react-router';

import { Counter } from '@/components/Counter';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <Counter />
    </>
  );
}
