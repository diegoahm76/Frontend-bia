/* eslint-disable @typescript-eslint/naming-convention */
 
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';

export const RepresentacioPropio = () => {
    const initialDataBusqueda = {
        cedulaCiudadania: '',
        numeroIdentificacion: '',
        nombres: '',
        apellidos: '',
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
                        value={form.numeroIdentificacion}
                        label="Número de Identificación"
                        onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
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
            </Grid>
        </>
    );
};
