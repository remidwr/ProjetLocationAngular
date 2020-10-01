export class Good {
    id: number;
    name: string;
    description: string;
    state: string;
    amountPerDay?: number;
    amountPerWeek?: number;
    amountPerMonth?: number;
    street: string;
    number: string;
    box?: string;
    postCode: number;
    city: string;
    picture: string;
    section: SectionName;
    category: CategoryName;
}

export class SectionName {
    name: string;
}

export class CategoryName {
    name: string;
}