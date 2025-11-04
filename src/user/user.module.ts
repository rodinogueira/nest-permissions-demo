import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/permissions.guard';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [UserController],
  providers: [UserService, PermissionsGuard],
  exports: [UserService],
})
export class UserModule {}
