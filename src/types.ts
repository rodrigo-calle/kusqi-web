export enum DashboardMenuOptionsType {
    HOME = 'home',
    SERVICES = 'services',
    TOURS = 'tours',
    CLIENTS = 'clients',
    PROMOS = 'promos',
}

export interface TouristGuideType {
    name: string;
    lastName: string;
    phone: string;
    dni: string;
    user: string;
    _id?: string;
}

export interface VehiclesType {
    name: string;
    lastName: string;
    phone: string;
    license_plate: string;
    seats_number: number;
    user: string;
    _id?: string;
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
    // image: string; 
    price: number;
    // discount: number;
    active: boolean;
    user: string;
    _id?: string;
}

export interface ClientType {
    name: string;
    lastName: string;
    phone: string;
    dni: string;
    provenance: string;
    email: string;
    user?: string;
    _id?: string;
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

export interface TourType {
    capacity: number;
    status: 'PENDING' | 'STARTED' | 'COMPLETE' | 'CANCELLED';
    phone: string;
    notes: string;
    key: string;
    client: string;
    vehicle: string;
    service: string;
    touristGuide: string;
    user: string;
    _id?: string;
}

export interface TourPopulateType {
    capacity: number;
    status: 'PENDING' | 'STARTED' | 'COMPLETE' | 'CANCELLED';
    phone: string;
    notes: string;
    key: string;
    client: ClientType;
    vehicle: VehiclesType;
    service: ServiceType;
    touristGuide: TouristGuideType;
    user: string;
    _id?: string;
}
// name: string;
// lastName: string;
// phone: string[];
// dni: string;
// provenance: string;
// email: string;