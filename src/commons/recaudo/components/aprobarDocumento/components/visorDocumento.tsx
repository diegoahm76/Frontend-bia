/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Title } from '../../../../../components/Title';
import CheckIcon from '@mui/icons-material/Check';  // Cambia la importación a la nueva ubicación
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Registro } from '../interfaces/IAprobarDocumento';
import { handleActionClick } from '../AcionesFinalesUpDate/Update.service';
import { GetNombreMes } from '../utils/MesesPorNumero';


export const VisorDocumento = ({ data_r, Actualizar_tabla }: { data_r: Registro; Actualizar_tabla: () => void }) => {

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const handleActivateClick = () => {
    handleActionClick(data_r.id);
    Actualizar_tabla();
  };



  const columnsFuentesAbastecimiento: GridColumns = [
    { field: 'tipo', headerName: 'Tipo', flex: 1 },
    { field: 'nombreFuente', headerName: 'Nombre de Fuente', flex: 1 },
    { field: 'caudalConcesionado', headerName: 'Caudal Concesionado', flex: 1 },
    { field: 'sistemaMedicionAguaCaptada', headerName: 'Sistema de Medición', flex: 1 },
    { field: 'cordenadaX', headerName: 'Coordenada X', flex: 1 },
    { field: 'cordenadaY', headerName: 'Coordenada Y', flex: 1 },
  ];


  const columnsCaptacionesMensualesAgua: GridColumns = [
    { field: 'periodoUso', headerName: 'Periodo de Uso', flex: 1 },
    { field: 'tiempoUso', headerName: 'Tiempo de Uso', flex: 1 },
    { field: 'caudalUtilizado', headerName: 'Caudal Utilizado', flex: 1 },
    { field: 'volumenAguaCaptada', headerName: 'Volumen de Agua Captada', flex: 1 },
    {
      field: 'mes',
      headerName: 'Mes',
      flex: 1,
      renderCell: (params) => GetNombreMes(params.value as number), // Utiliza la función para renderizar el nombre del mes
    },
  ];

  const columnsFactoresUtilizacion: GridColumns = [
    { field: 'factor', headerName: 'Factor', flex: 1 },
    { field: 'valor', headerName: 'Valor', flex: 1 },
    { field: 'consumo', headerName: 'Consumo', flex: 1 },
  ];

  const rowsFactoresUtilizacion = [
    { id: uuidv4(), factor: 'Número de Usuarios', valor: data_r.factoresUtilizacion.numeroUsuarios, consumo: data_r.factoresUtilizacion.consumoNumeroUsuarios },
    { id: uuidv4(), factor: 'Número de Bovinos', valor: data_r.factoresUtilizacion.numeroBovinos, consumo: data_r.factoresUtilizacion.consumoNumeroBovinos },
    { id: uuidv4(), factor: 'Número de Porcinos', valor: data_r.factoresUtilizacion.numeroPorcinos, consumo: data_r.factoresUtilizacion.consumoNumeroPorcinos },
    { id: uuidv4(), factor: 'Número de Hectáreas', valor: data_r.factoresUtilizacion.numeroHectareas, consumo: data_r.factoresUtilizacion.consumoNumeroHectareas },
  ];


  return (
    <div>
      <Button color="primary" onClick={handleDialogOpen}>
        <VisibilityIcon />
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Title title=" Información del Documento " />
        </DialogTitle>
        <DialogContent style={{ overflowY: 'auto' }}>

          <Grid container alignItems="center" justifyContent="center" spacing={2}>

            <Grid item xs={10}>
              {/* 
              <p>
                <strong>Aprobado:</strong>{" "}
                {data_r.aprobado ? (
                  <CheckCircleIcon style={{ color: "green" }} />
                ) : (
                  <CancelIcon style={{ color: "red" }} />
                )}
              </p> */}

            </Grid>
            {data_r.aprobado === false && (<>


              <Grid item xs={2}>

                <Button
                  startIcon={<CheckIcon />}
                  style={{ width: "90%", marginTop: 15 }}
                  color="success" // Cambia el color según si es una actualización o creación
                  fullWidth
                  variant="contained"
                  onClick={handleActivateClick}

                >
                  Aprobar
                </Button>

              </Grid>



            </>)}

            <Grid item xs={5} >

              <p><strong>NIT:</strong> {data_r.nit}</p>
              <p><strong>Fax:</strong> {data_r.fax}</p>
              <p><strong>Cédula o CC:</strong> {data_r.cc}</p>
              {/* <p><strong>Aprobado:</strong> {data_r.aprobado ? 'Sí' : 'No'}</p> */}
              <p><strong>Otro Tipo:</strong> {data_r.otrotipo}</p>
              <p><strong>Teléfono:</strong> {data_r.telefono}</p>
              <p><strong>Municipio:</strong> {data_r.municipio}</p>
              <p><strong>Expediente:</strong> {data_r.expediente}</p>
              <p><strong>Razón Social:</strong> {data_r.razonSocial}</p>
            </Grid>
            <Grid item xs={5}>
              <p><strong>Tipo Usuario:</strong> {data_r.tipoUsuario}</p>
              <p><strong>Código CIIU:</strong> {data_r.codigoCIIU}</p>
              <p><strong>Dirección:</strong> {data_r.direccion}</p>
              <p><strong>Fecha Creación:</strong> {new Date(data_r.fechaCreacion).toLocaleDateString()}</p>
              <p><strong>Número de Concesión:</strong> {data_r.numConcesion}</p>
              <p><strong>Actividad Económica:</strong> {data_r.actividadEconomica}</p>
              <p><strong>Nombre Representante Legal:</strong> {data_r.nombreRepresentanteLegal}</p>




            </Grid>

            <Grid item xs={10}>
              <Title title=" Informacion de Fuentes de Abastecimiento " />
              <DataGrid
                density="compact"
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[10]}
                columns={columnsFuentesAbastecimiento ?? []}
                rows={data_r.informacionFuentesAbastecimiento || []}
                getRowId={() => uuidv4()}
              />
            </Grid>

            <Grid item xs={8}>
              <Title title=" Factores de Utilización " />
              <DataGrid
                density="compact"
                autoHeight
                pageSize={8}
                rowsPerPageOptions={[8]}
                columns={columnsFactoresUtilizacion ?? []}
                rows={rowsFactoresUtilizacion}
                getRowId={(row) => row.id}
              />
            </Grid>

            <Grid item xs={9}>
              <Title title=" Captaciones Mensuales de Agua " />
              <DataGrid
                density="compact"
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[10]}
                columns={columnsCaptacionesMensualesAgua ?? []}
                rows={data_r.captacionesMensualesAgua || []}
                getRowId={() => uuidv4()}
              />
            </Grid>



          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
            <Button
              startIcon={<ClearIcon />}
              fullWidth
              style={{ width: "90%", marginTop: 15 }}
              variant="contained"
              color="error"
              onClick={handleDialogClose} >
              Cerrar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};
