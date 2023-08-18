/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FormControl, Grid, InputLabel, MenuItem, Select, IconButton, Button, } from '@mui/material';
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
    return (
        <Grid container
            spacing={2}
            m={2} p={2}
            sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                m: '10px 0 20px 0',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
            }}
        >


            <Grid item marginTop={-2} xs={12}>
                <Title title="Destinatario" />
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                    <InputLabel  >Lider de unidad</InputLabel>
                    <Select
                        label="Lider de unidad"
                    >
                        <MenuItem value="Ten">Ten</MenuItem>
                        <MenuItem value="Twenty">Twenty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                    <InputLabel  >Unidad grupo rentas</InputLabel>
                    <Select
                        label="Unidad grupo rentas"
                    >
                        <MenuItem value="Ten">Ten</MenuItem>
                        <MenuItem value="Twenty">Twenty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
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


            <Grid item xs={12} >

                <BuscadorPersona
                    onResult={(data) => {
                        void on_result(data);
                    }}
                />
            </Grid>
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