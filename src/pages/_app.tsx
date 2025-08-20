import type { AppProps } from "next/app";
import Layout from "../wrapper/layout";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/cartContext";
import { UserProvider } from "../context/userContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Toaster position="top-right" />
      <Layout>
        <UserProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </UserProvider>
      </Layout>
    </QueryClientProvider>
  );
}
