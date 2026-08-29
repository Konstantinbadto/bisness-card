import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getSpecialist() {
    const specialist = await this.prisma.specialist.findFirst({
      orderBy: { createdAt: 'asc' },
      include: {
        skills: true,
        projects: true,
        experience: true,
      },
    });

    if (!specialist) {
      throw new NotFoundException(
        'Данные визитки не найдены. Выполните `npm run prisma:seed`.',
      );
    }

    return specialist;
  }
}
