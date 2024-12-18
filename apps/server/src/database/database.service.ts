import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Database } from "@prisma/client";
import axios from 'axios';
import { EmbedService } from 'src/embed/embed.service';

@Injectable()
export class DatabaseService {
    constructor(
    private prismaService: PrismaService,
    private embedService: EmbedService
  ) {}

  async createDatabase(host: string, port: string, db: string, username: string, password: string, user_id: number, embed_id: number) {
    // try {
        // await this.prismaService.database.create({
        //     data: {
        //         host:host, port:port, username:username, password:password, database:db, userId:user_id, embedId:embed_id
        //     }
        // });
        
        const embedModelName = (await this.embedService.findModelNameById(embed_id)).name
        console.log({
                host: host, port: port, database: db, username: username, password: password, embed_model: embedModelName, collection_name: "Product"
            })
        try {
            const response = await axios.post("http://localhost:8000/create", {
                host: host, port: port, database: db, username: username, password: password, embed_model: embedModelName, collection_name: "Product"
            })
        } catch {
            throw new InternalServerErrorException()
        }

    // } catch {
    //     throw new InternalServerErrorException()
    // }
  }
}