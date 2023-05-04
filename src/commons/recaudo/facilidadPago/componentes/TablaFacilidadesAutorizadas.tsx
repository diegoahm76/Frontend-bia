/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Grid, Box, IconButton, Avatar, Tooltip, Checkbox } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadesAutorizadas: React.FC = () => {
  const [selected, set_selected] = useState<readonly string[]>([]);

  const fac_pago = [
    {
      id: 1,
      nombreObligacion: 'Permiso 1',
      nroResolucion: '378765-143',
      valorTotal: 120000000,
      estado: 'Aprobado'
    },
    {
      id: 2,
      nombreObligacion: 'Concesion Aguas',
      nroResolucion: '3342765-4546',
      valorTotal: 35000000,
      estado: 'En Curso'
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'checkbox',
      headerName: 'Solicitar Fac. Pago',
      width: 150,
      renderCell: (params) => (
        <Checkbox
          onClick={(event) => {
            handle_click(event, params.row.nombreObligacion)
          }}
        />
      )
    },
    {
      field: 'nombreObligacion',
      headerName: 'Facilidad de Pago',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nroResolucion',
      headerName: 'Nro Resolución',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valorTotal',
      headerName: 'Valor Total',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => {
        return params.row.id !== 'total' ? (
          <>
            <Tooltip title="Ver">
                <IconButton
                  onClick={() => {}}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      background: '#fff',
                      border: '2px solid',
                    }}
                    variant="rounded"
                  >
                    <ArticleIcon
                      sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                    />

                  </Avatar>
                </IconButton>
              </Tooltip>
            </>
        ) : null
      },
    },
  ];

  const handle_click = (event: React.MouseEvent<unknown>, name: string) => {
    const selected_index = selected.indexOf(name);
    let new_selected: readonly string[] = [];

    if (selected_index === -1) {
      new_selected = new_selected.concat(selected, name);
    } else if (selected_index === 0) {
      new_selected = new_selected.concat(selected.slice(1));
    } else if (selected_index === selected.length - 1) {
      new_selected = new_selected.concat(selected.slice(0, -1));
    } else if (selected_index > 0) {
      new_selected = new_selected.concat(
        selected.slice(0, selected_index),
        selected.slice(selected_index + 1),
      );
    }

    set_selected(new_selected);
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
        <Grid item xs={12}>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                autoHeight
                disableSelectionOnClick
                rows={fac_pago}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
