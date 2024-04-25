/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Grid, IconButton, Modal, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Title } from '../../../../../components/Title'
import { RenderDataGrid } from '../../../tca/Atom/RenderDataGrid/RenderDataGrid'
import Chip from '@mui/material/Chip';
import { StepperContext } from '../../context/SteperContext';
import { api } from '../../../../../api/axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Iinformacion_opa, initialDataOpa } from '../../interfaces/InterfacesInicializacionJuridicaOpas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';


export const VistaCompleta = () => {


    const { set_nombre_proyecto, activeStep, id, setActiveStep } = useContext(StepperContext);
    const [form_data, set_form_data] = useState<Iinformacion_opa>(initialDataOpa);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Función para manejar el clic del botón y cambiar el estado
    const handleShowMoreInfo = () => {
        setShowMoreInfo(!showMoreInfo);
    };



    const procesoVistaTramiete = (params: any) => {
        console.log(params);
        setActiveStep(activeStep + 1);
    };

    // Definición de columnas y datos para el DataGrid
    const columns_permisos_ambientales = [
        { field: "nombre_proyecto", headerName: "Tipo de Solicitud", flex: 1 },
        { field: "permiso_ambiental", headerName: "Permiso Abiental", flex: 1 },
        { field: "tipo_permiso_ambiental", headerName: "Tipo de Permiso", flex: 1 },
        { field: "radicado", headerName: "Radicado", flex: 1 },
        {
            field: "acciones",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <Button onClick={() => procesoVistaTramiete(params)}>
                        <VisibilityIcon />
                    </Button>
                </>
            ),
        },
    ];





    // Consulta las opciones de tipo de pago
    const consulta_informacion_opa = async () => {
        try {
            let url = `/gestor/panel_juridica/opas/informacion/get/${id}/`;
            const res = await api.get(url);
            const dataConsulta = res.data.data;
            set_form_data(dataConsulta);
            set_nombre_proyecto(dataConsulta.nombre_proyecto);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        consulta_informacion_opa();
    }, [])

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
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.relacion_con_el_titular}
                        label="Radicacion a Nombre"
                        // onChange={(e) => handleInputChange('radicado', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.radicado}
                        label="Radicado"
                        // onChange={(e) => handleInputChange('Radicado', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.cod_tipo_documento_persona_interpone}
                        label="Tipo Documento Persona Interpone"
                    // onChange={(e) => handleInputChange('nombres', e.target.value)}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.nombre_persona_interpone}
                        label="Nombre Persona Interpone"
                    // onChange={(e) => handleInputChange('cedulaCiudadania', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.numero_documento_persona_interpone}
                        label="Cédula de Ciudadanía Persona Interpone"
                    // onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.cod_tipo_documento_persona_titular}
                        label="Tipo Documento Titular"
                    // onChange={(e) => handleInputChange('nombres', e.target.value)}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.nombre_persona_titular}
                        label="Nombre Titular"
                    // onChange={(e) => handleInputChange('cedulaCiudadania', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.numero_documento_persona_titular}
                        label="Cédula de Ciudadanía Titular"
                    // onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
                    />
                </Grid>

                <Grid container alignItems="center" justifyContent="center">
                    <Grid item  >
                        <h3>Datos basicos</h3>
                    </Grid>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.nombre_proyecto}
                        label="Nombre del Proyecto"
                        // onChange={(e) => handleInputChange('NombreProyecto', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        style={{ marginTop: 15, width: '95%' }}
                        size="small"
                        variant="outlined"
                        value={form_data.costo_proyecto}
                        label="valor del Proyecto"
                        // onChange={(e) => handleInputChange('ValorProyecto', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* <Grid container alignItems="center" justifyContent="center">
                    <Grid item >
                        <Button
                            // onClick={handleShowMoreInfo}
                            onClick={handleOpenModal}
                            variant="contained"
                            style={{ marginTop: 15 }}
                            // color={showMoreInfo ? "error" : "success"}
                            startIcon={showMoreInfo ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        >
                            {showMoreInfo ? "Ocultar información" : "Mostrar más información"}
                        </Button>
                    </Grid>
                </Grid>
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <Grid container>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.municipio}
                                label="Municipio"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.fecha_ini_estado_actual}
                                label="Fecha Inicio Estado Actual"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.estado_actual_solicitud}
                                label="Estado Actual de la Solicitud"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.descripcion_direccion}
                                label="Descripción de la Dirección"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.coordenada_x}
                                label="Coordenada X"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.coordenada_y}
                                label="Coordenada Y"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.cod_municipio}
                                label="Código de Municipio"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.tipo_operacion_tramite}
                                label="Tipo de Operación de Trámite"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                    </Grid>
                </Modal> */}
                 <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                    <Button
                        onClick={handleOpenModal}
                        variant="contained"
                        style={{ marginTop: 15 }}
                        startIcon={<VisibilityIcon />}
                    >
                        Mostrar más información
                    </Button>
                </Grid>
            </Grid>

            {/* Modal para mostrar la información adicional */}
            <Modal open={isModalOpen} onClose={handleCloseModal} >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Grid container>
                        

                    <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.municipio}
                                label="Municipio"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.fecha_ini_estado_actual}
                                label="Fecha Inicio Estado Actual"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.estado_actual_solicitud}
                                label="Estado Actual de la Solicitud"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.descripcion_direccion}
                                label="Descripción de la Dirección"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.coordenada_x}
                                label="Coordenada X"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.coordenada_y}
                                label="Coordenada Y"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.cod_municipio}
                                label="Código de Municipio"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                style={{ marginTop: 15, width: '95%' }}
                                size="small"
                                variant="outlined"
                                value={form_data.tipo_operacion_tramite}
                                label="Tipo de Operación de Trámite"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>




                        <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>





                    </Grid>
                </Box>
            </Modal>

                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={10}>
                        <RenderDataGrid
                            title="Permisos Ambientales"
                            columns={columns_permisos_ambientales ?? []}
                            rows={[form_data] ?? []}
                        />
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                        <Button
                            fullWidth
                            style={{ width: "90%", marginTop: 15 }}
                            variant="contained"
                            color="error"
                            startIcon={<ArrowBackIcon />} // Agrega el icono de flecha hacia atrás
                            onClick={() => {
                                setActiveStep(activeStep - 1);
                            }}
                        >
                            Volver
                        </Button>
                    </Grid>
                </Grid>



            </Grid>
        </>
    )
}
