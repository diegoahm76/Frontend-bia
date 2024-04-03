/* eslint-disable array-callback-return */
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Title } from '../../../../components/Title';
import { useAppDispatch } from '../../../../hooks';
import { obtener_bienes_viveros } from '../../dashBoardViveros/thunks/DashBoardViveros';
import { obtiene_plantas_por_vivero } from '../thunks/SubsistemaConservacion';
import { download_xls_dos } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf_dos } from '../../../../documentos-descargar/PDF_descargar';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  vivero: any;
  seleccion_planta: any;
  reporte: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarPlantas = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [seleccion_planta, set_seleccion_planta] = useState<any | null>(null);
  const [data_plantas, set_data_plantas] = useState<any[]>([]);
  const [data_filtrada, set_data_filtrada] = useState<any[]>([]);
  const [nombre, set_nombre] = useState<string>('');
  const [año_lote, set_año_lote] = useState<string>('');
  const [numero_lote, set_numero_lote] = useState<string>('');
  const [tamaño_col, set_tamaño_col] = useState<number>(12);

  useEffect(() => {
    //  console.log('')(props);
    if (props.reporte === 'EL') {
      set_tamaño_col(3);
      dispatch(obtiene_plantas_por_vivero(props.vivero)).then(
        (response: any) => {
          response.data.map((resp: any, index: number) => {
            resp.id = index;
          });
          set_data_plantas(response.data);
          set_data_filtrada(response.data);
        }
      );
    } else if (props.reporte === 'MHIS' || props.reporte === 'DDEV') {
      dispatch(obtener_bienes_viveros({ seleccion_tipo_bien: '' })).then(
        (response: any) => {
          response.data.map((resp: any, index: number) => {
            resp.id = index;
          });
          set_data_plantas(response.data);
          set_data_filtrada(response.data);
        }
      );
    } else {
      set_tamaño_col(6);
      dispatch(obtener_bienes_viveros({ seleccion_tipo_bien: 'PL' })).then(
        (response: any) => {
          response.data.map((resp: any, index: number) => {
            resp.id = index;
          });
          set_data_plantas(response.data);
          set_data_filtrada(response.data);
        }
      );
    }
  }, []);

  const cambio_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  };
  const cambio_año_lote: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_año_lote(e.target.value);
  };
  const cambio_numero_lote: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_numero_lote(e.target.value);
  };

  const buscar_bien = (): void => {
    let data_filter: any = [...data_plantas];
    if (nombre === '' && props.reporte !== 'EL') {
      set_data_filtrada(data_plantas);
      return;
    }
    if (nombre !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.nombre.toLowerCase().includes(nombre.toLowerCase())
        ),
      ];
    if (props.reporte === 'EL') {
      if (nombre === '' && año_lote === '' && numero_lote === '') {
        set_data_filtrada(data_plantas);
        return;
      }
      if (año_lote !== '' && props.reporte === 'EL')
        data_filter = [
          ...data_filter.filter((da: any) =>
            da.agno_lote.toString().toLowerCase().includes(año_lote)
          ),
        ];
      if (numero_lote !== '' && props.reporte === 'EL')
        data_filter = [
          ...data_filter.filter((da: any) =>
            da.nro_lote.toString().toLowerCase().includes(numero_lote)
          ),
        ];
    }
    set_data_filtrada(data_filter);
  };

  const seleccionar_bien = (): void => {
    props.seleccion_planta(seleccion_planta);
    props.set_is_modal_active(false);
  };
  const columnsss = [
    {
      field: 'nombre',
      header: 'Nombre',
      style: { width: '8%' },
    },
    {
      field: 'agno_lote',
      header: 'Año lote',
      style: { width: '8%' },
      show: props.reporte === 'EL', // Mostrar solo si el reporte es 'EL'
    },
    {
      field: 'nro_lote',
      header: 'N° lote',
      style: { width: '8%' },
      show: props.reporte === 'EL', // Mostrar solo si el reporte es 'EL'
    },
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.is_modal_active}
      onClose={() => {
        props.set_is_modal_active(false);
      }}
    >
       <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
                    <Title title={`${props.title}`} />
                </Grid>
      <DialogTitle> </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={tamaño_col}>
                  <TextField
                    label="Nombre"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={nombre}
                    onChange={cambio_nombre}
                  />
                </Grid>
                {props.reporte === 'EL' && (
                  <Grid item xs={12} sm={tamaño_col}>
                    <TextField
                      label="Año lote"
                      helperText=" "
                      size="small"
                      fullWidth
                      value={año_lote}
                      onChange={cambio_año_lote}
                    />
                  </Grid>
                )}
                {props.reporte === 'EL' && (
                  <Grid item xs={12} sm={tamaño_col}>
                    <TextField
                      label="Numero lote"
                      helperText=" "
                      size="small"
                      fullWidth
                      value={numero_lote}
                      onChange={cambio_numero_lote}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={tamaño_col}>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={buscar_bien}
                    >
                      Buscar
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Title title="Resultados" />
                <Box sx={{ width: '100%', mt: '20px' }}>
                  <ButtonGroup
                    style={{
                      margin: 7,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {download_xls_dos({
                      nurseries: data_filtrada,
                      columns: columnsss,
                    })}
                    {download_pdf_dos({
                      nurseries: data_filtrada,
                      columns: columnsss,
                      title: 'Resultados',
                    })}
                  </ButtonGroup>
                  <div className="card">
                    <DataTable
                      value={data_filtrada}
                      sortField="año_lote"
                      stripedRows
                      paginator
                      rows={5}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '50rem' }}
                      selectionMode="single"
                      selection={seleccion_planta}
                      onSelectionChange={(e) => {
                        set_seleccion_planta(e.value);
                      }}
                      dataKey="id"
                    >
                      <Column
                        field="nombre"
                        header="Nombre"
                        style={{ width: '8%' }}
                      ></Column>
                      {props.reporte === 'EL' && (
                        <Column
                          field="agno_lote"
                          header="Año lote"
                          style={{ width: '8%' }}
                        ></Column>
                      )}
                      {props.reporte === 'EL' && (
                        <Column
                          field="nro_lote"
                          header="N° lote"
                          style={{ width: '8%' }}
                        ></Column>
                      )}
                    </DataTable>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={() => {
            props.set_is_modal_active(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="success"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={seleccionar_bien}
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default BuscarPlantas;
