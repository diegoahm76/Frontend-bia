/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../api/axios";

export const getTipoDeTarea = async () => {
    try {
        const url = `gestor/choices/tipo-tarea/`;
        const { data } = await api.get(url);
        const dataModified = data?.data?.map(([value, label]: [string, string]) => ({ label, value }));
        console.log(dataModified);
    }
    catch (err) {
        return [];
    }
    finally {
    }
}