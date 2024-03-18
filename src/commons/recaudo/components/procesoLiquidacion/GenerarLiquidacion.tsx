/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint no-new-func: 0 */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Typography, FormHelperText } from "@mui/material";
import type { EstadoExpediente, Expediente, FormLiquidacion, RowDetalles } from "../../interfaces/liquidacion";
import SaveIcon from '@mui/icons-material/Save';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import dayjs, { type Dayjs } from "dayjs";
import PrintIcon from '@mui/icons-material/Print';
import { api } from "../../../../api/axios";
import { currency_formatter } from "../../../../utils/functions/getFormattedCurrency";
import { jsPDF } from 'jspdf';
import { useState } from "react";
import { control_error, control_success } from "../../../../helpers";
interface LiquidacionResponse {
    success: boolean;
    detail: string;
    data: {
        rp: number;
        limite_pago: string;
        doc_cobro: string;
        ley: string;
        fecha_impresion: string;
        anio: number;
        cedula: string;
        titular: string;
        representante_legal: string;
        direccion: string;
        telefono: string;
        expediente: string;
        exp_resolucion: string;
        nombre_fuente: string;
        predio: string;
        municipio: string;
        caudal_consecionado: number;
        uso: string;
        fr: number;
        tt: number;
        numero_cuota: string;
        valor_cuota: number;
        codigo_barras: string;
        factor_costo_oportunidad: number;
    };
}
interface IProps {
    form_liquidacion: FormLiquidacion;
    nombre_deudor: string;
    rows_detalles: RowDetalles[];
    expedientes_deudor: Expediente[];
    estado_expediente: EstadoExpediente;
    fecha_liquidacion: dayjs.Dayjs;
    fecha_vencimiento: dayjs.Dayjs;
    id_liquidacion_pdf: string;
    detalles_ciclos: string[];
    periodos: string[];
    tamano_detalles: boolean;
    handle_input_form_liquidacion_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void;
    handle_submit_liquidacion: () => void;
    set_fecha_liquidacion: Dispatch<SetStateAction<dayjs.Dayjs>>;
    set_fecha_vencimiento: Dispatch<SetStateAction<dayjs.Dayjs>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GenerarLiquidacion: React.FC<IProps> = ({
    form_liquidacion,
    nombre_deudor,
    rows_detalles,
    expedientes_deudor,
    estado_expediente,
    fecha_liquidacion,
    fecha_vencimiento,
    id_liquidacion_pdf,
    detalles_ciclos,
    periodos,
    tamano_detalles,
    handle_input_form_liquidacion_change,
    handle_select_form_liquidacion_change,
    handle_submit_liquidacion,
    set_fecha_liquidacion,
    set_fecha_vencimiento,
}: IProps) => {

    const cambio_fecha_liquidacion = (date: Dayjs | null): void => {
        if (date !== null) {
            set_fecha_liquidacion(date);
        }
    };

    const cambio_fecha_vencimiento = (date: Dayjs | null): void => {
        if (date !== null) {
            set_fecha_vencimiento(date);
        }
    };



    const [visor, setVisor] = useState('');

    const generarHistoricoBajas = () => {
        const doc = new jsPDF();
        const anchoPagina = doc.internal.pageSize.width;
        const agregarEncabezado = () => {
            doc.setFontSize(22);
            doc.text("    ", anchoPagina / 2, 20, { align: 'center' });
            doc.setFontSize(12);
        };
        agregarEncabezado();
        doc.setFontSize(12);
        let y = 30;
        setVisor(doc.output('datauristring'));
    };


    const [pdfUrl, setPdfUrl] = useState('');

    const handleOpenPdf = () => {
        // Aquí estableces la URL del PDF que deseas mostrar
        setPdfUrl(`${api.defaults.baseURL}recaudo/liquidaciones/liquidacion-pdf/${id_liquidacion_pdf}/`);
    };


    const [liquidacion, setLiquidacion] = useState<LiquidacionResponse | null>(null);


    const cargarLiquidacion = async (setLiquidacion: React.Dispatch<React.SetStateAction<LiquidacionResponse | null>>) => {
        try {
            const response = await api.get<LiquidacionResponse>(`/recaudo/liquidaciones/liquidacion-pdf_miguel/${id_liquidacion_pdf}/`);

            setLiquidacion(response.data);
            console.log("Datos de liquidación cargados con éxito");
        } catch (error: any) {
            console.error('Error al cargar los datos de liquidación', error);
            // Aquí puedes manejar los errores, por ejemplo, mostrando una alerta
        }
    };
    useEffect(() => {
        cargarLiquidacion(setLiquidacion);
    }, [id_liquidacion_pdf]);

    const [caudalConcesionado, setCaudalConcesionado] = useState('');

    const actualizarCaudalConcesionado = async () => {
        try {
            const response = await api.put(`/recaudo/liquidaciones/liquidacion_update_caudlk/${id_liquidacion_pdf}/`, {
                caudal_consecionado: caudalConcesionado
            });
            console.log('Caudal actualizado con éxito', response.data);
            control_success("Caudal actualizado con éxito");

            // Actualizar la información en la interfaz si es necesario
        } catch (error:any) {
            console.error('Error al actualizar el caudal concedido', error);
            control_error(error.response.data.detail);
        }
    };


    const actualizarLiquidacionBase = async () => {
        try {
            const response = await api.put(`/recaudo/liquidaciones/liquidacion-base/${id_liquidacion_pdf}/`, {
                id_expediente: form_liquidacion.id_expediente,
                fecha_liquidacion: fecha_liquidacion,
                vencimiento: fecha_vencimiento
            });
            console.log('Liquidación base actualizada con éxito', response.data);
            control_success("Liquidación base actualizada con éxito");
    
            // Actualizar la información en la interfaz si es necesario
        } catch (error:any) {
            console.error('Error al actualizar la liquidación base', error);
            control_error(error.response.data.detail);
        }
    };
    return (
        <>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Expediente</InputLabel>
                        <Select
                            label='Expediente'
                            name="id_expediente"
                            value={form_liquidacion.id_expediente}
                            MenuProps={{
                                style: {
                                    maxHeight: 224,
                                }
                            }}
                            onChange={handle_select_form_liquidacion_change}
                        >
                            {expedientes_deudor.map((expediente) => (
                                <MenuItem key={expediente.id} value={expediente.id}>
                                    {expediente.cod_expediente}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Seleccione el expediente</FormHelperText>
                    </FormControl>
                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        label='Deudor'
                        value={nombre_deudor}
                        size="small"
                        fullWidth
                        disabled
                        onChange={handle_input_form_liquidacion_change}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                            <TextField
                                label='Cedula'
                                value={liquidacion?.data.cedula}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                label='telefono'
                                value={liquidacion?.data.telefono}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>
          














              
              
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de liquidación"
                            value={fecha_liquidacion}
                            onChange={(newValue) => { cambio_fecha_liquidacion(newValue); }}
                            inputFormat="DD/MM/YYYY"
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    size="small"
                                    helperText='Ingrese la fecha de liquidación'
                                    {...params}
                                />
                            )}
                            maxDate={dayjs()}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de vencimiento"
                            value={fecha_vencimiento}
                            onChange={(newValue) => { cambio_fecha_vencimiento(newValue); }}
                            inputFormat="DD/MM/YYYY"
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    size="small"
                                    helperText='Ingrese la fecha de vencimiento'
                                    {...params}
                                />
                            )}
                            minDate={dayjs(new Date().setFullYear(new Date().getFullYear() - 1))}
                            maxDate={dayjs(new Date().setFullYear(new Date().getFullYear() + 1))}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Ciclo</InputLabel>
                        <Select
                            label='Ciclo'
                            name="ciclo_liquidacion"
                            value={form_liquidacion.ciclo_liquidacion}
                            MenuProps={{
                                style: {
                                    maxHeight: 224,
                                }
                            }}
                            onChange={handle_select_form_liquidacion_change}
                        >
                            {detalles_ciclos.map((ciclo, index) => (
                                <MenuItem key={index} value={ciclo}>
                                    {ciclo}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Seleccione el ciclo</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Periodo</InputLabel>
                        <Select
                            label='Periodo'
                            name="periodo_liquidacion"
                            value={form_liquidacion.periodo_liquidacion}
                            MenuProps={{
                                style: {
                                    maxHeight: 224,
                                }
                            }}
                            onChange={handle_select_form_liquidacion_change}
                        >
                            {periodos.map((periodo, index) => (
                                <MenuItem key={index} value={periodo}>
                                    {periodo}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Seleccione el periodo</FormHelperText>
                    </FormControl>
                </Grid>
          
         


               
                    <>

    <Grid item xs={12} sm={4}>
                            <TextField
                                label='Año'
                                value={liquidacion?.data.anio}
                                size="small"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled
                            />
                        </Grid>
                     
                    


                        <Grid item xs={12} sm={4}>
                            <TextField
                                label='direccion'
                                value={liquidacion?.data.direccion}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>


                        <Grid item xs={12} sm={4}>
                            <TextField
                                label='Representante legal'
                                value={liquidacion?.data.representante_legal}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                label='predio'
                                value={liquidacion?.data.predio}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>




                      
                    </>

           
            
                    <> 
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Caudal Concesionado"
                                 size="small"

                                fullWidth
                                value={caudalConcesionado}
                                onChange={(e) => setCaudalConcesionado(e.target.value)}
                            />
                        </Grid>
                        <Grid item >
                            <Button variant="contained" color="success" onClick={actualizarCaudalConcesionado}>
                                Actualizar Caudal
                            </Button>
                        </Grid>
                        <Grid item  >
                            <Button variant="contained" color="success" onClick={actualizarLiquidacionBase}>
                                actualizar fecha 
                            </Button>
                        </Grid>

                    </>
                





            </Grid>
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    py: '20px'
                }}
            >
                <Typography color='black' variant="h4">Total de la obligacion</Typography>
                <Typography color='green' variant="h4" sx={{ textAlign: 'center' }}>{currency_formatter(form_liquidacion.valor ?? 0, 0)}</Typography>
            </Grid>

            <Grid container justifyContent={'center'} spacing={3}>
                {estado_expediente?.toLowerCase() === 'activo' && (
                    <Grid item xs={12} sm={3}>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            fullWidth
                            disabled={
                                form_liquidacion.id_deudor === '' ||
                                form_liquidacion.id_expediente === '' ||
                                fecha_liquidacion.toString() === '' ||
                                fecha_vencimiento.toString() === '' ||
                                form_liquidacion.periodo_liquidacion === '' ||
                                rows_detalles.length === 0 ||
                                tamano_detalles
                            }
                            onClick={handle_submit_liquidacion}
                        >
                            Guardar
                        </Button>
                    </Grid>
                )}
                {estado_expediente?.toLowerCase() === 'guardado' && (
                    <>
                        <Grid item xs={12} sm={3}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                startIcon={<PrintIcon />}
                                href={`${api.defaults.baseURL}recaudo/liquidaciones/liquidacion-pdf/${id_liquidacion_pdf}/`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Imprimir recibo
                            </Button>
                        </Grid>
                        {id_liquidacion_pdf}
                        {/* {id_liquidacion_pdf} */}

                        {/* <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    startIcon={<PrintIcon />}
                    onClick={handleOpenPdf}
                  >
                    Imprimir recibo
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {/* Aquí es donde se mostrará el PDF */}
                        {/* pdfUrl && (
                    <iframe
                      src={pdfUrl}
                      width="100%"
                      height="600px"
                    />
                  )
                </Grid>
              </Grid> */}
                        {/* </div> */}








                        <Grid item xs={12} sm={3}>
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<RequestQuoteIcon />}
                                fullWidth
                            >
                                Liquidar
                            </Button>
                        </Grid>
                    </>
                )}
                {estado_expediente?.toLowerCase() === 'liquidado' && (
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h5" color={'green'} sx={{ textAlign: 'center', mb: '20px' }}>Expediente ya liquidado</Typography>
                    </Grid>
                )}
            </Grid>






        </>
    )
}
