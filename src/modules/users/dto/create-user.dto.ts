export class CreateUserDto {
  email: string;
  password: string;
  fullname?: string;
  createdAt?: Date;
  address?: string;
  phone?: string;
  isActive: boolean;
  creditPoints: number;
}
