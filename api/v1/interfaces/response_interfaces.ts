export interface IPayAuth {
    userId: string;
    email: string;
    username: string;
    exp: number;
    iat: number;
    role: string;
    uplineId:string;
    uplineId2:string;
    uplineId3:string;
}

export interface IUser {
    _id?: string;
    email?: string;
    exp?: number;
    iat?: number;
    role?: string;
    name?: string;
    password?: string;
    state?: string;
    city?: string;
    country?: string;
    workExperience?: number;
    contactNumber?: number;
    location?: object;
    image?: string;
}

export interface IResponce {
    message: string;
    success: Boolean;
    data?: any;
    error?: any;
}

export interface IServiceResponse extends IResponce {
    statusCode: number;
}

export interface ICommonServices {
    statusCode: number;
    data: IResponce
}

export interface ICommonController extends IResponce {

}
