import { ObjectType, Field, Authorized } from 'type-graphql';

@ObjectType()
export class AuthObject {
    @Field()
    get publicField(): string {
        return 'publicField';
    }

    @Authorized()
    @Field()
    get authorizedField(): string {
        return 'authorizedField';
    }

    @Authorized('ADMIN')
    @Field()
    get adminField(): string {
        return 'adminField';
    }
}