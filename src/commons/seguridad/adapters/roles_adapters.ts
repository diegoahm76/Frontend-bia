import type {  IList2,  Rol } from "../interfaces";

export const roles_choise_adapter: any = (roles:any) => {
    const data_new_format: IList2[] = roles.map((rol:Rol) => ({
        value: rol.id_rol,
        label: rol.nombre_rol,
    }));
    return data_new_format;
};