export interface UserSafeData {
    readonly id:number;
    readonly nickname:string | null;
    readonly name:string;
    readonly createdAt:Date;
    readonly updatedAt:Date;
}