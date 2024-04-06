import { DepartamentoResponse, MunicipiosResponse, PaisesResponse } from "../interfaces/types";

///////////////// Departamentos de encuestas 
const fetch_data_dptos_encuestas = async ({
    url,
    callbackState,
}: {
    url: string,
    callbackState: Function,
}): Promise<any> => {
    try {
        const response = await fetch(url);
        const data: DepartamentoResponse = await response.json();
        if (data.success) {
            callbackState(data.data);
        } else {
            //  console.log('')(data.detail);
        }
    } catch (error) {
        //  console.log('')('Error fetching departamentos:', error);
    }
};


/////////////////////// Municipios de encuestas 
const fetch_data_municipio_encuestas = async ({
    baseURL,
    setmunicipios,
    selected_departamento,
}: {
    baseURL: any,
    setmunicipios: any,
    selected_departamento: any,
}): Promise<any> => {
    try {
        const response = await fetch(`${baseURL}listas/municipios/?cod_departamento=${selected_departamento}`);
        const data: MunicipiosResponse = await response.json();
        if (data.success) {
            setmunicipios(data.data);
        } else {
            //  console.log('')(data.detail);
        }
    } catch (error) {
        //  console.log('')('Error fetching municipios:', error);
    }
};

////////////////////////// paises encuesta 
const fetch_data_pais_encuestas = async ({
    setpaises,
    baseURL,
}:{
    setpaises:any,
    baseURL:any,
}): Promise<any> => {
    try {

        const response = await fetch(`${baseURL}listas/paises/`);
        const data: PaisesResponse = await response.json();
        if (data.success) {
            setpaises(data.data);

        } else {
            //  console.log('')(data.detail);
        }
    } catch (error) {
        //  console.log('')('Error fetching paises:', error);
    }
};



export {
    fetch_data_dptos_encuestas,
    fetch_data_municipio_encuestas,
    fetch_data_pais_encuestas
}