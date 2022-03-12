import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
    uri: "https://movieql2.vercel.app/ ",
    cache: new InMemoryCache()
});

export default client;