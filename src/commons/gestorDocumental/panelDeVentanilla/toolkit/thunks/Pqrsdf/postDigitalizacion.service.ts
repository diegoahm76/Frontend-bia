/* eslint-disable @typescript-eslint/naming-convention */
export const postDigitalizacionPqrsdfCompletemento = async(data: any)=> {
    const response = await fetch('http://localhost:3000/api/v1/pqrsdf/digitalizacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}