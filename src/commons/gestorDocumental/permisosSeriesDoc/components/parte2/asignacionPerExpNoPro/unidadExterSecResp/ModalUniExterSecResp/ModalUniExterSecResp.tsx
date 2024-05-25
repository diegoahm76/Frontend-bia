/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack
} from '@mui/material';
import { Title } from '../../../../../../../../components';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { CheckboxComponent } from '../../../../../../../../utils/Checkbox/CheckboxComponent';
import { set_permisos_unidades_actuales_externas_action } from '../../../../../toolkit/slice/PSDSlice';
import { columnsAsignacionPer } from '../../../utils/columnsAsignacionPer/columnsAsignacionPer';
import { handleCheckboxChange } from '../../../../../../../../utils/Checkbox/functions/handleCheckbox';

export const ModalUniExterSecResp = (params: any): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  const { modalUniExt, setmodalUniExt } = params;

  //* redux states
  const { unidadesActualesExternas } = useAppSelector(
    (state) => state.PsdSlice
  );


  const handleCheckboxChangePRUEBA = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) && elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === 'consultar_expedientes_no_propios' && elemento[propiedad] ? true : checked,
              ])
            ),
          }
        : elemento
    );
    //  console.log('')(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };


  const handleCheckboxChangeConsulta = (
    { target: { checked } }: React.ChangeEvent<HTMLInputElement>,
    compararPor: string,
    valorComparar: any,
    arrayComparacion: any[],
    propiedades: string[],
    dispatch: React.Dispatch<any>,
    callback: Function
  ): void => {
    const DATOS_ACTUALIZADOS = arrayComparacion.map((elemento: any) =>
      elemento.hasOwnProperty(compararPor) && elemento[compararPor] === valorComparar
        ? {
            ...elemento,
            ...Object.fromEntries(
              propiedades.map((propiedad) => [
                propiedad,
                propiedad === 'consultar_expedientes_no_propios' ? checked : false,
              ])
            ),
          }
        : elemento
    );
    //  console.log('')(DATOS_ACTUALIZADOS);
    dispatch(callback(DATOS_ACTUALIZADOS));
  };


  const columns = [
    ...columnsAsignacionPer,
    {
      field: 'crear_expedientes',
      headerName: 'Crear expediente',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.crear_expedientes}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChange(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['crear_expedientes'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      field: 'crear_documentos_exps_no_propios',
      headerName: 'Crear documento',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.crear_documentos_exps_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChange(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['crear_documentos_exps_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      // ! ------- ANULAR ----
      field: 'anular_documentos_exps_no_propios',
      headerName: 'Anular documento',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.anular_documentos_exps_no_propios}


         handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['anular_documentos_exps_no_propios', 'consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      // ! ------- BORRAR DOCUMENTO ----
      field: 'borrar_documentos_exps_no_propios',
      headerName: 'Borrar documento',
      width: 135,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.borrar_documentos_exps_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['borrar_documentos_exps_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      // ! ------- CONCEDER ACCESO A EXPEDIENTE ----
      field: 'conceder_acceso_documentos_exps_no_propios',
      headerName: 'Conceder acceso a docs',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.conceder_acceso_documentos_exps_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['conceder_acceso_documentos_exps_no_propios', 'consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      // ! ------- CONCEDER ACCESO A EXPEDIENTES ----
      field: 'conceder_acceso_expedientes_no_propios',
      headerName: 'Conceder acceso a exps',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.conceder_acceso_expedientes_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['conceder_acceso_expedientes_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      field: 'consultar_expedientes_no_propios',
      headerName: 'Consultar expedientes',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.consultar_expedientes_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangeConsulta(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['consultar_expedientes_no_propios',
              'descargar_expedientes_no_propios',
              'anular_documentos_exps_no_propios',
              'borrar_documentos_exps_no_propios',
              'conceder_acceso_documentos_exps_no_propios',
              'conceder_acceso_expedientes_no_propios',
            ],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    },
    {
      field: 'descargar_expedientes_no_propios',
      headerName: 'Descargar expedientes',
      width: 165,
      renderCell: (params: any) => (
        <CheckboxComponent
          checked={params.row.descargar_expedientes_no_propios}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleCheckboxChangePRUEBA(
              event,
              'id_und_organizacional_actual',
              params.row.id_und_organizacional_actual,
              unidadesActualesExternas,
              ['descargar_expedientes_no_propios','consultar_expedientes_no_propios'],
              dispatch,
              set_permisos_unidades_actuales_externas_action
            );
          }}
        />
      )
    }
  ];

  

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={modalUniExt}
      onClose={() => {
        //  console.log('')('cerrando modal');
        setmodalUniExt(false);
      }}
    >
      <DialogTitle>
        <Title title="Unidades organizacionales actuales externas a la sección responsable" />
      </DialogTitle>
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <Grid container spacing={2}></Grid>
        </Grid>
        <RenderDataGrid
          columns={columns}
          rows={unidadesActualesExternas.filter((el) => !el.mostrar) || []}
          title="Unidades externas"
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              //  console.log('')('cerrando modal');
              setmodalUniExt(false);
            }}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
