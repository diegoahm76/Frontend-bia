/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Box, Button, Grid, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArchiveIcon from '@mui/icons-material/Archive'; import { Title } from "../../../../../../components/Title";
import type { GridColDef } from '@mui/x-data-grid';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { ModificadorFormatoFecha } from "../../utils/ModificaforFecha";
import { v4 as uuidv4 } from 'uuid';
import ClearIcon from '@mui/icons-material/Clear';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface MostrrModalArchivadoProps {
    data: any[];
}


export const MostrrModalArchivado: React.FC<MostrrModalArchivadoProps> = ({ data }: MostrrModalArchivadoProps) => {


    const [visible, setVisible] = useState<boolean>(false);
    const [filtroNombreModulo, setFiltroNombreModulo] = useState<string>(''); // Nuevo estado para el filtro
    const [columnaSeleccionada, setColumnaSeleccionada] = useState("nombre_modulo");

    const footerContent = (
      <div>
        <Button
          style={{ margin: 3 }}
          variant="contained"
          startIcon={<ClearIcon />}
          color="error"
          onClick={() => {
            setVisible(false);
          }}
        >
          Salir
        </Button>
      </div>
    );

    const titulo = <Title title={`Alertas archivadas`} />;

    const columns: GridColDef[] = [
      {
        field: 'nivel_prioridad',
        headerName: 'Nivel',
        width: 55,
        renderCell: (params: any) => {
          let icon_color = '';
          if (params.value === 1) {
            icon_color = '#4CAF50'; // Color verde
          } else if (params.value === 2) {
            icon_color = '#FFC107'; // Color amarillo
          } else if (params.value === 3) {
            icon_color = '#F44336'; // Color rojo
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PriorityHighRoundedIcon
                fontSize="small"
                style={{ color: icon_color, marginRight: 4 }}
              />
            </div>
          );
        },
      },
      {
        field: 'tipo_alerta',
        headerName: 'Tipo alerta',
        width: 150,
      },
      {
        field: 'fecha_hora',
        headerName: 'Fecha/Hora',
        width: 120,
        valueGetter: (params: any) =>
          ModificadorFormatoFecha(params.row.fecha_hora),
      },
      {
        field: 'nombre_clase_alerta',
        headerName: 'Nombre Clase Alerta',
        width: 250,
      },
      {
        field: 'responsable_directo',
        headerName: 'Responsable directo',
        headerAlign: 'center',
        minWidth: 120,
        maxWidth: 180,
        valueGetter: (params: any) =>
          params.row.responsable_directo === true ? 'Sí' : 'No',
      },
      {
        field: 'fecha_envio_email',
        headerName: 'Fecha envio email',
        width: 200,
        valueGetter: (params: any) =>
          ModificadorFormatoFecha(params.row.fecha_envio_email),
      },
      {
        field: 'nombre_modulo',
        headerName: 'Nombre Módulo',
        width: 250,
        valueGetter: (params: any) => {
          const ruta = params.value.replace('/#/app/', ''); // Eliminar "/#/app/"
          const firstPart = ruta.split('/')[0]; // Obtener la primera palabra después de eliminar '/#/app/'
          // Reemplazar guion bajo (_) por espacio
          return firstPart.replace(/_/g, ' ');
        },
      }
      
    ];

    return (
      <div className="card flex justify-content-center">
        <Button
          style={{ margin: 4, marginLeft: 35 }}
          variant="outlined"
          onClick={() => {
            setVisible(true);
          }}
        >
          <ArchiveIcon />
          Archivados
        </Button>
        <Dialog
          header={titulo}
          visible={visible}
          style={{ width: '55%' }}
          closable={false}
          onHide={(): void => {
            setVisible(false);
          }}
          footer={footerContent}
        >
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
          <Grid item xs={5}>
    <Select
           style={{ width: '80%' }}
      value={columnaSeleccionada}
      onChange={(e) => {setColumnaSeleccionada(e.target.value)}}
      fullWidth
      variant="outlined"
    >
      <MenuItem value="nombre_modulo">Nombre Módulo</MenuItem>
      <MenuItem value="responsable_directo">Responsable Directo</MenuItem>
      <MenuItem value="nombre_clase_alerta">Nombre Clase Alerta</MenuItem>
    </Select>
  </Grid>
  <Grid item xs={6}>
    <TextField
               style={{ width: '80%' }}
      label={`Buscar por ${columnaSeleccionada.replace("_", " ")}`}
      variant="outlined"
      fullWidth
      value={filtroNombreModulo}
      onChange={(e) => {setFiltroNombreModulo(e.target.value)}}
    />
  </Grid>

            <Grid item xs={12}>
              <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
              >
                <DataGrid
                  density="compact"
                  autoHeight
                  columns={columns}
                //   rows={data}
                rows={data.filter((item) =>
                    item.nombre_modulo.toLowerCase().includes(filtroNombreModulo.toLowerCase())
                  )}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                />
              </Box>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
};
