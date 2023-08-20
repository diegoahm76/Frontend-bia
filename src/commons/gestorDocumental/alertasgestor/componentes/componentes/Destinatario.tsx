/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FormControl, Grid, InputLabel, MenuItem, Select, IconButton, Button, TextField, } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Title } from '../../../../../components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BuscadorPersona } from '../../../../../components/BuscadorPersona';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports  
import { Alertas, Persona } from '../../interfaces/types';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports  
import { api } from '../../../../../api/axios';
import SaveIcon from '@mui/icons-material/Save';

export interface AlertaPersona {
    id_persona_alertar: number | null;
    perfil_sistema: string | null;
    cod_clase_alerta: string;
    id_persona: number | null;
    id_unidad_org_lider: number | null;
}
export interface SelectItem {
    value: string;
    label: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Destinatario: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [persona, set_persona] = useState<Persona | undefined>();
    const initial_data: Alertas[] = [];
    const [data_entidad, setdata_entidad] = useState<Alertas[]>(initial_data);
    const on_result = async (info_persona: Persona): Promise<void> => {
        set_persona(info_persona);
    }
    const [selected_row, setselected_row] = useState<Alertas | null>(null);

    const fetch_dataget = async (): Promise<void> => {
        try {
            const url = "/transversal/alertas/personas_alertar/get-by-configuracion/Gst_SlALid/";
            const res = await api.get(url);
            const sucursales_data = res.data.data;
            setdata_entidad(sucursales_data);
            console.log(sucursales_data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetch_dataget().catch((error) => {
            console.error(error);
        });
    }, []);
    const columns = [
        {
            field: "detalle",
            headerName: "Detalle",
            width: 200,
            flex: 1,
            valueGetter: (params: any) => params.row.datos_reordenados.detalle
        },
        {
            field: "destinatario",
            headerName: "destinatario",
            width: 200,
            flex: 1,
            valueGetter: (params: any) => params.row.datos_reordenados.destinatario
        },
        {
            field: "nombre",
            headerName: "nombre",
            width: 200,
            flex: 1,
            valueGetter: (params: any) => params.row.datos_reordenados.nombre
        },

        {
            field: "accion",
            headerName: "Acción",
            width: 150,
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        aria-label="Editar"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="Eliminar"
                        onClick={() => {
                            setselected_row(params.row);
                            void handleeliminafila();
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                </>
            ),
        },
    ];
    const [perfil, set_perfil] = useState<SelectItem[]>([]);
    const handleeliminafila = async (): Promise<void> => {
        if (selected_row) {
            try {
                const url = `/transversal/alertas/personas_alertar/delete/${selected_row.id_persona_alertar}/`;
                await api.delete(url);
                // Actualiza el estado de los datos después de eliminar
                const updated_data = data_entidad.filter(row => row.id_persona_alertar !== selected_row.id_persona_alertar);
                setdata_entidad(updated_data);
                setselected_row(null); // Limpia la fila seleccionada
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const fetch_perfil = async (): Promise<void> => {
            try {
                const url = `/listas/perfiles_sistema/`;
                const res_perfil = await api.get(url);
                const alertas_perfil = res_perfil.data.data;
                set_perfil(alertas_perfil);
            } catch (error) {
                console.error(error);
            }
        };
        void fetch_perfil();
    }, []);
    const [selec_perfil, setselec_perfil] = useState('');
    const handleperfil = (event: SelectChangeEvent<string>): void => {
        setselec_perfil(event.target.value);
    };
    const [selected_button, setselected_button] = useState<string | null>(null);
    const handle_selectlider = (): void => {
        setselected_button('lider');
    };
    const handle_selectperfil = (): void => {
        setselected_button('perfil');
    };
    const handle_selectbuscar = (): void => {
        setselected_button('buscador');
    };

    // crear 
    const initialFormData = {
        id_persona_alertar: null,
        perfil_sistema: null,
        cod_clase_alerta: '',
        id_persona: null,
        id_unidad_org_lider: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,

        }));
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await api.post('/transversal/alertas/personas_alertar/create/', formData);
            console.log('Alerta de persona creada exitosamente:', response.data);
            // Reset form data after successful submission
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error al crear la alerta de persona:', error);
        }
    };
 
    useEffect(() => {
        if (persona?.id_persona !== formData.id_persona) {
            setFormData((prevData) => ({
                ...prevData,
                id_persona: persona?.id_persona !== undefined ? persona.id_persona : null,
            }) as typeof formData); // Utilizamos "as typeof formData" para asegurar la compatibilidad de tipos
        }
    }, [persona?.id_persona]);
    
    return (
        <Grid container
            spacing={2}
            m={2} p={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px', m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >
            <TextField
                label="ID de Persona"
                variant="outlined"
                fullWidth
                type="number"
                name="id_persona"
                value={formData.id_persona || ''}
                onChange={handleInputChange}
                required
            />
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Código de Clase de Alerta"
                    variant="outlined"
                    fullWidth
                    name="cod_clase_alerta"
                    value={formData.cod_clase_alerta}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="perfil_sistema"
                    variant="outlined"
                    fullWidth
                     name="perfil_sistema"
                    value={formData.perfil_sistema}
                    onChange={handleInputChange}
                    required
                />
                {/* You can add more TextField components for other fields */}

                <Button type="submit" variant="contained" color="primary">
                    Crear Alerta de Persona
                </Button>
            </form>
            <Grid item marginTop={-2} xs={12}>
                <Title title="Destinatario" />
            </Grid>

            <Grid item xs={12}>
                <Button onClick={handle_selectlider}>  Lider de unidad</Button>
                <Button onClick={handle_selectperfil}>  Perfil</Button>
                <Button onClick={handle_selectbuscar}>  BuscadorPersona</Button>
            </Grid>

            {selected_button === 'lider' && (
                <Grid item xs={12}>

                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Lider de unidad</InputLabel>
                            <Select label="Lider de unidad">
                                <MenuItem value="Ten">Ten</MenuItem>
                                <MenuItem value="Twenty">Twenty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )}

            {selected_button === 'perfil' && (
                <Grid item xs={12}>


                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Perfil</InputLabel>
                            <Select value={selec_perfil} label="Perfil" onChange={handleperfil}>
                                {perfil.map(item => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            )}

            {selected_button === 'buscador' && (
                <Grid item xs={12}>
                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />
                </Grid>
            )}

            <Grid item>
                < Button
                    variant="contained"
                    color="success"
                    fullWidth
                    startIcon={<SaveIcon />}
                    type="submit"
                >
                    Guardar
                </Button>
            </Grid>
            <>{persona?.primer_nombre}</>
            <>{persona?.id_persona}</>
            <Grid item xs={12}  >
                <DataGrid
                    density="compact"
                    autoHeight
                    columns={columns}
                    rows={data_entidad}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.id_persona_alertar}
                />
            </Grid>

        </Grid>
    );
};