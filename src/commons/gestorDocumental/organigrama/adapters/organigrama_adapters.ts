import { type IList } from "../../../../interfaces/globalModels";
import { type ICCDObject } from "../../ccd/interfaces/ccd";
import { type TCA } from "../../tca/interfaces/tca";
import { type TRD } from "../../trd/interfaces/trd";
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

export const trds_choise_adapter: any = (trds:any) => {
    const data_new_format: IList[] = trds.map((trd:TRD) => ({
        value: trd.id_trd,
        label: trd.nombre,
    }));
    return data_new_format;
};

export const tcas_choise_adapter: any = (tcas:any) => {
    const data_new_format: IList[] = tcas.map((tca:TCA) => ({
        value: tca.id_tca,
        label: tca.nombre,
    }));
    return data_new_format;
};