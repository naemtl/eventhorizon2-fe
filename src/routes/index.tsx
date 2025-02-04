import { createFileRoute } from "@tanstack/react-router";
import Calendar from "src/pages/Calendar/Calendar";

export const Route = createFileRoute("/")({
  component: Calendar,
});
