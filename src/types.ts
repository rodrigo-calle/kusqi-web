export enum DashboardMenuOptionsType {
    HOME = 'home',
    SERVICES = 'services',
    TOURS = 'tours',
    CLIENTS = 'clients',
    PROMOS = 'promos',
}

export interface ServiceType {
    // id: string;
    name: string;
    description: string;
    image: string; 
    price: number;
    discount: number;
    active: boolean;
}

export interface ClientType {
    name: string;
    lastName: string;
    phone: string;
    dni: string;
    provenance: string;
    email: string;
    _id?: any;
}
// name: string;
// lastName: string;
// phone: string[];
// dni: string;
// provenance: string;
// email: string;