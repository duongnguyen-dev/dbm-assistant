import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmbedModel } from "@prisma/client";

@Injectable()
export class EmbedService {
    constructor(
    private prismaService: PrismaService,
  ) {}

  async fetchAllEmbedModel(): Promise<{ id: number; name: string; url: string }[]> {
    return await this.prismaService.embedModel.findMany({
      select: { id: true, name: true, url: true },
    });
  }

  findModelNameById(id: number): Promise<{name: string}> {
    return this.prismaService.embedModel.findUnique({
      select: {name: true},
      where: {id}
    })
  }
}
