export interface RegisterRequest {
    email: string;
    password: string;
    firsName: string;
    lastName: string;
    phoneNumber: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}