/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, ButtonGroup, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { BusquedaAvanzada } from '../../components/BusquedaAvanzadaPORH/BusquedaAvanzada';
import type { InfoAvance, InfoPorh } from '../../Interfaces/interfaces';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { RegistroAvance } from '../../components/RegistrarAvance/registroAvance';
import { BusquedaAvances } from '../../components/BusquedaAvances/BusquedaAvances';
import { EditarAvance } from '../../components/EditarAvance/EditarAvance';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DialogActividades } from '../../components/DialogActividades/DialogActividades';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import '../../css/styles.css';
import { DialogEvidencias } from '../../components/DialogEvidencias/DialogEvidencias';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AvanceScreen: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'accion',
      headerName: 'ACCIÓN',
      sortable: true,
      width: 250,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 400,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'fecha_reporte',
      headerName: 'FECHA REPORTE',
      sortable: true,
      width: 150,
    },
    {
      field: 'evidencia',
      headerName: 'EVIDENCIA',
      sortable: true,
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver evidencias">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<RemoveRedEyeIcon />}
              onClick={() => {
                set_info_avance(params.row as InfoAvance);
                handle_evidencias();
              }}
            />
          </Tooltip>
        </>
      ),
    },
    {
      field: 'ACCIONES',
      headerName: 'ACTIVIDADES',
      sortable: true,
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver Actividades">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<RemoveRedEyeIcon />}
              onClick={() => {
                handle_actividades();
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const {
    rows_avances,
    id_proyecto,
    is_register_avance,
    is_select_avance,
    is_editar_avance,
    is_select_proyecto,
    set_info_avance,
    fetch_data_avances,
    set_id_proyecto,
    set_mode,
  } = useContext(DataContext);

  const [info, set_info] = useState<InfoPorh>();
  const [is_modal_active, set_is_modal_active] = useState<boolean>(false);
  const [is_modal_active_evidencias, set_is_modal_active_evidencias] =
    useState<boolean>(false);

  const handle_actividades = (): void => {
    set_is_modal_active(!is_modal_active);
  };
  const handle_evidencias = (): void => {
    set_is_modal_active_evidencias(!is_modal_active);
  };

  const on_result = (info_porh: InfoPorh): void => {
    // reset();
    set_info(info_porh);
    set_id_proyecto(info_porh?.id_proyecto);
  };

  const on_result_avance = (Info_avance: InfoAvance): void => {
    // reset();
    set_info_avance(Info_avance);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (info) {
      void fetch_data_avances();
    }
  }, [info]);
  return (
    <Grid
      container
      spacing={2}
      m={2}
      p={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        m: '10px 0 20px 0',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Title title="Avances del proyecto" />
      </Grid>
      <BusquedaAvanzada onResult={on_result} />
      {is_select_proyecto && rows_avances.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Avances
            </Typography>
            <Divider />
            <ButtonGroup
              style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
            >
              {download_xls({ nurseries: rows_avances, columns })}
              {download_pdf({ nurseries: rows_avances, columns, title: 'Avances' })}
            </ButtonGroup> 
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              rows={rows_avances}
              columns={columns}
              getRowId={(row) => row.id_avance}
              pageSize={10}
              rowsPerPageOptions={[10]}
              rowHeight={100}
            />
          </Grid>
        </>
      )}
      <Grid item spacing={2} justifyContent="end" container>
        {is_select_proyecto && id_proyecto ? (
          <Grid item>
            <LoadingButton
              variant="outlined"
              onClick={() => {
                set_mode('register_avance');
              }}
            >
              Registrar Avance
            </LoadingButton>
          </Grid>
        ) : null}
      </Grid>
      {is_register_avance && <RegistroAvance />}
      {is_select_avance && <EditarAvance />}
      {is_editar_avance && <EditarAvance />}
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <ButtonSalir />
        </Grid>
        <BusquedaAvances onResult={on_result_avance} />
      </Grid>
      <DialogActividades
        is_modal_active={is_modal_active}
        set_is_modal_active={set_is_modal_active}
      />
      <DialogEvidencias
        is_modal_active={is_modal_active_evidencias}
        set_is_modal_active={set_is_modal_active_evidencias}
      />
    </Grid>
  );
};
