import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(
    private prismaService: PrismaService,
  ) {}

  // Fetch the user by their ID
  async findByEmail(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({where : {email}});
  }
}
