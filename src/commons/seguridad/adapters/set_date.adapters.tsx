// Formatea Fecha remplaza (/) por (-)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const set_dates_format = (date: any): any =>  {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const get_date = date ? date.split(',')[0] : '';
    let new_date = '';
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    new_date = get_date ? get_date.replaceAll('/', '-') : '';
    return new_date;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const set_dates_format_revere = (date: any): any  => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (date && date !== '') {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const get_date = (date) ? date.split(',')[0] : '';
        const date_parts = get_date.split("/");
        date_parts.reverse();
        const new_date_format = date_parts.join("-");
        console.log(new_date_format);
        // Output: "2006-2-6"
        return (Boolean(new_date_format)) || '';
    } else {
        return '';
    }
}