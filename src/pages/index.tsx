import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";

import styles from "../styles/Common.module.css";

// https://github.com/vercel/next.js/discussions/35773#discussioncomment-2840696.
const PokemonTable = dynamic(() => import("@/components/pokemon/table"), {
  ssr: false,
});

const PokemonTypeSelection = dynamic(
  () => import("@/components/pokemon/selection"),
  {
    ssr: false,
  },
);

export async function getServerSideProps(_: GetServerSidePropsContext) {
  const trpcSsr = createServerSideHelpers({
    router: appRouter,
    ctx: {},
  });

  // We always start on the page 0 and "all" types of pokemon.
  // Yes I know this can be a query param.
  await trpcSsr.pokemon.getByType.prefetch({
    type: null,
    page: 0,
  });

  const types = (await trpcSsr.pokemon.getAllTypes.fetch()).map<{
    name: string;
    value: string | null;
  }>((type) => ({
    name: type,
    value: type,
  }));

  types.push({ name: "All", value: null });

  return {
    props: { types, trpcState: trpcSsr.dehydrate() },
  };
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined,
  );
  const [page, setPage] = useState(0);

  const { data, refetch } = trpc.pokemon.getByType.useQuery({
    type: selectedType ?? null,
    page: page,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Madex</title>
      </Head>
      <main className={styles.Main}>
        <PokemonTypeSelection
          selectedType={selectedType}
          selectType={async (type) => {
            setPage(0);
            setSelectedType(type);
            await refetch();
          }}
          allTypes={props.types}
        />
        <PokemonTable
          pokemons={data.pokemons}
          count={data.count}
          pageSize={data.pageSize}
          onPageChange={async (page) => {
            setPage(page);
            await refetch();
          }}
          page={page}
        />
      </main>
    </>
  );
}
