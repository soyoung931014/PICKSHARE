export class UpdateUserDto {
  id?: number;
  email: string;
  nickname?: string;
  userImage?: string;
  statusMessage?: string;
  loginMethod: string;
}
