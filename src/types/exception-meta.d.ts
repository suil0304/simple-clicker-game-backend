export declare interface ExceptionMeta {
    readonly modelName?:string;
    readonly driverAdapterError?:DriverAdapterError;
}

export declare interface DriverAdapterError {
    readonly name:string;
    readonly cause?:DriverAdapterErrorCause;
}

export declare interface DriverAdapterErrorCause {
    readonly originalCode:string;
    readonly originalMessage:string;
    readonly kind:string;
    readonly constraint:DriverAdapterErrorConstraint;
}

export declare interface DriverAdapterErrorConstraint {
    readonly index:string;
}