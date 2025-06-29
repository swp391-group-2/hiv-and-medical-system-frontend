export interface LabTechnician {
    email:string
    fullName:string
    status:string
    role:string
    labTechnicianId:string
}
export interface CreateLabTechnicianRequest {
    email: string;
    fullName: string;
    password: string;
}