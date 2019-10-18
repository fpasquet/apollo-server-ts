import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { ExampleResolver } from './example/ExampleResolver';

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {

  const schema = await buildSchema({
    resolvers: [ExampleResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(PORT);
  // tslint:disable-next-line: no-console
  console.log(`🚀 Server is running, GraphQL Playground available at ${url}`);
};

bootstrap();