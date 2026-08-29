import { Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Specialist } from './models/profile.model';

@Resolver(() => Specialist)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Specialist, {
    name: 'specialist',
    description: 'Данные цифровой визитки специалиста',
  })
  getSpecialist() {
    return this.profileService.getSpecialist();
  }
}
