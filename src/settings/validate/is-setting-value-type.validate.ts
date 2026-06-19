export function isSettingValueType(value:any):boolean {
    if(typeof value === "string") {
        return true;
    }
    else if(typeof value === "number") {
        return true;
    }
    else if(typeof value === "boolean") {
        return true;
    }

    return false;
}