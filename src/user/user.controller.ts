import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Permissions('R')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Permissions('R')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Post()
  @Permissions('C')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @Permissions('U')
  update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>) {
    return this.userService.update(Number(id), dto);
  }

  @Delete(':id')
  @Permissions('D')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
