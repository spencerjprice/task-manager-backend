import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class TaskDto {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    public description: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    public dueDate: Date;

    @IsEnum([Status.COMPLETED, Status.NEW])
    @ApiProperty({ enum: Status })
    public status: Status;
}
