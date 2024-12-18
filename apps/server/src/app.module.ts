import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { EmbedModule } from './embed/embed.module';
import { EmbedService } from './embed/embed.service';
import { EmbedController } from './embed/embed.controller';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    DatabaseModule,
    PrismaModule, 
    UsersModule,
    EmbedModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  providers: [PrismaService, AuthService, UsersService, EmbedService, DatabaseService],
  controllers: [AuthController, UsersController, EmbedController, DatabaseController],
  // providers: [AppService],
})
export class AppModule {}
