/* eslint-disable @typescript-eslint/naming-convention */
import {  useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Box, Button, Checkbox, Grid, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { v4 as uuidv4 } from 'uuid';
import ClearIcon from '@mui/icons-material/Clear';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Title } from '../../../../../components/Title';

export const MostrarModalBuscarPlantilla: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [nombre_plantilla, set_nombre_plantilla] = useState<string>(''); // Nuevo estado para el filtro
  const [Descripccion, set_Descripccion] = useState<string>(''); // Nuevo estado para el filtro
  const [Extension, set_Extension] = useState<string>(''); // Nuevo estado para el filtro

  const [tipoligia_documental, set_tipoligia_documental] = useState('Seleccionar');
  const [Columna_Disponivilidad, set_Columna_Disponivilidad] = useState('Seleccionar');
  const [checked, setChecked] = useState(false);
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

  const titulo = <Title title={`Busqueda`} />;

  const data = [
    {
      nivel_prioridad: '1',
      tipo_alerta: 'Tipo 1',
      nombre_clase_alerta: 'Clase 1',
      responsable_directo: true,
      fecha_envio_email: '2023-09-11',
      nombre_modulo: 'Módulo 1',
    },
    {
      nivel_prioridad: '2',
      tipo_alerta: 'Tipo 2',
      nombre_clase_alerta: 'Clase 2',
      responsable_directo: false,
      fecha_envio_email: '2023-09-12',
      nombre_modulo: 'Módulo 2',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'nivel_prioridad',
      headerName: 'Nivel',
      width: 55,
      renderCell: (params: any) => {
        let icon_color = '';
        if (params.value === '1') {
          icon_color = '#4CAF50'; // Color verde
        } else if (params.value === '2') {
          icon_color = '#FFC107'; // Color amarillo
        } else if (params.value === '3') {
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
    },
  ];



  return (
    <div className="card flex justify-content-center">
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          setVisible(true);
        }}
      >
        buscarr
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
          <Grid item xs={6}>
            <TextField
              style={{ width: '80%', marginTop: 7 }}
              label={`Buscar por Nombre de Plantilla`}
              variant="outlined"
              fullWidth
              value={nombre_plantilla}
              onChange={(e) => {
                set_nombre_plantilla(e.target.value);
              }}
            />

            <TextField
              style={{ width: '80%', marginTop: 7 }}
              label={`Buscar por Descripccion`}
              variant="outlined"
              fullWidth
              value={Descripccion}
              onChange={(e) => {
                set_Descripccion(e.target.value);
              }}
            />
            <TextField
              style={{ width: '80%', marginTop: 7 }}
              label={`Buscar por Extension`}
              variant="outlined"
              fullWidth
              value={Extension}
              onChange={(e) => {
                set_Extension(e.target.value);
              }}
            />
            <Grid item xs={12}>
              <Checkbox
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
                checked={checked}
              ></Checkbox>
              <label htmlFor="ingredient4" className="ml-2">
                Mostrat Todas Las Plantillas
              </label>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Select
              style={{ width: '100%', marginTop: 7 }}
              value={tipoligia_documental}
              onChange={(e) => {
                set_tipoligia_documental(e.target.value);
              }}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="nombre_modulo">Nombre Módulo</MenuItem>
              <MenuItem value="responsable_directo">
                Responsable Directo
              </MenuItem>
              <MenuItem value="nombre_clase_alerta">
                Nombre Clase Alerta
              </MenuItem>
            </Select>

            <Select
              style={{ width: '100%', marginTop: 7 }}
              value={Columna_Disponivilidad}
              onChange={(e) => {
                set_Columna_Disponivilidad(e.target.value);
              }}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="nombre_modulo">Nombre Módulo</MenuItem>
              <MenuItem value="responsable_directo">
                Responsable Directo
              </MenuItem>
              <MenuItem value="nombre_clase_alerta">
                Nombre Clase Alerta
              </MenuItem>
            </Select>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Button
                color="success"
                fullWidth
                variant="contained"
                style={{ width: '80%' }}
              >
                guardar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" style={{ width: '80%' }}>
                limpiar
              </Button>
            </Grid>
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
                rows={data}
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
