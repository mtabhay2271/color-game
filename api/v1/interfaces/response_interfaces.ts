export interface IPayAuth {
    userId: string;
    email: string;
    username: string;
    exp: number;
    iat: number;
    role: string;
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

export interface IRoomsWithMsg {
    roomName: number;
    msg: string;
    lastMsgAt: string;
}

export interface ICommonController extends IResponce {

}


export interface ILocation {
    type: string,
    coordinates: number[]
}

export interface IPlanners {
    _id: string,
    name: string,
    email: string,
    role: string,
    city?: string,
    contactNumber?: number,
    country?: string,
    location?: ILocation
    state?: string,
    workExperience?: number,
    image?: string,
    isAccepted?:boolean,
    isRejected?:boolean,
}

