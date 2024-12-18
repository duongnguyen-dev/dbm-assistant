import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../guard/jwt.guard'; // Assuming you are using JWT authentication
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to get user role by email
  @UseGuards(JwtGuard) // Protect the route with JWT Auth Guard
  @Get('user')
  async getUserByEmail(@Req() req) {

    const user = await this.usersService.findByEmail(req.user.email);

    if (!user) {
      throw new Error('User not found');
    }

    return { user: user }; // Return the user's role
  }
}