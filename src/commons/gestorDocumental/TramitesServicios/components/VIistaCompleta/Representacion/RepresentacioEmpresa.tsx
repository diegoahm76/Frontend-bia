/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';

export const RepresentacioEmpresa = () => {
    const initialDataBusqueda = {
        TipoDocumento: '',
        NumeroIdentificacionTributaria: '',
        RazonSocial: '',
        EstablecimientoComercio: '',
        Nombres: '',
        Apellidos: '',
        NumeroIdentificacion: '',
    };
    const [form, setForm] = useState(initialDataBusqueda);

    const handleInputChange = (field:any, value:any) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.TipoDocumento}
                        label="TipoDocumento"
                        onChange={(e) => handleInputChange('TipoDocumento', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.NumeroIdentificacionTributaria}
                        label="Número de Identificación"
                        onChange={(e) => handleInputChange('NumeroIdentificacionTributaria', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.RazonSocial}
                        label="Razón Social"
                        onChange={(e) => handleInputChange('RazonSocial', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.EstablecimientoComercio}
                        label="Establecimiento de Comercio"
                        onChange={(e) => handleInputChange('EstablecimientoComercio', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.Nombres}
                        label="Nombres"
                        onChange={(e) => handleInputChange('Nombres', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.Apellidos}
                        label="Apellidos"
                        onChange={(e) => handleInputChange('Apellidos', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.TipoDocumento}
                        label="Tipo de Documento"
                        onChange={(e) => handleInputChange('TipoDocumento', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15 }}
                        size="small"
                        variant="outlined"
                        value={form.NumeroIdentificacion}
                        label="Número de Identificación"
                        onChange={(e) => handleInputChange('NumeroIdentificacion', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        </>
    );
};
