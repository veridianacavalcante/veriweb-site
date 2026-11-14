import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/briefing")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleBriefingRequest } = await import("../../server/briefing");
        return handleBriefingRequest(request);
      },
    },
  },
});
