import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRights = this.reflector.get<string>(PERMISSIONS_KEY, context.getHandler());
    if (!requiredRights) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.profileId) throw new ForbiddenException('No profile');

    // identificar rota: pode usar route.path ou baseUrl + path
    const route = req.route?.path || req.path;

    // busca form pela name_route exato
    const form = await this.prisma.amb_form.findFirst({ where: { name_route: route } });
    if (!form) throw new ForbiddenException('Form not registered');

    const profileAuth = await this.prisma.amb_profile_autoriza.findFirst({
      where: { amb_profile_id: user.profileId, amb_form_id: form.id },
    });

    if (!profileAuth?.direitos) throw new ForbiddenException('No permissions granted');

    for (const r of requiredRights) {
      if (!profileAuth.direitos.includes(r)) {
        throw new ForbiddenException('Missing permission: ' + r);
      }
    }

    return true;
  }
}
