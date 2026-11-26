import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { createQueryClient } from '@/lib/query-client';
import { createAppRouter } from '@/router';

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') return;
  const { worker } = await import('@/mocks/browser');

  await worker.start({ onUnhandledFrame: 'bypass' });
}

const queryClient = createQueryClient();
const router = createAppRouter({ queryClient });

await enableMocking();

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App router={router} queryClient={queryClient} />
  </StrictMode>,
);
