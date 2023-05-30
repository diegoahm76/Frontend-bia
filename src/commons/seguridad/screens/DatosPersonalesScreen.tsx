import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { DataPersonas } from "../../../interfaces/globalModels";
import type { AuthSlice } from "../../auth/interfaces";
import { control_error } from "../../../helpers";
import { consultar_datos_persona } from "../request/Request";
import { DatosPersonalesNatural } from "../components/DatosPersonalesNatiral/DatosPersonalesNatiral";
import { DatosPersonalesJuridica } from "../components/DatosPersonalesJuridica/DatosPersonalesJuridica";
import { use_register } from "../../auth/hooks/registerHook";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosPersonalesScreen: React.FC = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [datos, set_datos] = useState<DataPersonas>();
  const {
    errors,
    is_valid,
    get_values,
    handle_submit,
    register,
    set_value,
    watch,
  } = use_register();

  const datos_usuario = async (id_persona: number): Promise<void> => {
    try {
      const {
        data: { data },
      } = await consultar_datos_persona(id_persona);
      console.log(data)
      set_datos(data)
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };

  useEffect(() => {
    void datos_usuario(userinfo.id_persona);
    console.log(datos)
  }, []);


  return (
    <>
      {datos?.tipo_persona === 'N' && (
        <>
          <DatosPersonalesNatural
          data={datos}
          errors={errors}
          handleSubmit={handle_submit}
          isValid={is_valid}
          register={register}
          setValue={set_value}
          getValues={get_values}
          watch={watch}
          />
        </>
      )}
      {datos?.tipo_persona === 'J' && (
        <>
          <DatosPersonalesJuridica
          data={datos}
          errors={errors}
          handleSubmit={handle_submit}
          isValid={is_valid}
          register={register}
          setValue={set_value}
          getValues={get_values}
          watch={watch}/>
        </>
      )}
    </>
  );
};
