export interface Zone {
    location: {
        coordinates: number[];
    };
    danger_level: string;
    description: string;
    user_id: string
}

export interface props {
    _id: string
}

export interface contact {
    name: string
    email: string
    numberPhone: number
}

export interface LocationStorage {
    token?: string;
}

export interface decodedToken {
    _id: string;
    exp: number;
    iat: number;
}

export interface IUser {
    name: String,
    apePat: String,
    apeMat: String,
    email: String,
    password: String,
    numberPhone: String,
    address: Object
}