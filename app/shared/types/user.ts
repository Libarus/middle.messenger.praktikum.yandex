export type TUser = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
};

export type TSignUpRequest = {
    email: string;
    first_name: string;
    second_name: string;
    login: string;
    password: string;
    phone: string;
};

export type TSignInRequest = {
    login: string;
    password: string;
};
