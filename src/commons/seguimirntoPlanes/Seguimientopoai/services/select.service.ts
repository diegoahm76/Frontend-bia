/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../api/axios";


const fetplames = async ({
    setPlanes,
}:{
    setPlanes:any,
}): Promise<any> => {
    try {
        const url = "seguimiento/planes/consultar-planes/";
        const res = await api.get(url);
        const unidadesData = res.data.data;
        setPlanes(unidadesData);
    } catch (error) {
        console.error(error);
    }
};

//programas 
const fetprogramas = async ({
    setPrograma,
    formData,
}:{
    setPrograma:any,
    formData:any,
}): Promise<any> => {
    try {
        const url = `seguimiento/planes/consultar-programas-id-eje-estrategico/${formData.eje}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setPrograma(datas);
    } catch (error) {
        console.error(error);
    }
};
// api/seguimiento/planes/consultar-proyectos/

const fetproyecto = async ({
    setProyecto,
    formData,
}:{
    setProyecto:any,
    formData:any,

}): Promise<any> => {
    try {
        const url = `/seguimiento/planes/consultar-proyectos-id-programas/${formData.programa}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setProyecto(datas);
    } catch (error) {
        console.error(error);
    }
};


const fetproducto = async ({
    setProducto,
    formData
}:{
    setProducto:any,
    formData:any,
}): Promise<any> => {
    try {
        const url = `seguimiento/planes/consultar-productos-id-proyectos/${formData.proyecto}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setProducto(datas);
    } catch (error) {
        console.error(error);
    }
};

const fetactividad = async ({
    setactividad,
    formData
}:{
    setactividad:any,
    formData:any,
}): Promise<any> => {
    try {
const url =  `seguimiento/planes/consultar-actividades-id-productos/${formData.producto}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setactividad(datas);
    } catch (error) {
        console.error(error);
    }
};



const fetindicador = async ({
    setindicador,
    formData
}:{
    setindicador:any,
    formData:any,
}): Promise<any> => {
    try {
        const url = `seguimiento/planes/consultar-indicadores-id-actividad/${formData.actividad}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setindicador(datas);
    } catch (error) {
        console.error(error);
    }
};


const fetmetas = async ({
    setmetas,
    formData,

}:{
    setmetas:any,
    formData:any,
}): Promise<any> => {
    try {
        const url = `seguimiento/planes/consultar-metas-id-indicador/${formData.indicador}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setmetas(datas);
    } catch (error) {
        console.error(error);
    }
};


const fetejeplan = async ({
    setejeplan,
    formData,

}:{
    setejeplan:any,
    formData:any,
}): Promise<any> => {
    try { 

        const url = `seguimiento/planes/consultar-ejes-estrategicos-id-planes/${formData.plan}/`;
        const res = await api.get(url);
        const datas = res.data.data;
        setejeplan(datas);
    } catch (error) {
        console.error(error);
    }
};

export {

    fetejeplan,
    fetmetas,
    fetindicador,
    fetactividad,
    fetplames,
    fetproyecto,
    fetprogramas,
    fetproducto
}