import { appRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { AppRouter } from "@/server/routers/_app";

function getBaseUrl() {
  // Assume localhost for now, we will fix this during deployment.
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== "undefined") {
      return {
        links: [
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      };
    }

    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) return {};
            return { cookie: ctx.req.headers.cookie };
          },
        }),
      ],
    };
  },
  ssr: true,
  responseMeta(opts) {
    const { clientErrors } = opts;
    if (clientErrors.length) {
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }

    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      headers: {
        "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
      },
    };
  },
});
