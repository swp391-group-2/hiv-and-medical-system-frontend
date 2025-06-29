export interface Manager {
    email:string
    fullName:string
    status:string
    role:string
    managerId:string
    managerCode:string
}
export interface CreateManagerRequest {
    email: string;
    fullName: string;
    password: string;
}