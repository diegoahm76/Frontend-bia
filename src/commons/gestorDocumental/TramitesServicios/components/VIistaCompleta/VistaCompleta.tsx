/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Title } from '../../../../../components/Title'
import { RenderDataGrid } from '../../../tca/Atom/RenderDataGrid/RenderDataGrid'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { RepresentacioEmpresa } from './Representacion/RepresentacioEmpresa';
import { RepresentacioPropio } from './Representacion/RepresentacioPropio';
import { RepresentacioTercero } from './Representacion/RepresentacioTercero';


export const VistaCompleta = () => {



    const initialDataBusqueda = {
        Radicado: '',
        FormaPago: '',
        NombreProyecto: '',
        Expediente: '',
        Estado: '',
    }
    const [form, setForm] = useState(initialDataBusqueda);


    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    // Limpia el formulario
    const limpiarFormulario = () => {
        setForm(initialDataBusqueda);
    };

    // Definición de columnas y datos para el DataGrid
    const columns = [
        { field: "orden_documento", headerName: "Orden de documento", flex: 1 },
        { field: "nombre", headerName: "Nombre", flex: 1 },
        { field: "medio_almacenamiento", headerName: "Medio de almacenamiento", flex: 1 },
        { field: "digitalizacion", headerName: "Digitalización", flex: 1 },
        { field: "observacion", headerName: "Observación", flex: 1 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <Button>
                        <VisibilityIcon />
                    </Button>

                </>
            ),
        },
    ];

    // Genera datos aleatorios para el DataGrid
    const listadoDeAsignaciones = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        orden_documento: `Orden ${index + 1}`,
        nombre: `Nombre ${index + 1}`,
        medio_almacenamiento: `Medio ${index + 1}`,
        digitalizacion: `Digitalizado ${index + 1}`,
        observacion: `Observación ${index + 1}`,
    }));


    return (
        <>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}>

                {/* Título */}
                <Grid item xs={12}>
                    <Title title="Buscar Trámites en Proceso" />
                </Grid>

                {/* Campos de búsqueda */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={form.NombreProyecto}
                        label="Nombre del Proyecto"
                        onChange={(e) => handleInputChange('NombreProyecto', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '90%' }}
                        size="small"
                        variant="outlined"
                        value={form.Radicado}
                        label="Radicado"
                        onChange={(e) => handleInputChange('Radicado', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={"hola dos"}
                        label="TipoDocumento"
                        // onChange={(e) => handleInputChange('TipoDocumento', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={"hola"}
                        label="Número de Identificación"
                        // onChange={(e) => handleInputChange('NumeroIdentificacionTributaria', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} >
                    <RepresentacioEmpresa />
                </Grid>

                <Grid item xs={12} >
                    <RepresentacioPropio />
                </Grid>
                <Grid item xs={12} >
                    <RepresentacioTercero />
                </Grid>






                {/* Botones de búsqueda y limpieza */}
                <Grid item xs={12} sm={3}>
                    <Button
                        style={{ width: '90%', marginTop: 25 }}
                        variant="contained"
                        startIcon={<SearchIcon />}
                        color="primary"
                        fullWidth
                    >
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        color="primary"
                        style={{ width: '90%', marginTop: 25 }}
                        variant="outlined"
                        onClick={limpiarFormulario}
                        fullWidth
                        startIcon={<CleanIcon />}
                    >
                        Limpiar
                    </Button>
                </Grid>

                {/* DataGrid */}
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={10}>
                        <RenderDataGrid
                            title="Resultados"
                            columns={columns ?? []}
                            rows={listadoDeAsignaciones ?? []}
                        />
                    </Grid>
                </Grid>

            </Grid>


        </>
    )
}
