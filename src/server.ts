import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { RecipeResolver } from './example/resolvers/recipe.resolver';
import { authChecker } from './example/security/authChecker';
import { Context } from './example/interfaces/context.interface';

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    validate: true,
    authChecker,
    authMode: 'null',
  });

  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }) => {
      const ctx: Context = {
        // create mocked user in context
        // in real app you would be mapping user from `req.user` or sth
        user: {
          id: 1,
          name: 'Wilson',
          roles: ['USER'],
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