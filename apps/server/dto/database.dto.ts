import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsNumber } from 'class-validator';

export class DatabaseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    host: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    port: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    database: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    embedId: number
}