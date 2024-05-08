
// eslint-disable-next-line @typescript-eslint/naming-convention
export const LetraFormatoHumano = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};