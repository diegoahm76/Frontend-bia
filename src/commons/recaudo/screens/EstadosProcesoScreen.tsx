import { Avatar, Box, Button, Grid, IconButton, Stack, Tab } from "@mui/material"
import { Title } from '../../../components/Title';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState,  type SyntheticEvent } from 'react';
import { TablaGeneral } from "../../../components/TablaGeneral";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { EstadosProcesoModal } from "../components/estadosProceso/EstadosProcesoModal";


const rows = [
    {
        id: 2211,
        etapa_proceso: 'Mandamiento de Pago',
        descripcion: 'En proceso de pago normal',
    },
    {
        id: 2311,
        etapa_proceso: 'Cobro persuasivo',
        descripcion: 'Se invita a suscribir mandamiento de pago',
    },
    {
        id: 2318,
        etapa_proceso: 'Cobro coactivo',
        descripcion: 'Cobro efectivo de recaudo',
    },
    {
        id: 2344,
        etapa_proceso: 'Embargo',
        descripcion: 'Embargo de bienes dentro del marco de cobro',
    },
    {
        id: 2764,
        etapa_proceso: 'Extinción de Deuda',
        descripcion: 'Ante inefectividad en el cobro',
    },
    {
        id: 2801,
        etapa_proceso: 'Finalización de deuda',
        descripcion: 'El deudor ha cumplido sus obligaciones',
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadosProcesoScreen: React.FC = () => {

    const columns = [
        {
            field: 'id',
            header: 'id etapa',
            visible: true,
        },
        {
            field: 'etapa_proceso',
            header: 'Etapa de Proceso',
            visible: true,
        },
        {
            field: 'descripcion',
            header: 'Descripcion',
            visible: true,
        },
        {
            field: 'opciones',
            header: 'Opciones',
            visible: true,
            renderCell: (params:any) => (
                <IconButton
                    onClick={() => {
                        set_position_tab_organigrama('2')
                    }}
                >
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            background: '#fff',
                            border: '2px solid'
                        }}
                        variant="rounded"
                    >
                        <EditIcon
                            sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                        />
                    </Avatar>
                </IconButton>
            )
        },
    ]

    const columns_edit = [
        {
            field: 'descripcion',
            header: 'Descripción',
            visible: true,
        },
        {
            field: 'tipo_atributo',
            header: 'Tipo de Atributo',
            visible: true,
        },
        {
            field: 'obligatorio',
            header: 'Obligatorio',
            visible: true,
        },
        {
            field: 'opciones',
            header: 'Opciones',
            visible: true,
        },
    ]

    const rows_edit = [
        {
            id: 1,
            descripcion: 'Acto administrativo',
            tipo_atributo: 'Documento',
            obligatorio: 'Si',
            opciones: ''
        },
        {
            id: 2,
            descripcion: 'Fecha de ejecutoriado',
            tipo_atributo: 'Fecha',
            obligatorio: 'Si',
            opciones: ''
        },
        {
            id: 3,
            descripcion: 'Resolución',
            tipo_atributo: 'Documento',
            obligatorio: 'Si',
            opciones: ''
        },
        {
            id: 4,
            descripcion: 'Observaciones',
            tipo_atributo: 'Texto',
            obligatorio: 'No',
            opciones: ''
        },
        {
            id: 5,
            descripcion: 'Estado de credito',
            tipo_atributo: 'Opciones',
            obligatorio: 'No',
            opciones: 'Si_No'
        },
    ]

    const [modal_detalle, set_modal_detalle] = useState<boolean>(false);

    const [position_tab, set_position_tab_organigrama] = useState('1');
    const handle_change = (event: SyntheticEvent, new_value:string): void => {
        set_position_tab_organigrama(new_value)
    }

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
                    boxShadow: '0px 3px 6px #042F4A26'
                }}
            >
                <Grid item xs={12}>
                <Title title="Estados Proceso"></Title>
                    <Box
                        component='form'
                        sx={{ mt: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <TabContext value={position_tab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handle_change}>
                                    <Tab label="Etapas de Proceso" value="1"/>
                                    <Tab label="Atributos de Etapa: Cobro Coactivo" value="2"/>
                                </TabList>
                            </Box>

                            <TabPanel value="1" sx={{ p: '20px 0' }}>
                                <TablaGeneral
                                    showButtonExport
                                    tittle={'Estados'}
                                    columns={columns}
                                    rowsData={rows}
                                    staticscroll={true}
                                    stylescroll={"780px"}
                                />
                            </TabPanel>

                            <TabPanel value="2" sx={{ p: '20px 0' }}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                    sx={{ mb: '20px' }}
                                >
                                    <Button 
                                        color="success"
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            set_modal_detalle(true)
                                        }}
                                    >
                                        Nuevo atributo
                                    </Button>
                                </Stack>
                                <TablaGeneral
                                    showButtonExport
                                    tittle={'Editar'}
                                    columns={columns_edit}
                                    rowsData={rows_edit}
                                    staticscroll={true}
                                    stylescroll={"780px"}
                                />
                            </TabPanel>
                        </TabContext>

                    </Box>
                </Grid>
            </Grid>
            <EstadosProcesoModal
                is_modal_active={modal_detalle}
                set_is_modal_active={set_modal_detalle}
            />
        </>
    )
}
