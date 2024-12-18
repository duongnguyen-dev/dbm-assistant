import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from 'entity/auth/auth.entity';
import { Role } from '@prisma/client';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor (
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string): Promise<AuthEntity> {
      // Step 1: Fetch a user with the given email
      const user = await this.prismaService.user.findUnique({ where: { email: email } });

      // If no user is found, throw an error
      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`);
      }

      // Step 2: Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

      // If password does not match, throw an error
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
      // Step 3: Generate a JWT containing the user email and return it
      const payload = { email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, { expiresIn: "60h"}),
      };
  }

  async register(email: string, password: string, role: Role) {
    const user = await this.prismaService.user.findUnique({ where: { email: email } });

    // If user is found, throw an error
    if (user) {
      throw new ConflictException(`Email is already registered, please login`);
    }

    // Generate a salt and hash the password
    const saltRounds = 10; // The number of rounds to generate salt (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Store the hashed password in the database
    await this.prismaService.user.create({
      data: {
        email,
        hashedPassword: hashedPassword, // Store the hashed password
        salted: String(saltRounds),
        role: role
      },
    });

    const payload = { email: email };
    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: "60h"})
    }
  }
}
