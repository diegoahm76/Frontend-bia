/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */

import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Grid,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import FormInputController from '../../../../components/partials/form/FormInputController';
import { Title } from '../../../../components';
import FormSelectController from '../../../../components/partials/form/FormSelectController';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { get_busqueda_avanzada_persona } from '../store/thunks/alertas';
import { LoadingButton } from '@mui/lab';

interface IProps {

    control_destinatario: any;
    open: any;
    handle_close_buscar: any;
    get_values: any;
    handle_busqueda: any;

}



const BusquedaAvanzada = ({ control_destinatario, open, handle_close_buscar, get_values, handle_busqueda }: IProps) => {
    const { tipo_documento, persona } = useAppSelector((state) => state.alerta);
    const dispatch = useAppDispatch();

    const columns: GridColDef[] = [
        {
            field: 'tipo_documento',
            headerName: 'Tipo de documento',
            sortable: true,
            width: 150,
        },
        {
            field: 'numero_documento',
            headerName: 'NÚMERO DE DOCUMENTO',
            sortable: true,
            width: 280,
        },
        {
            field: 'nombre_completo',
            headerName: 'NOMBRE COMPLETO',
            width: 280,
        },


        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 250,
            renderCell: (params) => (
                <Button
                    onClick={() => handle_busqueda(params.row)}
                    startIcon={<EditIcon />}
                >

                </Button>
            ),

        },
    ];




    const mostrar_busqueda: any = async () => {

        const tipo_documento = get_values('tipo_documento') ?? '';
        const numero_documento = get_values('numero_documento') ?? '';
        const primer_nombre = get_values('primer_nombre') ?? '';
        const primer_apellido = get_values('primer_apellido') ?? '';

        void dispatch(get_busqueda_avanzada_persona(tipo_documento, numero_documento, primer_nombre, primer_apellido))
    }



    return (
        <>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"

                >
                    Buscar
                </Button>
            </Grid>
            <Dialog fullWidth maxWidth="lg" open={open} onClose={handle_close_buscar} >
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26',
                            marginTop: '20px',
                            marginLeft: '-5px',
                        }}
                    >
                        <Title title="Búsqueda avanzada de personas" />
                        <Grid container sx={{ mt: '10px', mb: '20px' }}>

                            <Grid container spacing={2}>

                                <FormSelectController
                                    xs={12}
                                    md={3}
                                    control_form={control_destinatario}
                                    control_name={'tipo_documento'}
                                    default_value=''
                                    rules={{}}
                                    label='Tipo de documento'
                                    disabled={false}
                                    helper_text=''
                                    select_options={tipo_documento}
                                    option_label='label'
                                    option_key='value'
                                    multiple={false}
                                    hidden_text={false}
                                    auto_focus={false}
                                />
                                <FormInputController
                                    xs={12}
                                    md={3}
                                    margin={0}
                                    control_form={control_destinatario}
                                    control_name="numero_documento"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Número de documento"}
                                />
                                <FormInputController
                                    xs={12}
                                    md={3}
                                    margin={0}
                                    control_form={control_destinatario}
                                    control_name="primer_nombre"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Nombre"}
                                />
                                <FormInputController
                                    xs={12}
                                    md={3}
                                    margin={0}
                                    control_form={control_destinatario}
                                    control_name="primer_apellido"
                                    default_value=''
                                    rules={{}}
                                    type="text"
                                    disabled={false}
                                    helper_text=""
                                    hidden_text={null}
                                    label={"Apellido"}
                                />


                                <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={mostrar_busqueda}

                                    >
                                        Buscar
                                    </LoadingButton>
                                </Grid>

                            </Grid>



                            <>
                                <Grid item xs={12}>
                                    <Title title="Resultados de la búsqueda" />
                                    {/* <Typography>Resultados de la búsqueda</Typography> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <>
                                            <DataGrid
                                                density="compact"
                                                autoHeight
                                                columns={columns}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                rows={persona}
                                                getRowId={(row) => row.id_persona} />
                                        </>
                                    </Box>
                                </Grid>
                            </>



                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BusquedaAvanzada;