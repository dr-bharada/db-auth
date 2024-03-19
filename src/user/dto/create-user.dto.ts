import {
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsString,
  IsIn,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // @ApiProperty({ description: 'The title of the user.' })
  // @IsNotEmpty({ message: 'Title is required' })
  // title: string;

  @ApiProperty({ description: 'The first name of the user.', maxLength: 50 })
  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(50, { message: 'First name must be at most 50 characters' })
  firstName: string;

  @ApiProperty({ description: 'The last name of the user.', maxLength: 50 })
  @IsNotEmpty({ message: 'Last name is required' })
  @MaxLength(50, { message: 'Last name must be at most 50 characters' })
  lastName: string;

  @ApiProperty({ description: 'The email address of the user.' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'The date of birth of the user.' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  @IsDateString()
  dob: Date;

  @ApiProperty({
    description: 'The gender of the user.',
    enum: ['Male', 'Female', 'Other'],
  })
  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Invalid gender format' })
  @IsIn(['Male', 'Female', 'Other'], { message: 'Invalid gender value' })
  gender: string;

  @ApiProperty({ description: 'The phone number of the user.' })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Invalid phone format' })
  phone: string;

  @ApiProperty({ description: "The URL of the user's image.", required: false })
  @IsOptional()
  @IsString({ message: 'Invalid image URL format' })
  imageUrl?: string;
}
