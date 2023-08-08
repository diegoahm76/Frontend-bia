import { Box, Grid, ButtonGroup, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { Title } from '../../../../../components/Title';
import type { InterAlertas } from '../interfaces/interfacesAlertas';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { ButtonOfDialog } from '../components/dialogo/dialogo';
import { ModalConfirmacionArchivar } from '../components/modalConfirmacio/ModalConfirmacion';
import { ModalInfoAlerta } from '../components/modalInformacionAlenta/InfoAlerta';
import { SuspenderAlerta } from '../components/SuspenderAlerta/SuspenderAlerta';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PantallaPrincipalAlertas: React.FC = () => {
  const datos_asignacion: InterAlertas[] = [];

  const [data_lideres, setdata_lideres] =
    useState<InterAlertas[]>(datos_asignacion);

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = '/transversal/lideres/get-list-actual/';
      const res = await api.get(url);
      const facilidad_pago_data = res.data.data;
      setdata_lideres(facilidad_pago_data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);

  const columns = [
    {
      field: 'codigo_unidad_org',
      headerName: 'Código Unidad Org',
      width: 200,
      flex: 1,
    },
    {
      field: 'nombre_unidad_org',
      headerName: 'Nombre Unidad Org',
      width: 200,
      flex: 1,
    },
    {
      field: 'nombre_completo',
      headerName: 'Nombre Completo',
      width: 200,
      flex: 1,
    },
    {
      field: 'opciones',
      headerName: 'Opciones',
      width: 200,
      flex: 1,
      renderCell: (params: any) => (
        <ButtonGroup variant="text">
          <IconButton
            // onClick={() => {
            //   handleDoNotDisturbOn();
            // }}
          >
            <SuspenderAlerta />
          </IconButton>
          <IconButton
            // onClick={() => {
            //   handleArchive();
            // }}
          >
            <ModalConfirmacionArchivar />
          </IconButton>
          <IconButton>
            <ModalInfoAlerta/>
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];

  // Funciones para manejar los clics en los iconos
  // // eslint-disable-next-line @typescript-eslint/naming-convention
  // const handleDoNotDisturbOn = (): void => {
  //   console.log(`Clic en DoNotDisturbOnIcon para el id`);
  // };

  // // eslint-disable-next-line @typescript-eslint/naming-convention
  // const handleArchive = (): void => {
  //   console.log(`Clic en ArchiveIcon para el id`);
  // };

  return (
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
      <Grid item xs={12}>
        <Title title="Mis alertas" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ButtonGroup style={{ margin: 7 }}>
            <ButtonOfDialog />
          </ButtonGroup>
          <ButtonGroup style={{ margin: 7 }}>
            {download_xls({ nurseries: data_lideres, columns })}
          </ButtonGroup>
        </div>
        <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={data_lideres}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id_persona}
          />
         
        </Box>
      </Grid>
    </Grid>
  );
};
