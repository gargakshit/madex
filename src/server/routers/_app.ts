import { pokemonRouter } from "@/server/routers/pokemon";
import { router } from "@/server/trpc";

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;
