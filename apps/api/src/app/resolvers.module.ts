import { Module, Provider } from '@nestjs/common';
import { resolvers } from '@tm/graphql';

@Module({
  providers: [...(resolvers as [Provider])],
})
export class ResolversModule {}
