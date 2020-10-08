import { environment } from 'src/environments/environment';

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
    // get pictureUrl(): string { return `${environment.ressourceUrl}/${this.picture}`; }
    section: SectionName;
    category: CategoryName;
}

export class SectionName {
    name: string;
}

export class CategoryName {
    name: string;
}