import { createFileRoute } from "@tanstack/react-router";

import { handleBriefingRequest } from "../../server/briefing";

export const Route = createFileRoute("/api/briefing")({
  server: {
    handlers: {
      POST: async ({ request }) => handleBriefingRequest(request),
    },
  },
});
