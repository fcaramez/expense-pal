import "@/styles/globals.css";
import { type AppType } from "next/app";
import { Roboto } from "next/font/google";

import { AppBar } from "@/components/ui/appbar";
import { api } from "@/utils/api";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${roboto.className} h-screen w-screen`}>
      <Component {...pageProps} />
      <AppBar />
    </main>
  );
};

export default api.withTRPC(MyApp);
