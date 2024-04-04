/* eslint-disable @typescript-eslint/naming-convention */

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Title } from "../../../../../components/Title"
import { useEffect, useState } from "react";
import { api } from "../../../../../api/axios";
import { BuscadorPerzonasStiven } from "../../../WorkFlowPQRSDF/components/BuscadorPersonaPersonalizado/BuscadorPerzonas";
import { Persona } from "../../../WorkFlowPQRSDF/interface/IwordFlow";
import { RenderDataGrid } from "../../../tca/Atom/RenderDataGrid/RenderDataGrid";
import SystemSecurityUpdateIcon from '@mui/icons-material/SystemSecurityUpdate';


export const HistorialTranferencia = () => {


    const initial_data = {
        fecha_desde: '',
        fecha_hasta: '',
        prefijo: '',
        año: '',
        tipo_radicado: '',
        modulo: '',

    }
    const [choise_estado_data, set_choise_estado_data] = useState([{ value: "", label: "" }]);
    const [persona, set_persona] = useState<Persona | undefined>();
    const [form, setForm] = useState(initial_data);


    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value,
        });
    };



    const {
        id_persona,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
    } = persona ?? {};
    const nombre_completo = `${primer_nombre ?? ''} ${segundo_nombre ?? ''} ${primer_apellido ?? ''} ${segundo_apellido ?? ''}`;
    const nombre = nombre_completo ?? '';



    const choise_tipo_radicado = async (): Promise<void> => {
        try {
            let url = '/gestor/choices/cod-tipo-consecutivo/';
            const res = await api.get(url);
            const Data_consulta = res.data.data;
            set_choise_estado_data(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };






    const handleResult = async (persona?: Persona): Promise<void> => {
        if (persona) {
            // Haz lo que necesites con la información de la persona
            set_persona(persona);

        } else {
            // Manejar el caso en el que la persona es undefined
            console.log("No se seleccionó ninguna persona.");
        }
    };


    const columns = [
        { field: "orden_documento", headerName: "Orden de documento", flex: 1 },
        { field: "nombre", headerName: "Nombre", flex: 1 },
        { field: "medio_almacenamiento", headerName: "Medio de almacenamiento", flex: 1 },
        { field: "numero_folios", headerName: "Número de folios", flex: 1 },
        { field: "digitalizacion", headerName: "Digitalización", flex: 1 },
        { field: "observacion", headerName: "Observación", flex: 1 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            renderCell: () => (
                <Button onClick={() => console.log("Botón clickeado")}><SystemSecurityUpdateIcon /></Button>
            ),
        },
    ];


    const getRandomNumber = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Datos de ejemplo para las filas (listadoDeAsignaciones)
    const listadoDeAsignaciones = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        orden_documento: `Orden ${index + 1}`,
        nombre: `Nombre ${index + 1}`,
        medio_almacenamiento: `Medio ${index + 1}`,
        numero_folios: getRandomNumber(1, 100),
        digitalizacion: `Digitalizado ${index + 1}`,
        observacion: `Observación ${index + 1}`,
    }));


    useEffect(() => {
        choise_tipo_radicado()
    }), []


    return (
        <>
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
                <Grid item xs={12}>
                    <Title title="Historial de Tranferencia" />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth style={{ marginTop: 15, width: "95%" }}>
                        <InputLabel id="estado-solicitud-label">Estado Solicitud</InputLabel>
                        <Select
                            id="demo-simple-select"
                            name="Tipo_Radicado"
                            size="small"
                            label="Tipo Radicado"
                            value={form.tipo_radicado}
                            onChange={(e) => handleInputChange("tipo_radicado", e.target.value)}
                        >
                            {choise_estado_data.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>



                <Grid item xs={12} sm={2}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        type="date"
                        size="small"
                        variant="outlined"
                        value={form.fecha_desde}
                        label=" Fecha desde "
                        onChange={(e) => handleInputChange('fecha_desde', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {nombre && (
                    <Grid item xs={12} sm={3}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            label="Nombre Titular"
                            value={nombre}
                            disabled
                            style={{ marginTop: 15, width: '95%' }}
                        />
                    </Grid>
                )}
                <Grid item xs={2} style={{ marginTop: 15 }}>

                    <BuscadorPerzonasStiven onResultt={handleResult} />
                </Grid>
                <Grid item xs={12}>

                    <RenderDataGrid
                        title="Listado de asignaciones "
                        columns={columns ?? []}
                        rows={listadoDeAsignaciones ?? []}
                    />
                </Grid>

            </Grid>
        </>
    )
}

