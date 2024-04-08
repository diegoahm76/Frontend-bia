import { control_error } from '../../../../../../../helpers';
import { get_tipo_documento } from '../../../../../../../request';

// eslint-disable-next-line @typescript-eslint/naming-convention
const getTipoDocOptions = async (): Promise<any> => {
  try {
    const {
      data: { data: res_tipo_documento },
    } = await get_tipo_documento();
    console.log('res_tipo_documento', res_tipo_documento);
    return res_tipo_documento;
  } catch (err: any) {
    control_error(err?.response?.data?.detail);
  }
};


export{
  getTipoDocOptions
}