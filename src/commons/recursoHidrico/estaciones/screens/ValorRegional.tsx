/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { control_error } from '../../../../helpers';
import SearchIcon from '@mui/icons-material/Search';
import { control_success } from '../../requets/Request';
import { useEffect, useState, SetStateAction } from 'react';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { miEstilo } from '../../../gestorDocumental/Encuesta/interfaces/types';
import {
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import CalculateIcon from '@mui/icons-material/Calculate';


// eslint-disable-next-line @typescript-eslint/naming-convention
interface DataRow {
  id_sub_zona_hidrica: number;
  id_zona_hidrica_macrocuenca: number;
  valor_regional_tua: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  id_zona_hidrica: number;
  id_tipo_zona_hidrica: number;
  id_tipo_agua_zona_hidrica: number | null;
  codigo_rio: number;
  nuevo_dato?: string;
  nombre_zona_hidirca: any;
  nombre_sub_zona_hidrica: any;
  nombre_zona_hidrica_macrocuenca: any;
}

export const ValorRegional: React.FC = () => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [sumaVariables, setSumaVariables] = useState<number>(0);
  const [valor_regional, setvalor_regional] = useState<any>('');
  const [fecha_inicio, setfecha_inicio] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [variable_ce, setvariable_ce] = useState<any>('');
  const [variable_ck, setvariable_ck] = useState<any>('');
  const [variable_cs, setvariable_cs] = useState<any>('');
  const [variable_cu, setvariable_cu] = useState<any>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fecha_fin, setfecha_fin] = useState<string>('');
  const [data, setData] = useState<DataRow[]>([]);

  const handle_close = (): void => {
    setvalor_regional('');
    setIsModalOpen(false);
    setvariable_ce('');
    setvariable_ck('');
    setvariable_cs('');
    setvariable_cu('');
  };

  const calcularOperacion = () => {
    const ce = Number(variable_ce);
    const ck = Number(variable_ck);
    const cs = Number(variable_cs);
    const cu = Number(variable_cu);
    const resultado = (1 + (ck + ce) * cs) * cu;
    setvalor_regional(resultado.toString());
  };

  const actualizarValorRegional = async () => {
    try {
      const response = await api.put(
        `/hidrico/zonas-hidricas/sub_zona_hidrica/update/${editingRow}/`,
        {
          // valor_regional_tua: '12',
          // valor_regional_tr: '2',
          ...(opcionSeleccionada === '1'
            ? { valor_regional_tua: valor_regional }
            : {}),
          ...(opcionSeleccionada === '2'
            ? { valor_regional_tr: valor_regional }
            : {}),

          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        }
      );
      console.log('Respuesta del servidor:', response.data);
      control_success('Valor regional agregado  ');
      fetchData();
      setIsModalOpen(false);

      // Aquí puedes agregar lógica adicional después de la actualización exitosa
    } catch (error: any) {
      console.error('Error al actualizar el valor regional:', error);
      control_error(error.response.data.detail);
    }
  };
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const columns = [
    //  { field: 'id_sub_zona_hidrica', headerName: '   id_sub_zona_hidrica  ', width: 130, flex: 1 },

    {
      field: 'nombre_zona_hidrica_macrocuenca',
      headerName: ' Zona hidrica macrocuenca  ',
      width: 130,
      flex: 1,
    },
    {
      field: 'nombre_zona_hidirca',
      headerName: ' Zona hidirca  ',
      width: 130,
      flex: 1,
    },
    {
      field: 'nombre_sub_zona_hidrica',
      headerName: ' Zub zona hidrica  ',
      width: 130,
      flex: 1,
    },
    { field: 'codigo_rio', headerName: 'Codigo rio  ', width: 130, flex: 1 },
    {
      field:
        opcionSeleccionada === '1' ? 'valor_regional_tua' : 'valor_regional_tr',
      headerName:
        opcionSeleccionada === '1'
          ? 'Factor regional TUA'
          : 'Factor regional TR',
      width: 130,
      flex: 1,
    },
    {
      field: 'fecha_inicio',
      headerName: 'Fecha de inicio   ',
      width: 130,
      flex: 1,
    },
    { field: 'fecha_fin', headerName: 'Fecha de fin', width: 130, flex: 1 },

    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Editar"
            onClick={() => {
              setEditingRow(params.row.id_sub_zona_hidrica),
                setIsModalOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      //   const urltua = `/hidrico/zonas-hidricas/data_rios_completa/tua/`;
      //   const urltr = `/hidrico/zonas-hidricas/data_rios_completa/tr/`;
      let url: any;
      if (opcionSeleccionada === '1') {
        url = `/hidrico/zonas-hidricas/data_rios_completa/tua/`;
      } else if (opcionSeleccionada === '2') {
        url = `/hidrico/zonas-hidricas/data_rios_completa/tr/`;
      }
      // const url = await api.get('/hidrico/zonas-hidricas/data_rios_completa/tua/');
      const res = await api.get(url);
      const data = res.data.data;
      setData(data);
      control_success(`Datos encontrados   `);

      // setData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [opcionSeleccionada]);

  const handleSearch = (): void => {
    if (!searchTerm.trim()) {
      fetchData();
      return;
    }
    const filteredEncuestas = data.filter((encuesta) =>
      encuesta.nombre_sub_zona_hidrica
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setData(filteredEncuestas);
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setOpcionSeleccionada(event.target.value);
  };

  return (
    <>
      {/* <div>
                <button onClick={handleClick}>consola  </button>
            </div> */}
      <Grid
        container
        item
        xs={12}
        spacing={2}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        sx={miEstilo}
      >
        <Title title="Factor regional TUA / TR " />

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} marginTop={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="opcion-select-label">Factor regional</InputLabel>
              <Select
                labelId="Plantilla"
                value={opcionSeleccionada}
                label="Factor regional"
                onChange={handleChange}
              >
                <MenuItem value="1">Factor regional TUA </MenuItem>
                <MenuItem value="2">Factor regional TR </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      {opcionSeleccionada === '' ? (
        <></>
      ) : (
        <Grid
          container
          item
          xs={12}
          spacing={2}
          marginLeft={2}
          marginRight={2}
          marginTop={3}
          sx={miEstilo}
        >
          <Dialog
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            open={isModalOpen}
            onClose={handle_close}
            maxWidth="xl"
          >
            <Grid
              container
              spacing={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid item xs={12} sm={12}>
                <Title title="Ingresar factor  regional    " />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  name="fecha_inicio"
                  variant="outlined"
                  label="fecha inicio"
                  value={fecha_inicio}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setfecha_inicio(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  name="fecha_fin"
                  variant="outlined"
                  label="fecha fin"
                  value={fecha_fin}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setfecha_fin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  label="Ce"
                  size="small"
                  fullWidth
                  value={variable_ce}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value))
                      setvariable_ce(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  label="Ck"
                  size="small"
                  fullWidth
                  value={variable_ck}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value))
                      setvariable_ck(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  label="Cs"
                  size="small"
                  fullWidth
                  value={variable_cs}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value))
                      setvariable_cs(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  label="Cu"
                  size="small"
                  fullWidth
                  value={variable_cu}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value))
                      setvariable_cu(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    label="Factor regional"
                    size="small"
                    disabled
                    fullWidth
                    value={valor_regional}
                    onChange={(e) => setvalor_regional(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Button
                    startIcon={<CalculateIcon />}
                    variant="contained"
                    color="primary"
                    onClick={calcularOperacion}
                  >
                    calcular
                  </Button>
                </Grid>
                {/* {sumaVariables} */}

                <Grid item>
                  <Button
                    color="success"
                    variant="contained"
                    fullWidth
                    disabled={!valor_regional && valor_regional=== "0"}
                    startIcon={<SaveIcon />}
                    onClick={actualizarValorRegional}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Dialog>
          <Title title="Factor regional recurso hídrico " />

          <Grid item xs={12} marginTop={2} sm={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Nombre sub zona hidrica"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          {/* <button onClick={calcularOperacion}>Calcular Operación</button> */}

          <Grid item marginTop={2} marginLeft={2} xs={12} sm={1.5}>
            <Button
              startIcon={<SearchIcon />}
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Grid>

          <RenderDataGrid
            title="Factor regional"
            columns={columns ?? []}
            rows={data.filter(
              (config) => config.nombre_zona_hidrica_macrocuenca === 'Orinoco'
            )}
          />
          {/* <Grid item xs={12} sm={12} marginTop={2}>
      <DataGrid
        autoHeight
        pageSize={10}
        // rows={data}
        columns={columns}
        getRowId={(row) => row.codigo_rio}
        rows={data.filter(
          (config) => config.nombre_zona_hidrica_macrocuenca === 'Orinoco'
        )}
      />
    </Grid> */}
        </Grid>
      )}
      {opcionSeleccionada === '' ? <>{/* R */}</> : null}
    </>
  );
};
