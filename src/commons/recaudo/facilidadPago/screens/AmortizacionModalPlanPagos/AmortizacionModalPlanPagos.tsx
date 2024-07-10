
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, TextField, Stack, Button, Dialog, ButtonGroup, Select, MenuItem } from '@mui/material';
import { DataGrid, GridRenderCellParams, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Obligacion, TablasAmortizacion } from '../../interfaces/interfaces';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from "@mui/icons-material/Clear";
import { v4 as uuidv4 } from 'uuid';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { Title } from '../../../../../components/Title';
import { Add } from '@mui/icons-material';

interface RootState {
    plan_pagos: {
        plan_pagos: TablasAmortizacion;
    }
}
interface Abono {
    [key: string]: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AmortizacionModalPlanPagos: React.FC = () => {
    const datosPrueba: Obligacion[] = [
        {
            id: 1,
            nombre: "Obligación 1",
            monto_inicial: "18446000",
            InteresMoratorio_c: "500",
            valor_capital_intereses_c: "10500",
            inicio: "2023-01-01",
            dias_mora: 2019,
            nro_expediente: 12345,
            nro_resolucion: "RES-123",
            valor_intereses: "12411158",
            valor_capital_intereses: 30860158,
            num_resolucion:"aaa"
        },
        {
            id: 2,
            nombre: "Obligación 2",
            monto_inicial: "18446000",
            InteresMoratorio_c: "500",
            valor_capital_intereses_c: "10500",
            inicio: "2023-01-01",
            dias_mora: 2019,
            nro_expediente: 12345,
            nro_resolucion: "RES-123",
            valor_intereses: "12411158",
            valor_capital_intereses: 30860158,
            num_resolucion:"aaa"

        },
    ];

    const [lista, set_lista] = useState<Obligacion[]>(datosPrueba);
    const { plan_pagos } = useSelector((state: RootState) => state.plan_pagos);
    const { deudores } = useSelector((state: any) => state.deudores);
    const [saldoCapital, setSaldoCapital] = useState<number | undefined>(0); // Inicializado con 0 o undefined^M
    const [valoresAbonados, setValoresAbonados] = useState<Abono>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log("valoresxxxx:", valoresAbonados)





    const sumarValoresAbonados = (valoresAbonados: Abono) => {
        let suma = 0;
        for (const key in valoresAbonados) {
            if (key !== 'valor_abonado') {
                suma += parseFloat(valoresAbonados[key]);
            }
        }
        return parseFloat(suma.toFixed(2));
    };

    const valor_total = 5400000;
    const sumaTotal = sumarValoresAbonados(valoresAbonados);
    // const SaldoRestante = sumaTotal - deudores.valor_abonado;
    const SaldoRestante = sumaTotal - valor_total;

    const handleValorAbonadoChange = (event: any, fieldName: string, fieldId: string) => {
        const newValue = event.target.value;
        setValoresAbonados(prevState => ({
            ...prevState,
            [fieldId]: newValue
        }))
    };

    const [valoresSeleccionados, setValoresSeleccionados] = useState<any>({});
    console.log("valoresSeleccionados", valoresSeleccionados)
    const handleSeleccionChange = (event: React.ChangeEvent<{ value: unknown }>, fieldName: string) => {
        const { value } = event.target;
        setValoresSeleccionados((prevState: any) => ({
            ...prevState,
            [fieldName]: value as string // Asegúrate de castear 'value' al tipo correcto si es necesario
        }));
    };

    console.log("xxxxxxxxxxxxxxxxx", SaldoRestante)


    const columns: GridColDef[] = [
        {
            field: 'selec',
            headerName: 'Tipo Cobro',
            flex: 2,
            renderCell: (params) => (
                <Select
                    value={valoresSeleccionados[`selec_${params.id}`] || ''}
                    onChange={(event: any) => handleSeleccionChange(event, `selec_${params.id}`)}
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="opcion1">MULTAS Y/O VISITAS</MenuItem>
                    <MenuItem value="opcion2">TUA - TR </MenuItem>
                </Select>
            ),
        },
        {
            field: 'monto_inicial',
            headerName: 'Valor Capital',
            flex: 1,
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
            headerName: 'Intereses',
            flex: 1,
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
            field: 'valor_capital_intereses',
            headerName: 'Capital + Intereses',
            flex: 1,
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
            field: 'valor_abonado',
            headerName: 'Valor Abonado 60%',
            width: 250,
            renderCell: (params) => {

                const handleAbonoButtonClick = () => {

                    // const valor_abonado_inicial = deudores.valor_abonado;
                    const valor_abonado_inicial = valor_total;

                    const valor_capital = params.row.monto_inicial;

                    const respuesta = valor_capital / params.row.valor_capital_intereses;


                    console.log("respuesta", respuesta)


                    let total = Math.round(valor_abonado_inicial * respuesta);



                    console.log("total", total)

                    // Verifica si total es mayor que valorColumna1
                    if (total > params.row.valor_capital_intereses) {
                        total = params.row.valor_capital_intereses;
                    }
                    console.log("valor_capital", valor_capital)


                    // Calcula el saldo restante después de restar el total abonado
                    const saldoRestanteDespuesAbono = SaldoRestante + total;
                    console.log("aaaa", saldoRestanteDespuesAbono)
                    console.log("eeee", total)
                    console.log("iiii", SaldoRestante)




                    // Si el saldo restante después del abono es menor que cero, muestra el saldo restante original
                    const saldoAMostrar = saldoRestanteDespuesAbono > 0 ? SaldoRestante : total;

                    // Convierte SaldoRestante a positivo si es negativo
                    const saldoPositivo = Math.abs(saldoAMostrar);



                    handleValorAbonadoChange({ target: { value: saldoPositivo } }, 'valor_abonado', `valor_abonado_${params.id}`);
                };

                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            required
                            label="Valor Abonado"
                            size="small"
                            fullWidth
                            type='number'
                            key={`valor_abonado_${params.id}`}
                            id={`valor_abonado_${params.id}`}
                            value={valoresAbonados[`valor_abonado_${params.id}`] || ''}
                            onChange={(event) => handleValorAbonadoChange(event, 'valor_abonado', `valor_abonado_${params.id}`)}
                        />
                        <Button
                            variant="outlined"
                            disabled={-SaldoRestante <= 0}
                            onClick={handleAbonoButtonClick}>
                            <MonetizationOnOutlinedIcon />
                        </Button>
                    </div>
                );
            },
        },


        {
            field: 'porcentaje_abonado',
            headerName: '% del Abono Total',
            flex: 1,
            renderCell: (params: any) => {
                // Calcula el porcentaje
                let porcentaje = 0;
                const valorAbonado = parseFloat(valoresAbonados[`valor_abonado_${params.id}`]);
                const valorCapitalIntereses = params.row.valor_capital_intereses;

                if (!isNaN(valorAbonado) && valorCapitalIntereses !== 0) {
                    porcentaje = (valorAbonado / valorCapitalIntereses) * 100;
                }

                // Formatea el porcentaje a dos decimales
                const porcentajeFormateado = porcentaje.toFixed(2);

                // Determina el color del Chip
                let chipColor: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' = 'default';
                if (porcentaje === 100) {
                    chipColor = 'success'; // Verde cuando es 100%
                }

                return (
                    <Chip
                        label={`${porcentajeFormateado}%`}
                        color={chipColor}
                        variant="outlined"
                    />
                );
            },
        },


        {
            field: 'abono_capital',
            headerName: 'Valor Abonado 40%',
            width: 250,
            renderCell: (params) => {

                const handleAbonoButtonClick = () => {
                    // Supongo que `valor_total` es una variable que contiene el valor total que se usa para calcular el valor abonado inicial.
                    const valor_abonado_inicial = valor_total;

                    const valor_intereses = params.row.valor_intereses;
                    const valor_capital_intereses = params.row.valor_capital_intereses;

                    const respuesta = valor_intereses / valor_capital_intereses;

                    console.log("respuesta", respuesta);

                    let total = Math.round(valor_abonado_inicial * respuesta);

                    console.log("total", total);

                    // Verifica si total es mayor que valor_capital_intereses
                    if (total > valor_capital_intereses) {
                        total = valor_capital_intereses;
                    }

                    console.log("valor_intereses", valor_intereses);

                    // Actualiza el estado con el nuevo valor abonado
                    handleValorAbonadoChange({ target: { value: total } }, 'abono_capital', `abono_capital_${params.id}`);
                };

                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            required
                            label="Valor Abonado"
                            size="small"
                            fullWidth
                            type='number'
                            key={`abono_capital_${params.id}`}
                            id={`abono_capital_${params.id}`}
                            value={valoresAbonados[`abono_capital_${params.id}`] || ''}
                            onChange={(event) => handleValorAbonadoChange(event, 'abono_capital', `abono_capital_${params.id}`)}
                        />
                        <Button
                            variant="outlined"
                            disabled={-SaldoRestante <= 0}
                            onClick={handleAbonoButtonClick}>
                            <MonetizationOnOutlinedIcon />
                        </Button>
                    </div>
                );
            },
        },







