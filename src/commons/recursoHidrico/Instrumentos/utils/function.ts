/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function findOptionByValue(value: string, options: any[]) {
    return options.find((option) => option.value === value);
}
