import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AmbService {
  constructor(private prisma: PrismaService) {}

  findFormByRoute(route: string) {
    return this.prisma.amb_form.findFirst({ where: { name_route: route }});
  }

  getProfileAuth(profileId: number, formId: number) {
    return this.prisma.amb_profile_autoriza.findFirst({
      where: { amb_profile_id: profileId, amb_form_id: formId },
    });
  }

  // CRUD helpers para amb_form / amb_profile / amb_profile_autoriza
  async createForm(data: any) {
    return this.prisma.amb_form.create({ data });
  }
  async createProfile(data: any) {
    return this.prisma.amb_profile.create({ data });
  }
  async setProfileAuth(data: any) {
    return this.prisma.amb_profile_autoriza.create({ data });
  }
}
