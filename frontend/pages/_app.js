import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppProvider } from "@/context/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000";

export const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
       <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
       </AppProvider>
    </ApolloProvider>
  );
}