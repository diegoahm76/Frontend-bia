/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, Stack, TextField } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { control_error } from '../../../../helpers/controlError';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from 'dayjs/locale/es'; // si deseas cambiar el idioma a español
import type { Datos } from '../interfaces/interfaces';
import { api } from '../../../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller } from 'react-hook-form';
import { consultar_datos_mes } from '../../requets/Request';
import Select from "react-select";
import dayjs from 'dayjs';
import { Title } from '../../../../components/Title';

const columns: GridColDef[] = [
    { field: 'fecha_registro', headerName: 'FECHA REGISTRO', width: 170 },
    { field: 'temperatura_ambiente', headerName: 'TEMPERATURA ', width: 170 },
    { field: 'humedad_ambiente', headerName: 'HUMEDAD ', width: 170 },
    { field: 'presion_barometrica', headerName: 'PRESIÓN BAROMETRICA', width: 170 },
    { field: 'velocidad_viento', headerName: 'VEL. VIENTO', width: 140 },
    { field: 'direccion_viento', headerName: 'DIR. VIENTO', width: 170 },
    { field: 'precipitacion', headerName: 'PRECIPITACIÓN', width: 170 },
    { field: 'luminosidad', headerName: 'LUMINOSIDAD', width: 170 },
    { field: 'nivel_agua', headerName: 'NIVEL AGUA', width: 170 },
    { field: 'velocidad_agua', headerName: 'VEL. AGUA', width: 170 },
    { field: 'id_estacion', headerName: 'NÚMERO ESTACIÓN', width: 170 },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialDeDatos: React.FC = () => {
    const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        handleSubmit,
        control: control_filtrar,
        formState: { errors: errors_filtrar },
    } = useForm();

    const [loading, set_loading] = useState(false);
    const [estaciones_options, set_estaciones_options] = useState([]);
    const [selected_date, set_selected_date] = useState<Date | null>(new Date());
    const [dato, set_dato] = useState<Datos[]>([]);

    const get_data_initial = async (): Promise<void> => {
        try {
            set_loading(true);
            const { data } = await api.get('/estaciones/consultar-estaciones/');
            const estaciones_maped = data.data.map((estacion: { nombre_estacion: string; id_estacion: number | string; }) => ({
                label: estacion.nombre_estacion,
                value: estacion.id_estacion,
            }));
            set_estaciones_options(estaciones_maped);
            set_loading(false);
        } catch (err) {
            control_error(err);
            set_loading(false);
        }
    };

    useEffect(() => {
        void get_data_initial();
    }, []);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_date_change = (date: Date | null) => {
        set_selected_date(date);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const submit_historial_datos = async (data: any) => {
        try {
            set_loading(true);
            const estacion_id = data.estacion.value;
            const fecha = dayjs(selected_date).format('YYYY-MM');
            console.log("fecha", fecha)
            const estacion = await consultar_datos_mes(estacion_id, fecha);
            const datos_mapeados = estacion.map((dato) => ({
                id_data: dato.id_data,
                fecha_registro: dato.fecha_registro,
                temperatura_ambiente: dato.temperatura_ambiente,
                humedad_ambiente: dato.humedad_ambiente,
                presion_barometrica: dato.presion_barometrica,
                velocidad_viento: dato.velocidad_viento,
                direccion_viento: dato.direccion_viento,
                precipitacion: dato.precipitacion,
                luminosidad: dato.luminosidad,
                nivel_agua: dato.nivel_agua,
                velocidad_agua: dato.velocidad_agua,
                id_estacion: dato.id_estacion,
            }));
            set_dato(datos_mapeados); // guardar el valor en el estado
            set_loading(false);
        } catch (err) {
            console.log("Excepción en traer_dato:", err);
            control_error(err);
            set_loading(false);
        }
    };

    return (
        <Grid container spacing={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}>
            <Grid item xs={12}>
                <Box component="form" onSubmit={handleSubmit(submit_historial_datos)}>
                    <Stack sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                <DatePicker
                                    label="Mes"
                                    inputFormat="YYYY/MM"
                                    openTo="month"
                                    views={['year', 'month']}
                                    value={selected_date}
                                    onChange={handle_date_change}
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl fullWidth>
                            <Controller
                                name="estacion"
                                control={control_filtrar}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={estaciones_options}
                                        placeholder="Seleccionar"
                                    />
                                )}
                            />
                            {errors_filtrar.estacion != null && (
                                <FormHelperText error>
                                    Seleccione una estación para continuar
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={loading}
                                className="search-button text-capitalize rounded-pill"
                                startIcon={
                                    loading
                                        ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                        : <SearchIcon />
                                }
                                aria-label="Buscar "
                                size="large"
                            >
                                Buscar
                                {loading ? '' : ""}
                            </Button>
                        </FormControl>
                    </Stack>
                </Box>
                {dato.length > 0 ? (
                    <>
                        <Grid
                            item

                            className={`border px-4 text-white fs-5 p-1`}
                            sx={{
                                display: 'grid',
                                background:
                                    'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
                                width: '100%',
                                height: '40px',

                                borderRadius: '10px',
                                pl: '20px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                alignContent: 'center',
                            }}
                        >
                            <Title title="HISTORIAL "></Title>
                        </Grid>
                        <DataGrid
                            autoHeight
                            rows={dato}
                            columns={columns}
                            getRowId={(row) => row.id_data}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </>
                ) : ""}

            </Grid>
        </Grid>
    );
}      