export class CreateUserDto {
  email: string;
  password: string;
  fullName?: string;
  createdAt?: Date;
  address?: string;
  phone?: string;
  isActive: boolean;
  creditPoints: number;
  role: string;
}
