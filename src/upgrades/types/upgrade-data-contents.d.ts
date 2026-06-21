export interface UpgradeDataContents {
    readonly "name":string;
    readonly "description":string;

    // level
    readonly "max-level":number | null;

    // price
    readonly "base-price":number[];
    readonly "mult-price":number;

    // value
    readonly "base-value":number[];
    readonly "mult-value":number;
    readonly "type-value":ValueType;
    readonly "default-value":number;
}