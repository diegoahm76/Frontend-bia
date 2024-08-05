/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { Grid, Box, TextField, Stack, Button, Chip, IconButton, ButtonGroup } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Dialog } from '@mui/material';
import { Obligacion, ObligacionesUsuario } from '../../interfaces/interfaces';
import { Title } from '../../../../../components/Title';
import CloseIcon from '@mui/icons-material/Close';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  }
}
interface BuscarProps {
  is_modal_active: any;
  set_is_modal_active: any;
}

export const ModalVerObligaciones: React.FC<BuscarProps> = ({ is_modal_active, set_is_modal_active }) => {

  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);
  const [lista_obligaciones, set_lista_obligaciones] = useState(Array<Obligacion>)

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No. Obligación',
      width: 80,
      renderCell: (params) => (
        <Chip label={params.getValue(params.id, 'id')} />
      ),
    },
    {
      field: 'nombre',
      headerName: 'Tipo de renta',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'inicio',
      headerName: 'Fecha Inicio',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'nro_expediente',
      headerName: 'Expediente',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_resolucion',
      headerName: 'Nro Resolución',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'monto_inicial',
      headerName: 'Valor Capital',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'valor_intereses',
      headerName: 'Valor Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'dias_mora',
      headerName: 'Días Mora',
      width: 100,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'calculo_interes_mora',
      headerName: 'Interés por Mora',
      width: 180,
      renderCell: (params) => {
        const interes = params.row.valor_intereses * 0.0007; // 0.07% de valor_intereses
        const interesMora = interes * params.row.dias_mora;
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "COP",
            }).format(interesMora)}
          </div>
        );
      },
    },
  ];
  const handle_closee = (): void => {
    set_is_modal_active(false);
    set_lista_obligaciones([]);
  };

  useEffect(() => {
    set_lista_obligaciones(obligaciones.obligaciones.map((item, index) => ({ ...item, id: index + 1 })))
  }, [obligaciones.obligaciones])

  return (
    <>
      <Dialog open={is_modal_active} onClose={handle_closee} maxWidth="xl">
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
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <Title title='Listado de pagos pendientes' />
            </Grid>

          </Grid>

          {
            lista_obligaciones.length !== 0 ? (
              <Grid item xs={12}>
                <Grid item>
                  <Box sx={{ width: '100%' }}>
                    <p>
                      El usuario {obligaciones.nombre_completo} con identificación {obligaciones.numero_identificacion} tiene las siguientes {lista_obligaciones.length} obligaciones pendientes de pago:
                    </p>
                    <ButtonGroup
                      style={{
                        margin: 7,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {download_xls({ nurseries: lista_obligaciones, columns })}
                      {download_pdf({
                        nurseries: lista_obligaciones,
                        columns,
                        title: 'Listado de proyectos',
                      })}
                    </ButtonGroup>
                    <DataGrid
                      autoHeight
                      disableSelectionOnClick
                      rows={lista_obligaciones}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      experimentalFeatures={{ newEditingApi: true }}
                      getRowId={(row) => faker.database.mongodbObjectId()}
                    />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center">
                <p>
                  El usuario {obligaciones.nombre_completo} con identificación {obligaciones.numero_identificacion} no tiene obligaciones pendientes de pago.
                </p>
              </Box>
            )
          }
        </Grid>
      </Dialog>
    </>
  );
}