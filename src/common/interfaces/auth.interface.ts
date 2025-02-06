export interface AuthUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    password: string;
    roles: string[];
}