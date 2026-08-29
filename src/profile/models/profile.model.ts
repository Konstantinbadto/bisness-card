import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Int)
  level: number;
}

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  stack: string;

  @Field({ nullable: true })
  repoUrl?: string;

  @Field({ nullable: true })
  demoUrl?: string;
}

@ObjectType()
export class ExperienceItem {
  @Field(() => ID)
  id: string;

  @Field()
  period: string;

  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class Specialist {
  @Field(() => ID)
  id: string;

  @Field()
  fullName: string;

  @Field()
  role: string;

  @Field()
  tagline: string;

  @Field()
  location: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  telegram?: string;

  @Field({ nullable: true })
  github?: string;

  @Field({ nullable: true })
  website?: string;

  @Field()
  bio: string;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Project])
  projects: Project[];

  @Field(() => [ExperienceItem])
  experience: ExperienceItem[];
}
