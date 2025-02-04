import { createFileRoute } from '@tanstack/react-router'
import About from 'src/pages/About/About'

export const Route = createFileRoute('/about')({
  component: About,
})
