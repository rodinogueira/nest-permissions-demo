import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
