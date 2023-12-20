import { Grid, Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { obtener_usuario_logueado } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
import { useAppDispatch } from "../../../../../hooks";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { ExpedienteSeleccionado } from "./ExpedienteSeleccionado";
import { Title } from "../../../../../components/Title";
import { IndiceSeleccionado } from "./IndiceSeleccionado";
import { VerCierreIndiceElectronico } from "./VerCierreIndiceElectronico";
import BuscarExpediente from "../../FirmaCierreIndiceElectronico/screens/BuscarExpediente";
import jsPDF from "jspdf";
import { logo_cormacarena_h } from "../../../../conservacion/Reportes/logos/logos";
dayjs.extend(dayOfYear);
const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
}
const class_button_purple = { borderColor: "#7d2181", color: '#7d2181' };

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaIndiceElectronicoScreen: React.FC = () => {
    const navigate = useNavigate();
    const [expediente, set_expediente] = useState<any>(null);
    const [indice, set_indice] = useState<any>(null);
    const [abrir_modal_buscar, set_abrir_modal_buscar] = useState<boolean>(false);
    const [limpiar, set_limpiar] = useState<boolean>(false);
  const [visor, set_visor] = useState<any>();
  const [doc, set_doc] = useState<jsPDF>(new jsPDF({  orientation: "landscape" }));
    const [doc_height, set_doc_height] = useState<number>(0);
  const [titulo_reporte, set_titulo_reporte] = useState<any>();

    useEffect(() => {
        if (limpiar) {
            set_expediente(null);
            set_indice(null);
            set_limpiar(false);
        }
    }, [limpiar]);

    const salir_expediente: () => void = () => {
        navigate('/home');
    }

    const generar_reporte_indice: () => void = () => {
        crear_encabezado();
        const page = doc.internal.pageSize.getHeight();
        let coordendas = 0;
        let page_position = 1;
        let coordenada_y = 30;
        // seccion informacion de expedientes
        doc.line((doc.getTextWidth('Información del expediente') + 19.5), 40, doc.internal.pageSize.width - 20, 40);
        doc.line(18, 55, doc.internal.pageSize.width - 20, 55);
        doc.line(18, 40 , 18, 55); // Linea vertical
        doc.line(18, 40, 19, 40);
        doc.line(doc.internal.pageSize.width - 20, 40 , doc.internal.pageSize.width - 20, 55); // Linea vertical final
        doc.text('Información del expediente', 19, 41);
        doc.text('Título: ', 21, 46);
        doc.text('EXP04 expediente', 35, 46);
        doc.text('TRD asociada: ', 100, 46);
        doc.text('esto es una trd', 127, 46);
        doc.text('Serie documental: ', 170, 46);
        doc.text('esto es una serie docuemental', 202, 46);
        doc.text('Estado del expediente: ', 21, 52);
        doc.text('Cerrado', 62, 52);
        doc.text('Fecha de cierre de expediente: ', 100, 52);
        doc.text(dayjs().format('DD/MM/YYYY'), 154, 52);
        // seccion informacion de indice
        doc.text('Información del índice electrónico del expediente', 19, 61);
        doc.line((doc.getTextWidth('Información del índice electrónico del expediente') + 19.5), 60, doc.internal.pageSize.width - 20, 60);
        doc.line(18, 70, doc.internal.pageSize.width - 20, 70);
        doc.line(18, 60 , 18, 70); // Linea vertical
        doc.line(18, 60, 19, 60);
        doc.line(doc.internal.pageSize.width - 20, 60 , doc.internal.pageSize.width - 20, 70); // Linea vertical final
        doc.text('Estado de índice electrónico del expediente: ', 21, 67);
        doc.text('Abierto', 97, 67);
        doc.text('Fecha de apertura de índice: ', 110, 46);
        doc.text('Serie documental: ', 125, 46);
        doc.text('Fecha de cierre de índice', 145, 46);
        doc.text('Fecha de cierre de índice', 110, 46);

        indice?.docs_indice_electronico_exp.forEach((report: any) => {
          
        });
        // doc.save('prueba.pdf');
        set_visor(doc.output('datauristring'));

      };
      const crear_encabezado: () => void = () => {
        const reporte_seleccionado = 'Índice electrónico de expediente';
        const title = 'Índice electrónico de expediente';
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
        doc.addImage(logo_cormacarena_h, doc.internal.pageSize.width - 45, 8, 40, 15);
        doc.setFont('Arial', 'bold'); // establece la fuente en Arial
        doc.text('Reporte',(doc.internal.pageSize.width - doc.getTextWidth('Reporte')) / 2,10);
        doc.text(title,(doc.internal.pageSize.width - doc.getTextWidth(title)) / 2,15);
        doc.setFont('Arial', 'normal'); // establece la fuente en Arial
        const fecha_generacion = `Fecha de generación de reporte ${dayjs().format('DD/MM/YYYY')}`;
        doc.text(fecha_generacion, doc.internal.pageSize.width - doc.getTextWidth(fecha_generacion) - 5,  5);
        set_titulo_reporte({ reporte_seleccionado, title });
        return { reporte_seleccionado, title };
      };
    return (
        <>
            <Grid container sx={class_css}>
                <Title title="Consulta de índice electrónico documental" />
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Box
                            component="form"
                            sx={{ mt: '20px', mb: '20px' }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mt: '20px' }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Expediente del índice a buscar"
                                        type={'text'}
                                        size="small"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                        value={expediente?.titulo_expediente ?? ''}
                                    />
                                </Grid>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SearchIcon />}
                                    onClick={() => { set_abrir_modal_buscar(true); }}
                                >
                                    Buscar expediente
                                </Button>
                                {abrir_modal_buscar && <BuscarExpediente is_modal_active={abrir_modal_buscar} set_is_modal_active={set_abrir_modal_buscar} set_expediente={set_expediente} set_indice={set_indice}></BuscarExpediente>}
                            </Stack>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
            {expediente !== null && <Grid
                container
                sx={class_css}
            >
                <ExpedienteSeleccionado expediente={expediente}></ExpedienteSeleccionado>
            </Grid>}
            {indice !== null && expediente?.estado === 'C' && <Grid
                container
                sx={class_css}
            >
                <IndiceSeleccionado indice={indice}></IndiceSeleccionado>
            </Grid>}
            {indice !== null && !indice?.abierto && expediente?.estado === 'C' && <Grid
                container
                sx={class_css}
            >
                <VerCierreIndiceElectronico indice={indice}></VerCierreIndiceElectronico>
            </Grid>}
            <Box component="form" noValidate autoComplete="off">
                <embed
                  src={visor}
                  type="application/pdf"
                  width="100%"
                  height="500px"
                />
              </Box>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: '10px' }}
                    >
                        <Button variant="outlined" sx={class_button_purple} onClick={() => { generar_reporte_indice() }}>Exportar PDF</Button>
                        <Button variant="outlined" sx={class_button_purple}>Exportar XLS</Button>
                        <Button
                            color="error"
                            variant='contained'
                            startIcon={<ClearIcon />}
                            onClick={() => { salir_expediente() }}
                        >
                            Salir
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}