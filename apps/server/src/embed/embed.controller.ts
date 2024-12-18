import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../guard/jwt.guard'; // Assuming you are using JWT authentication
import { EmbedService } from './embed.service';

@Controller('embed')
export class EmbedController {
  constructor(private readonly embedService: EmbedService) {}

  // Endpoint to get user role by email
//   @UseGuards(JwtGuard) // Protect the route with JWT Auth Guard
  @Get('fetchAll')
  async fetchAllModel() {
    const embedModels = await this.embedService.fetchAllEmbedModel()

    return { models: embedModels }
  }
}