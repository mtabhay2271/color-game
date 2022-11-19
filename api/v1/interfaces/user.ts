interface IUser {
    name: string
    username: string
    email: string
    password: string
    contactNumber: number
    role: string
    referCode: string
    uplineId: string
    isPaymentDone: boolean
    isAccepted: boolean
    isBlockedd: boolean
    isRejected: boolean
    deviceToken: string
    otp: string
}

export interface IUserDetails {
    _id: string
    name: string
    username: string
    email: string
    contactNumber: number
    referCode: string
    uplineId: string
    isPaymentDone: boolean
    isAccepted: boolean
    isBlockedd: boolean
    isRejected: boolean
    deviceToken: string
    upline: string
    downlineCount: string
    updatedAt: string
}
