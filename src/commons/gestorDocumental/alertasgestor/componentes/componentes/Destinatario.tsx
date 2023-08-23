/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { LoadingButton } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../../../../../api/axios';
import { FC, useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../../components';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { BuscadorPersona } from '../../../../../components/BuscadorPersona';
import { control_error, control_success } from '../../utils/control_error_or_success';
import { Alertas, Persona, Props, SelectItem, UnidadOrganizacional } from '../../interfaces/types';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, } from '@mui/material';


export const Destinatario: FC<Props> = ({ selectedOption }): JSX.Element => {
    const initial_data: Alertas[] = [];
    const [loading, set_loading] = useState(false);
    const [persona, set_persona] = useState<Persona | undefined>();
    // const [selected_row, setselected_row] = useState<Alertas | null>(null);
    const [data_entidad, setdata_entidad] = useState<Alertas[]>(initial_data);
    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }
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
            // flex: 1,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        aria-label="Eliminar"
                        onClick={() => {
                            // setselected_row(params.row);
                            void handleeliminafila(params);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                </>
            ),
        },
    ];
    const handleeliminafila = async (params: any): Promise<void> => {

        try {
            const url = `/transversal/alertas/personas_alertar/delete/${params.row.id_persona_alertar}/`;
            await api.delete(url);
            // Actualiza el estado de los datos después de eliminar
            const updated_data = data_entidad.filter(row => row.id_persona_alertar !== params.row.id_persona_alertar);
            setdata_entidad(updated_data);
            control_success("Alerta eliminada correctamente");
            // setselected_row(null); // Limpia la fila seleccionada
        } catch (error) {
            console.error(error);
        }

    };
    const [perfil, set_perfil] = useState<SelectItem[]>([]);
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
    const [lider, set_lider] = useState<UnidadOrganizacional[]>([]);
    useEffect(() => {
        const fetch_perfil = async (): Promise<void> => {
            try {
                const url = `/transversal/organigrama/unidades/get-list/organigrama-actual/`;
                const res_lider = await api.get(url);
                const alertas_lider = res_lider.data.data;
                set_lider(alertas_lider);
            } catch (error) {
                console.error(error);
            }
        };
        void fetch_perfil();
    }, []);
    // const [selec_perfil, setselec_perfil] = useState('');
    // const handleperfil = (event: SelectChangeEvent<string>): void => {
    //     setselec_perfil(event.target.value);
    // };
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
        cod_clase_alerta: String(selectedOption),
        id_persona: null,
        id_unidad_org_lider: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,

        }));
    };
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        set_loading(true);
        try {
            const response = await api.post('/transversal/alertas/personas_alertar/create/', formData);
            console.log('Alerta de persona creada exitosamente:', response.data);
            control_success("Alerta creada exitosamente");

            // Reset form data after successful submission
            setFormData(initialFormData);
            fetch_dataget();
        } catch (error) {
            console.error('Error al crear la alerta de persona:', error);
            control_error("Error no guardado ");
        }
        set_loading(false);
    };
    useEffect(() => {
        if (persona?.id_persona !== formData.id_persona) {
            setFormData((prevData) => ({
                ...prevData,
                id_persona: persona?.id_persona !== undefined ? persona.id_persona : null,
            }) as typeof formData); // Utilizamos "as typeof formData" para asegurar la compatibilidad de tipos
        }
    }, [persona?.id_persona]);

    useEffect(() => {
        if (formData.perfil_sistema !== null) {
            set_persona(undefined);
            setFormData((prevData) => ({
                ...prevData,
                id_unidad_org_lider: null,
            }));
        }
    }, [formData.perfil_sistema]);

    useEffect(() => {
        if (formData.id_unidad_org_lider !== null) {
            set_persona(undefined);
            setFormData((prevData) => ({
                ...prevData,
                perfil_sistema: null,
            }));
        }
    }, [formData.id_unidad_org_lider]);

    useEffect(() => {
        if (persona?.id_persona !== null) {
            setFormData((prevData) => ({
                ...prevData,
                perfil_sistema: null,
                id_unidad_org_lider: null,
            }));
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
                            <Select value={formData.id_unidad_org_lider} label="Lider de unidad" name="id_unidad_org_lider" onChange={handleInputChange}>
                                {lider.map((unidad) => (
                                    <MenuItem key={unidad.id_unidad_organizacional} value={unidad.id_unidad_organizacional}>
                                        {unidad.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )}
            {selected_button === 'perfil' && (
                <><Grid item xs={12}>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Perfil</InputLabel>
                            <Select value={formData.perfil_sistema} label="Perfil" name="perfil_sistema" onChange={handleInputChange}>
                                {perfil.map(item => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                </>
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
            <Grid container item justifyContent="flex-end" >
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        < LoadingButton
                            variant="contained"
                            color="success"
                            fullWidth

                            type="submit"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            loading={loading}
                        >
                            Guardar
                        </LoadingButton>
                    </form>
                </Grid>
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