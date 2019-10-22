import { Resolver, Query } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { AuthObject } from '../types/authObject.type';

@Resolver(of => AuthObject)
export class AuthObjectResolver {

    @Query(returns => AuthObject, { nullable: true })
    authObject(): AuthObject {
        return plainToClass(AuthObject, {});
    }
}