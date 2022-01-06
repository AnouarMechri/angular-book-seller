import { Role } from "./role.enum";

export class user {
    id: number |undefined;
    username: string = "";
    password: string = "";
    name: string = "";
    token: string = "";
    role: Role = Role.USER;
}