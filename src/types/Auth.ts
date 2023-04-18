export interface SignUpRequest {
    username: string
    email: string
    password: string
}

export interface SignInRequest {
    email: string
    password: string
}

export interface SingUpResponse {
    accessToken: string
    user: {
        username: string
        email: string
        createdAt: Date
        updatedAt: Date
    }
}