        {
            field: 'abono_intereses',
            headerName: 'Abono Intereses',
            flex: 1,
            renderCell: (params) => {
                const dato = parseFloat(valoresAbonados[`valor_abonado_${params.id}`]);
                const nuevoValor = params.row.valor_intereses;
                const nuevoValorFormateado = nuevoValor.toLocaleString('es-ES');
                // Verificar si dato y nuevoValor son números válidos
                if (isNaN(dato) || isNaN(nuevoValor)) {
                    return (
                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            N/A
                        </div>
                    );
                }

                return (
                    <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {nuevoValorFormateado}
                    </div>
                );
            },
        },
        {
            field: 'saldo_capital',
            headerName: 'Saldo Capital',
            flex: 1,
            renderCell: (params) => {

                const valor_Abonado = parseFloat(valoresAbonados[`valor_abonado_${params.id}`]);
                const valor_capital = params.row.monto_inicial ;

                // Verificar si dato y nuevoValor son números válidos
                if (isNaN(valor_Abonado) || isNaN(valor_capital)) {
                    return (
                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                            N/A
                        </div>
                    );
                }
                const resultado = valor_capital - valor_Abonado;
                setSaldoCapital(resultado);
                return (
                    <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {resultado.toLocaleString('es-ES')}
                    </div>
                )
            },

        },
    ];





    const openModal = () => { setIsModalOpen(true); };

    const closeModal = () => { setIsModalOpen(false); };



    useEffect(() => {
        if (plan_pagos.data_cartera !== undefined) {
            set_lista(plan_pagos.data_cartera.obligaciones)
        }
    }, [plan_pagos])




    useEffect(() => {
        if (plan_pagos.data_cartera !== undefined) {
            set_lista(plan_pagos.data_cartera.obligaciones)
        }
    }, [plan_pagos])




    return (
        <>
            {/* <Button
            color="primary"
            variant="contained"
            startIcon={<Add />}
            fullWidth
                style={{ width: "90%", marginTop: 15 }}
                onClick={openModal}
            >
                Aplicar Abono
            </Button>
            <Dialog open={isModalOpen} fullWidth maxWidth="lg" PaperProps={{
                sx: {
                    borderRadius: '12px', // Ajusta el valor según lo redondeado que desees
                },
            }}> */}

            <Grid container justifyContent="center" spacing={0}>



                <Grid item xs={12}>
                    <Title title="Aplicar Abono" />
                </Grid>


                {lista.length !== 0 ? (
                    <>
                        <Grid item xs={6}>
                            <TextField
                                label="Total Actual a favor"
                                size="small"
                                style={{ width: "95%", margin: 10 }}
                                fullWidth
                                disabled
                                value={-SaldoRestante}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Total Abono Utilizado"
                                size="small"
                                style={{ width: "95%", margin: 10 }}
                                fullWidth
                                disabled
                                value={sumaTotal}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <ButtonGroup
                                style={{
                                    margin: 7,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                {download_xls({ nurseries: lista, columns })}
                                {download_pdf({ nurseries: lista, columns, title: "Datos de liquidaciónx" })}
                            </ButtonGroup>
                            <DataGrid
                                // density="compact"
                                style={{ marginTop: 15, width: "100%" }}
                                autoHeight
                                rows={lista || []}
                                columns={columns}
                                getRowId={(row) => uuidv4()}
                            />
                        </Grid>
                    </>
                ) : null
                }




                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        startIcon={<ClearIcon />}
                        fullWidth
                        style={{ width: "90%", margin: 10 }}
                        variant="contained"
                        color="success"
                        onClick={closeModal}
                    >
                        Generar
                    </Button>
                </Grid>






                <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                    <Button
                        startIcon={<ClearIcon />}
                        fullWidth
                        style={{ width: "90%", margin: 10 }}
                        variant="contained"
                        color="error"
                        onClick={closeModal}
                    >
                        Salir
                    </Button>
                </Grid>
            </Grid>
            {/* </Dialog > */}
        </>
    );
}



