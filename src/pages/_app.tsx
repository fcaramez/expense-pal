import "@/styles/globals.css";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { AppBar } from "@/components/ui/appbar";
import { api } from "@/utils/api";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.className} flex h-screen w-screen flex-col`}>
      <AppBar />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
