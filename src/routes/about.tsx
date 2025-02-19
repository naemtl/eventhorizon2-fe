import { createFileRoute } from '@tanstack/react-router';
import About from 'src/pages/About/About.tsx';

export const Route = createFileRoute('/about')({
  component: About,
});
