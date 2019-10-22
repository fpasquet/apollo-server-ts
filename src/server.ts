import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { MovieMockDataSource } from './theMovieDb/dataSources/MovieMock.dataSource';
import { MovieResolver } from './theMovieDb/resolvers/movie.resolver';
import { AuthObjectResolver } from './auth/resolvers/authObject.resolver';

import { GraphQLContext } from './graphql.context';
import { authChecker } from './auth/authChecker';

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {

  const schema = await buildSchema({
    resolvers: [MovieResolver, AuthObjectResolver],
    validate: true,
    authChecker,
    authMode: 'null',
  });

  const server = new ApolloServer({
    schema,
    playground: true,
    dataSources: () => ({
      movieMockDataSource: new MovieMockDataSource()
    }),
    context: ({ req }) => {
      const roles = [];
      if (req.headers.role) {
        roles.push(req.headers.role);
      }
      const ctx: GraphQLContext = {
        // create mocked user in context
        // in real app you would be mapping user from `req.user` or sth
        user: {
          id: 1,
          name: 'Wilson',
          roles,
        },
      };
      return ctx;
    },
  });

  const { url } = await server.listen(PORT);
  // tslint:disable-next-line: no-console
  console.log(`🚀 Server is running, GraphQL Playground available at ${url}`);
};

bootstrap();