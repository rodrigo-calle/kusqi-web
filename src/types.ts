export enum DashboardMenuOptionsType {
    HOME = 'home',
    SERVICES = 'services',
    TOURS = 'tours',
    CLIENTS = 'clients',
    PROMOS = 'promos',
}


export enum BusinessCategories {
    HOTEL = 'hotel',
    TOURIST_AGENT = 'agencia turistica',
    RESTAURANT = 'restaurant',
    GENERIC = 'generico'
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

export interface LoginType {
    email: string;
    password: string;
}

export interface RegisterType {
    email: string;
    name: string;
    password: string;
    category: BusinessCategories
}
// name: string;
// lastName: string;
// phone: string[];
// dni: string;
// provenance: string;
// email: string;