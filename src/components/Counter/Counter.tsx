import { useState } from 'react';

import { Button } from '@/components/Button';

import { Value, Wrapper } from './Counter.styled';

export interface CounterProps {
  initialCount?: number;

  step?: number;
}

export function Counter({
  initialCount = 0,
  step = 1,
}: Readonly<CounterProps>) {
  const [count, setCount] = useState(initialCount);

  return (
    <Wrapper>
      <Button
        onClick={() => setCount((current) => current - step)}
        aria-label="Decrement"
      >
        −
      </Button>
      <Value aria-live="polite" aria-label="Current count">
        {count}
      </Value>
      <Button
        $variant="primary"
        onClick={() => setCount((current) => current + step)}
        aria-label="Increment"
      >
        +
      </Button>
      <Button onClick={() => setCount(initialCount)}>Reset</Button>
    </Wrapper>
  );
}
