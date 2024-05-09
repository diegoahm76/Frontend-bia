/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { api } from '../../../../../../api/axios';
import { Title } from '../../../../../../components/Title';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { RadicadoData, ejemploData, initial_data } from '../interface/IBUsquedaAvanzadaRadicado';
import { BuscadorPerzonasStiven } from '../../BuscadorPersonaPersonalizado/BuscadorPerzonas';
import { Persona } from '../../../interface/IwordFlow';



export const ConsultarRadicadosTable = () => {
    const [data_table, set_data_tabla] = useState<RadicadoData[]>(ejemploData);
    const [choise_estado_data, set_choise_estado_data] = useState([{ value: "", label: "" }]);
    const [form, setForm] = useState(initial_data);
    const [persona, set_persona] = useState<Persona | undefined>();



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

    const columns = [
        { field: 'nombre_modulo', headerName: 'Nombre Módulo', flex: 1 },
        { field: 'nombre_tipo_radicado', headerName: 'Estado Solicitud', flex: 1 },
        { field: 'nombre_completo_radica', headerName: 'Unidad Responsable', flex: 1 },
        { field: 'radicado', headerName: 'Radicado', flex: 1 },
        { field: 'prefijo_radicado', headerName: 'Prefijo Radicado', flex: 1 },
        {
            field: 'fecha_radicado',
            headerName: 'Fecha de Radicado',
            flex: 1,
            renderCell: (params: any) => (
                <span>{new Date(params.value).toLocaleDateString()}</span>
            ),
        },
        { field: 'agno_radicado', headerName: 'Año Radicado', flex: 1 },
        { field: 'nro_radicado', headerName: 'Número Radicado', flex: 1 },

    ];


    const Peticion_Busqueda_Avanzada = async (): Promise<void> => {
        try {
            let url = '/gestor/radicados/get-historico-radicados/';
            url += `?fecha_inicio=${form.fecha_desde}`;
            url += `&fecha_fin=${form.fecha_hasta}`;
            url += `&prefijo=${form.prefijo}`;
            url += `&id_persona=${id_persona||""}`;
            url += `&agno=${form.año}`;
            url += `&modulo=${form.modulo}`;
            url += `&tipo_radicado=${form.tipo_radicado}`;

            const res = await api.get(url);
            const Data_consulta = res.data.data;
            set_data_tabla(Data_consulta);
        } catch (error) {
            console.error(error);
        }
    };


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


    const limpiar_formulario = () => {
        setForm(initial_data);
    };

    useEffect(() => {
        Peticion_Busqueda_Avanzada();
        choise_tipo_radicado();
    }, []);


    const handleResult = async (persona?: Persona): Promise<void> => {
        if (persona) {
          // Haz lo que necesites con la información de la persona
          set_persona(persona);
         
        } else {
          // Manejar el caso en el que la persona es undefined
          console.log("No se seleccionó ninguna persona.");
        }
      };

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
                    <Title title="Consulta de Radicados " />
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
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Prefijo"
                        value={form.prefijo}
                        onChange={(e) => handleInputChange('prefijo', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Año"
                        value={form.año}
                        onChange={(e) => handleInputChange('año', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Modulo"
                        value={form.modulo}
                        onChange={(e) => handleInputChange('modulo', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
                    />
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

                <Grid item xs={12} sm={2}>
                    <TextField
                        fullWidth
                        type="date"
                        size="small"
                        variant="outlined"
                        value={form.fecha_hasta}
                        label=" Fecha hasta"
                        onChange={(e) => handleInputChange('fecha_hasta', e.target.value)}
                        style={{ marginTop: 15, width: '90%' }}
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
                            style={{ marginTop: 25, width: '95%' }}
                        />
                    </Grid>
                )}

                <Grid item xs={9} style={{ marginTop: 25 }}>
  
                <BuscadorPerzonasStiven onResultt={handleResult} />
                  </Grid>

                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            style={{ width: '90%' }}
                            variant="contained"
                            startIcon={<SearchIcon />}
                            color="primary"
                            fullWidth
                            onClick={Peticion_Busqueda_Avanzada}
                        >
                            Buscar
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            color="primary"
                            style={{ width: '90%' }}
                            variant="outlined"
                            onClick={limpiar_formulario}
                            fullWidth
                            startIcon={<CleanIcon />}
                        >
                            Limpiar
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 10 }}>
                    <ButtonGroup
                        style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {download_xls({ nurseries: data_table, columns })}
                        {download_pdf({
                            nurseries: data_table,
                            columns,
                            title: 'Consulta Radicados',
                        })}
                    </ButtonGroup>

                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        rows={data_table || []}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={() => uuidv4()}
                    />
                </Grid>
            </Grid>
        </>
    );
};
