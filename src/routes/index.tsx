import { createFileRoute } from "@tanstack/react-router";
import Calendar from "src/pages/Calendar/Calendar.tsx";

export const Route = createFileRoute("/")({
  component: Calendar,
});
