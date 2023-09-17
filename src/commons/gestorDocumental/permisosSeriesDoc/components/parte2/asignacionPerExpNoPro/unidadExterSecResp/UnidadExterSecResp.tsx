/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC, useState } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid } from '@mui/material';
import { useAppSelector } from '../../../../../../../hooks';
import { containerStyles } from './../../../../../tca/screens/utils/constants/constants';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { columnsAsignacionPer } from '../../utils/columnsAsignacionPer/columnsAsignacionPer';
import { ModalContextPSD } from '../../../../context/ModalContextPSD';
import { ModalUniExterSecResp } from './ModalUniExterSecResp/ModalUniExterSecResp';

// ! Unidades organizacionales actuales EXTERNAS a la sección responsable
export const UnidadExterSecResp: FC<any> = (): JSX.Element => {
  //* get states from redux store
  const { unidadesActualesExternas } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  const { loadingRestricciones } = useContext(ModalContextPSD);

  // ? useState necesarios
  const [modalUniExt, setmodalUniExt] = useState<boolean>(false)

  // ? este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en FALSE para este caso

  const columns = [
    ...columnsAsignacionPer,

    // ?  ---- PERMISOS ---
    //* --- dentro de cada fila de permisos van a coexsistir dos elementos renderizados (una guía de lo que marque en el checkbox y el respectivo checkbox )
    // ? CONSTRUIR UN COMPONENTE PARA RENDERIZAR ESTOS CAMPOS
    { field: 'crear_expedientes', headerName: 'Crear expediente', width: 150 },
    {
      field: 'crear_documentos_exps_no_propios',
      headerName: 'Crear documento',
      width: 150
    },
    {
      field: 'anular_documentos_exps_no_propios',
      headerName: 'Anular documento',
      width: 150
    },
    {
      field: 'borrar_documentos_exps_no_propios',
      headerName: 'Borrar documento',
      width: 150
    },
    {
      field: 'conceder_acceso_documentos_exps_no_propios',
      headerName: 'Conceder acceso a docs',
      width: 180
    },
    {
      field: 'conceder_acceso_expedientes_no_propios',
      headerName: 'Conceder acceso a exps',
      width: 180
    },
    {
      field: 'consultar_expedientes_no_propios',
      headerName: 'Consultar expedientes',
      width: 180
    },
    {
      field: 'descargar_expedientes_no_propios',
      headerName: 'Descargar expedientes',
      width: 180
    }

    //* revisar para que puede ser útil esta opción
    // { field: 'id_permisos_und_org_actual_serie_exp_ccd', headerName: 'ID de permisos' },

    // ! este campo ""pertenece_seccion_actual_admin_serie": false,"    --- debe mandarse en FALSE para este caso
    // { field: 'pertenece_seccion_actual_admin_serie', headerName: 'Pertenece a la sección actual' }
  ];

  if (loadingRestricciones)
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          position: 'static',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Loader altura={270} />
      </Grid>
    );

  // ! solo se renderizaran en este componente aquellos objetos con la propiedad mostrar en TRUE, los demas irán en el modal

  return (
    <>
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
            onClick={() => setmodalUniExt(true)}
          >
            AGREGAR UNIDADES EXTERNAS
          </Button>
        </Grid>
      }
    />
    

      {/*modal agregar unidades externas*/}
      <ModalUniExterSecResp
        modalUniExt={modalUniExt}
        setmodalUniExt={setmodalUniExt}
      />
      {/*modal agregar unidades externas*/}

    </>
  );
};
