import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string | null;

  @Expose()
  towFASecret: string | null;

  @Expose()
  enable2FA: boolean;

  @Exclude()
  password: string;
}
