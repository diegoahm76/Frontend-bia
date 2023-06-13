import { type IList } from "../../../../interfaces/globalModels";
import { type ICCDObject } from "../../ccd/interfaces/ccd";
import { type IObjOrganigram } from "../interfaces/organigrama";


export const organigramas_choise_adapter: any = (organigramas:any) => {
    const data_new_format: IList[] = organigramas.map((organigrama:IObjOrganigram) => ({
        value: organigrama.id_organigrama,
        label: organigrama.nombre,
    }));
    return data_new_format;
};

export const ccds_choise_adapter: any = (ccds:any) => {
    const data_new_format: IList[] = ccds.map((ccd:ICCDObject) => ({
        value: ccd.id_ccd,
        label: ccd.nombre,
    }));
    return data_new_format;
};