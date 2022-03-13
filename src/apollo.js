import ApolloClient, { InMemoryCache } from "apollo-boost";

const client = new ApolloClient({
    uri: "https://movieql2.vercel.app/ ",
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                cache.writeData({
                  id: `Movie:${id}`,
                  data: {
                    isLiked: !isLiked,
                  },
                });
            }
        }
    }
});

export default client;