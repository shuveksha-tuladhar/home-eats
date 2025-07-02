import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.update(input);
  }
}
