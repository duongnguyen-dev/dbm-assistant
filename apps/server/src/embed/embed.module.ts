import { Module } from '@nestjs/common';
import { EmbedService } from './embed.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PrismaModule
  ],
  providers: [
    EmbedService,
    PrismaService
  ]
})
export class EmbedModule {}
