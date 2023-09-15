/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid } from '@mui/material';
import { useAppSelector } from '../../../../../../../hooks';

export const UnidadExterSecResp: FC<any> = (): JSX.Element => {
  //* get states from redux store
  const { unidadesActualesExternas } = useAppSelector(
    (state) => state.PsdSlice
  );

  const columns = [
    { field: 'id_cat_serie_und_org_ccd', headerName: 'ID' },
    { field: 'nombre_und_organizacional_actual', headerName: 'Nombre' },
    { field: 'activo', headerName: 'Activo' },
    { field: 'anular_documentos_exps_no_propios', headerName: 'Anular documentos' },
    { field: 'borrar_documentos_exps_no_propios', headerName: 'Borrar documentos' },
    { field: 'cod_agrupacion_documental', headerName: 'Código de agrupación' },
    { field: 'codigo_und_organizacional_actual', headerName: 'Código de unidad' },
    { field: 'conceder_acceso_documentos_exps_no_propios', headerName: 'Conceder acceso a documentos' },
    { field: 'conceder_acceso_expedientes_no_propios', headerName: 'Conceder acceso a expedientes' },
    { field: 'consultar_expedientes_no_propios', headerName: 'Consultar expedientes' },
    { field: 'crear_documentos_exps_no_propios', headerName: 'Crear documentos' },
    { field: 'crear_expedientes', headerName: 'Crear expedientes' },
    { field: 'descargar_expedientes_no_propios', headerName: 'Descargar expedientes' },
    { field: 'id_permisos_und_org_actual_serie_exp_ccd', headerName: 'ID de permisos' },
    { field: 'id_und_organizacional_actual', headerName: 'ID de unidad' },
    { field: 'mostrar', headerName: 'Mostrar' },
    { field: 'pertenece_seccion_actual_admin_serie', headerName: 'Pertenece a la sección actual' }
  ];


  return (
    <RenderDataGrid
      columns={columns || []}
      rows={unidadesActualesExternas || []}
      title="Unidades organizacionales actuales externas a la sección responsable"
      aditionalElement={
        <Grid
          item
          sx={{
            width: '100%',
            marginTop: '1rem'
          }}
        >
          <Button
            color="success"
            variant="contained"
            startIcon={<AddIcon />}
            // disabled={!tca_current}
          >
            AGREGAR UNIDADES EXTERNAS
          </Button>
        </Grid>
      }
    />
  );
};
