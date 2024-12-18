import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DatabaseService } from "./database.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { EmbedService } from "src/embed/embed.service";
 
@Module({
  imports: [
    PrismaModule,
  ],
  providers: [
    DatabaseService,
    PrismaService,
    EmbedService
  ]
})
export class DatabaseModule {}