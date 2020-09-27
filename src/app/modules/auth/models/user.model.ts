import { Role } from './role.model';

export class User {
    id: number;
    lastName: string;
    firstName: string;
    birthdate: Date;
    email: string;
    passwd: string;
    roleName: Role;
    token?: string;
}