/* eslint-disable @typescript-eslint/naming-convention */
const baseUrl = 'http://macarenia.bitpointer.co/api';

export class LiquidatorService {

    static async findAll() {
        return fetch(`${baseUrl}/liquidacion`)
            .then(response => response.json())
    }

    static async findOne(id) {
        return fetch(`${baseUrl}/liquidacion/${id}`)
            .then(response => response.json())
            .then(liquidatorAdapter)
    }
}


const liquidatorAdapter = (response) => {
    const data = response?.[0];
    return {
        name: (Boolean((data?.name))) || (Boolean((data?.descripcion))) || '',
        variables: (Boolean((data?.parametros?.parameters?.map(param => param.name)))) || [],
        funcion: data?.funcion,
        xmlStringCode: (Boolean((data?.xmlStringCode))) || '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
    }
}