import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoggedUserDto, UserResponseDto } from './dto/user-response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userService.update(input);
  }

  @Mutation(() => UserResponseDto)
  async login(
    @Args('identifier') identifier: string,
    @Args('password') password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.validateUser(identifier, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const jwt = await this.userService.generateJwt(user);
    return {
      jwt,
      username: user.username,
      email: user.email,
    };
  }

  @Mutation(() => UserResponseDto)
  async register(
    @Args('input') input: CreateUserInput,
  ): Promise<UserResponseDto> {
    const user = await this.userService.create(input);
    const jwt = await this.userService.generateJwt(user);
    return {
      jwt,
      username: user.username,
      email: user.email,
    };
  }

  @Query(() => LoggedUserDto)
  async me(@Context() context: any): Promise<LoggedUserDto | null> {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }
    const token = authHeader.replace('Bearer ', '');
    const payload = await this.userService.verifyJwt(token);
    if (!payload || !payload.email) {
      throw new Error('Invalid or expired token');
    }
    context.email = payload.email;
    console.log('Context in me query:', context);

    const user = await this.userService.findOneByEmail(context.email);
    if (!user) return null;
    return {
      _id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  @Query(() => User, { nullable: true })
  async userProfile(
    @Args('id', { nullable: true }) id?: string,
    @Args('username', { nullable: true }) username?: string,
    @Context() context?: any,
  ): Promise<User | null> {
    // If no id or username provided, get from context (authenticated user)
    if (!id && !username) {
      const authHeader = context?.req?.headers?.authorization;
      if (!authHeader) {
        throw new Error('Authorization header missing');
      }
      const token = authHeader.replace('Bearer ', '');
      const payload = await this.userService.verifyJwt(token);
      if (!payload || !payload.email) {
        throw new Error('Invalid or expired token');
      }
      const user = await this.userService.findOneByEmail(payload.email);
      return user;
    }

    // Find by id if provided
    if (id) {
      return this.userService.findOneById(id);
    }

    // Find by username if provided
    if (username) {
      return this.userService.findOneByUsername(username);
    }

    return null;
  }
}
