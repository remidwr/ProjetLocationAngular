export class UserFull {
    lastName: string;
    firstName: string;
    birthdate: Date;
    email: string;
    street: string;
    number: string;
    box?: string;
    postCode: number;
    city: string;
    phone1: string;
    phone2: string;
    picture?: string;
    roleId: Role;
}

export class Role {
    roleName: string;
}