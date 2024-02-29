/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';

export const RepresentacioTercero = () => {
    const initialDataBusqueda = {
        cedulaCiudadania: '',
        numeroIdentificadorTitular: '',
        nombres: '',
        apellidos: '',
        tipoDocumentoApoderado: '',
        numeroIdentificacionApoderado: '',
        nombresApoderado: '',
        apellidosApoderado: ''
    };

    const [form, setForm] = useState(initialDataBusqueda);

    const handleInputChange = (field:any, value:any) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    return (
        <>
            {/* Campos de búsqueda */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.cedulaCiudadania}
                        label="Cédula de Ciudadanía"
                        onChange={(e) => handleInputChange('cedulaCiudadania', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.numeroIdentificadorTitular}
                        label="Número de Identificación del Titular"
                        onChange={(e) => handleInputChange('numeroIdentificadorTitular', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.nombres}
                        label="Nombres"
                        onChange={(e) => handleInputChange('nombres', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.apellidos}
                        label="Apellidos"
                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.tipoDocumentoApoderado}
                        label="Tipo de Documento del Apoderado"
                        onChange={(e) => handleInputChange('tipoDocumentoApoderado', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.numeroIdentificacionApoderado}
                        label="Número de Identificación del Apoderado"
                        onChange={(e) => handleInputChange('numeroIdentificacionApoderado', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.nombresApoderado}
                        label="Nombres del Apoderado"
                        onChange={(e) => handleInputChange('nombresApoderado', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.apellidosApoderado}
                        label="Apellidos del Apoderado"
                        onChange={(e) => handleInputChange('apellidosApoderado', e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
};
