import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../guard/jwt.guard'; // Assuming you are using JWT authentication
import { DatabaseService } from './database.service';
import { DatabaseDto } from 'dto/database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  // Endpoint to get user role by email
//   @UseGuards(JwtGuard) // Protect the route with JWT Auth Guard
  @Post('create')
  async createDatabase(@Body() {host, port, username, password, database, userId, embedId}: DatabaseDto) {
    const embedModels = await this.databaseService.createDatabase(
        host, port, database, username, password, userId, embedId
    )

    return { response: "Successfully created vector database" }
  }
}