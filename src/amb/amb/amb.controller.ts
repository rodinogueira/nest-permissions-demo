import { Controller, Post, Body, Get } from '@nestjs/common';
import { AmbService } from './amb.service';

@Controller('amb')
export class AmbController {
  constructor(private ambService: AmbService) {}

  @Post('form')
  createForm(@Body() dto: any) {
    return this.ambService.createForm(dto);
  }

  @Post('profile')
  createProfile(@Body() dto: any) {
    return this.ambService.createProfile(dto);
  }

  @Post('auth')
  setAuth(@Body() dto: any) {
    return this.ambService.setProfileAuth(dto);
  }

//   @Get('forms')
//   listForms() {
//     return this.ambService.prisma.amb_form.findMany();
//   }
}
