/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import {
  reset_state,
  set_pqr_status,
  set_pqrs,
  set_type_applicant,
} from '../store/slice/pqrsdfSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import {
  get_document_types_service,
  get_filed_types_service,
  get_list_applicant_types_service,
  get_list_on_behalf_service,
  get_person_types_service,
  get_pqrs_status_aux_service,
} from '../store/thunks/pqrsdfThunks';
import SeleccionarRadicado from '../componentes/ImpresionRadicado/SeleccionarRadicado';
import ImprimirRadicado from '../componentes/ImpresionRadicado/ImprimirRadicado';
import PrintIcon from '@mui/icons-material/Print';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ImpresionRadicadoScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { filed } = useAppSelector((state) => state.pqrsdf_slice);
  const [visor, set_visor] = useState<any>();

  const initial_values = (): void => {};

  useEffect(() => {
    void dispatch(get_filed_types_service());
  }, []);

  useEffect(() => {
    //  console.log('')(filed);
  }, [filed]);

  const descargarPDF = () => {
    // Puedes convertir el contenido del visor a Blob
    const byteString = atob(visor.split(',')[1]);
    const mimeString = visor.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeString });

    // Crea un enlace temporal y simula un clic para iniciar la descarga
    const enlaceTemporal = document.createElement('a');
    enlaceTemporal.href = URL.createObjectURL(blob);
    enlaceTemporal.download = `reporte_radicado_${
      filed.numero_radicado_completo ?? ''
    }.pdf`;
    enlaceTemporal.click();
  };
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} marginY={2}>
          <Title title="Impresión de radicados"></Title>
        </Grid>
        <SeleccionarRadicado />
        {filed.numero_radicado_completo !== null && (
          <ImprimirRadicado visor={visor} set_visor={set_visor} />
        )}

        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={descargarPDF}
              icon_class={<PrintIcon />}
              disabled={filed.numero_radicado_completo === null}
              label="Imprimir"
              type_button="button"
              color_button="warning"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
              clean_when_leaving={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
