import { User } from './user';

import { MovieMockDataSource } from './theMovieDb/dataSources/MovieMock.dataSource';

export interface DataSources {
    movieMockDataSource: MovieMockDataSource;
}

export interface GraphQLContext {
    dataSources?: DataSources;
    user?: User;
}