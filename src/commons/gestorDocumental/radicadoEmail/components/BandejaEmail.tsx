/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { control_success } from '../../../../helpers';
import { miEstilo } from '../../Encuesta/interfaces/types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, Button, Grid, IconButton } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { MiniMap } from 'reactflow';


// eslint-disable-next-line @typescript-eslint/naming-convention

export interface IProps {
    steps: any;
    handleNext: any;
    activeStep: any;
    handleBack: any;
    selectedEmail: any;
    setSelectedEmail: any;
    handleEnd: any;
}
interface Email {
    ID: any;
    Fecha: any;
    Asunto: any;
    Mensaje: any;
    Remitente: any;
    ArchivosAdjuntos: Adjunto[];
}

interface Adjunto {
    ruta: string;
    formato: string;
    md5_hexdigest: string;
    Nombre_archivo: string;
}

export const BandejaEmail: React.FC<IProps> = ({ handleEnd, handleBack, steps, activeStep, handleNext, setSelectedEmail, selectedEmail }) => {
    const [Email, setEmail] = useState<Email[]>([]);
    const [mensaje, setMensaje] = useState('');


    const [totalPaginas, setTotalPaginas] = useState(0); // Estado para el total de páginas

    const [currentNumber, setCurrentNumber] = useState(1);


    const fetchEmail = async (): Promise<void> => {
        try {
            const url = `/gestor/pqr/radicacion-email/login-email/?page=${currentNumber}`;
            const res = await api.get(url);
            const EmailData: Email[] = res.data?.data || [];
            setTotalPaginas(res.data?.total_páginas || 0);

            setEmail(EmailData);
            control_success("Correos esncontrados");

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchEmail();
    }, [currentNumber]);
    // const [mensajeSeleccionado, setMensajeSeleccionado] = useState('');

    const handleDelete = async (ID: any) => {
        try {
            await api.delete(`/gestor/pqr/eliminar-correo/${ID}/`);
            // Aquí puedes añadir código para actualizar tu estado y reflejar el cambio en la UI
            console.log('Correo eliminado con éxito');
            fetchEmail()
            control_success("Correo eliminado exitosamente");

        } catch (error) {
            console.error('Error al eliminar el correo:', error);
        }
    };

    const columns = [
        { field: 'Asunto', headerName: 'Asunto', minWidth: 700},
        { field: 'Remitente', headerName: 'Remitente', minWidth: 500},
        { field: 'Fecha', headerName: 'Fecha', minWidth: 180, renderCell: (params: any) => (new Date(params.row.Fecha).toLocaleString())},
        {
            field: 'Mensaje',
            headerName: 'Mensaje',
            width: 150,
            renderCell: (params: any) => (
                <IconButton
                    color="primary"
                    onClick={() => { setMensaje(params.row.Mensaje), setIsModalOpen(true); }}
                    disabled={params.row.Mensaje === ""} // Disable button if Mensaje is empty
                >
                    <VisibilityIcon />
                </IconButton>
            ),
        },
        {
            field: 'verAdjuntos',
            headerName: 'Ver Adjuntos',
            width: 150,
            renderCell: (params: any) => (
                <IconButton
                    color="primary"
                    onClick={() => { setSelectedEmail(params.row), handleNext(); }}
                    disabled={params.row.ArchivosAdjuntos.length === 0}
                >
                    <PlaylistAddCheckIcon />
                </IconButton>
            ),
        },
        {
            field: 'Radicar',
            headerName: 'Radicar',
            width: 150,
            renderCell: (params: any) => (
                <IconButton
                    color="primary"
                    onClick={() => { handleEnd() }}
                >
                    <SendIcon />
                </IconButton>
            ),
        },
        {
            field: 'eliminar',
            headerName: 'Eliminar',
            width: 150,
            renderCell: (params: any) => (
                <IconButton color='error' onClick={() => handleDelete(params.row.ID)}>
                    <DeleteIcon />
                </IconButton>
            )
        },
    ];
 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handle_close = (): void => {
        setIsModalOpen(false)
    };

    const handleSum = () => {
        if (currentNumber < totalPaginas) {
            setCurrentNumber(currentNumber + 1);
        }
    };

    const handleSubtract = () => {
        if (currentNumber > 1) {
            setCurrentNumber(currentNumber - 1);
        }
    };

    return (
        <>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >

                <Grid item xs={12} sm={12}>
                    <Title title="Buzón de Email" />
                </Grid>
                <Dialog
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                    open={isModalOpen}
                    onClose={handle_close}
                    maxWidth="xl"
                >

                    <Grid
                        container spacing={2}
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26'
                        }}
                    >

                        <Grid item xs={12} sm={12}>
                            <Title title={`Mensaje`} />
                        </Grid>
                        <Grid item xs={11} sm={11}>
                            <h5>
                                {mensaje}
                            </h5>

                        </Grid>




                    </Grid>
                </Dialog>
                <Grid item xs={12} sm={12}>
                    <DataGrid
                        autoHeight
                        pageSize={15}
                        columns={columns}
                        density="compact"
                        rowsPerPageOptions={[10]}
                        rows={Email || []}
                        getRowId={(row) => row.ID}

                    />
                </Grid>
                <Grid item xs={12} sm={10}>
                    
                </Grid>

                <Grid item >
                    <Button onClick={handleSubtract}>Anterior</Button>
                </Grid>
                <Grid item >
                    <Button onClick={handleSum}>Siguiente pagina</Button>
                </Grid>
            </Grid>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >

                <Grid item xs={4} sm={2}>
                    <Button fullWidth variant='contained' disabled={activeStep === 0} onClick={handleBack}>
                        Anterior
                    </Button>
                </Grid>


            </Grid>
        </>
    );
};