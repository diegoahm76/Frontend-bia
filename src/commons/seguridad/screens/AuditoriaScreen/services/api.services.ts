import { api } from "../../../../../api/axios";
import { adapter_modules_choices, adapter_subsistemas_choices } from "../../../../auth/adapters/auditorias.adapters";
import { text_choise_adapter } from "../../../../auth/adapters/textChoices.adapter";

export const get_info = async (
  set_subsistemas_options: React.Dispatch<React.SetStateAction<any[]>>,
  set_modulos_options: React.Dispatch<React.SetStateAction<any[]>>,
  set_tipo_documento_options: React.Dispatch<React.SetStateAction<any[]>>
): Promise<void> => {
  try {
    const [data_subsistemas, data_modulos, tipo_documentos_no_format] =
      await Promise.all([
        api('choices/subsistemas/'),
        api('permisos/modulos/get-list/'),
        api.get('choices/tipo-documento/')
      ]);

    //  console.log('')(data_subsistemas.data);
    //  console.log('')(data_modulos.data);

    const subsistemas_adapted = adapter_subsistemas_choices(
      data_subsistemas.data
    );
    const modulos_adapted = adapter_modules_choices(data_modulos.data);
    const documentos_format = text_choise_adapter(
      tipo_documentos_no_format.data
    );

    set_subsistemas_options(subsistemas_adapted);
    set_modulos_options(modulos_adapted);
    set_tipo_documento_options(documentos_format);
  } catch (err) {
    //  console.log('')(err);
  }
};
