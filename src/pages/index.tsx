import Head from "next/head";

import { Hero } from "@/components/ui/Landing/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Pal</title>
        <meta name="description" content="Expense Pal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </>
  );
}
