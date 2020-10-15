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

export class UserInfo {
    lastName: string;
    firstName: string;
    birthdate: Date;
    street: string;
    box: string;
    postCode: number;
    city: string;
    phone1: string;
    phone2: string;
    picture: string;
}

export class Role {
    roleName: string;
}