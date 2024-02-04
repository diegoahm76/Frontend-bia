/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Divider, Button, Grid, Dialog, ButtonGroup, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
// import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import Chip from '@mui/material/Chip';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { miEstilo } from '../../../gestorDocumental/Encuesta/interfaces/types';
import { Title } from '../../../../components';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';


// eslint-disable-next-line @typescript-eslint/naming-convention
interface DataRow {
    codigo_rio: number;
    nuevo_dato?: string;
    nombre_sub_zona_hidrica: any;
    nombre_zona_hidirca: any;
    nombre_zona_hidrica_macrocuenca: any;
}

export const ValorRegional: React.FC = () => {

    const [editingRow, setEditingRow] = useState<number | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handle_close = (): void => {
        setIsModalOpen(false)
        setvalor_regional('');
    };
    const [valor_regional, setvalor_regional] = useState<string>('');

    const actualizarValorRegional = async () => {
        try {
            const response = await api.put(`/hidrico/zonas-hidricas/sub_zona_hidrica/update/${editingRow}/`, {
                valor_regional: valor_regional
            });
            console.log('Respuesta del servidor:', response.data);
            control_success("Valor regional agregado  ");
            fetchData();
            setIsModalOpen(false)

            // Aquí puedes agregar lógica adicional después de la actualización exitosa
        } catch (error: any) {
            console.error('Error al actualizar el valor regional:', error);
            control_error(error.response.data.detail);
        }
    };


    const columns = [
        { field: 'nombre_zona_hidrica_macrocuenca', headerName: ' Zona hidrica macrocuenca  ', width: 130, flex: 1 },
        { field: 'nombre_zona_hidirca', headerName: ' Zona hidirca  ', width: 130, flex: 1 },
        { field: 'nombre_sub_zona_hidrica', headerName: ' Zub zona hidrica  ', width: 130, flex: 1 },
        { field: 'codigo_rio', headerName: 'codigo rio  ', width: 130, flex: 1 },
        { field: 'valor_regional', headerName: 'Factor regional', width: 130, flex: 1 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params: any) => (

                <>
                    <IconButton
                        color="primary"
                        aria-label="Editar"
                        onClick={() => { setEditingRow(params.row.id_sub_zona_hidrica), setIsModalOpen(true) }}
                    >
                        <EditIcon />
                    </IconButton>

                  

                </>

            ),
        }

    ];





    const [data, setData] = useState<DataRow[]>([]);
    const fetchData = async () => {
        try {
            const response = await api.get('/hidrico/zonas-hidricas/data_rios_completa/');
            setData(response.data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (): void => {
        if (!searchTerm.trim()) {
            fetchData();
            return;
        }
        const filteredEncuestas = data.filter(encuesta =>
            encuesta.nombre_sub_zona_hidrica.toLowerCase().includes(searchTerm.toLowerCase())
            
        );

        setData(filteredEncuestas);
    };
    return (
        <>
            {/* <div>
                <button onClick={handleClick}>consola  </button>
            </div> */}
            <Grid container
                item xs={12} spacing={2} marginLeft={2} marginRight={2} marginTop={3}
                sx={miEstilo}
            >

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
                            <Title title="Ingresar valor regional    " />


                            <Grid item xs={12} marginTop={2} sm={12}>
                                <TextField
                                    variant="outlined"
                                    label="Valor regional"
                                    size="small"
                                    fullWidth
                                    value={valor_regional}
                                    onChange={(e) => setvalor_regional(e.target.value)}
                                />
                            </Grid>
                            <Grid item marginTop={2} >
                                <Button
                                    color='success'
                                    variant='contained'
                                    fullWidth
                                    startIcon={<SaveIcon />}
                                    onClick={actualizarValorRegional} // Agregar el evento onClick
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </Grid>

                    </Dialog>
                <Title title="Factor regional recurso hídrico " />



                <Grid item xs={12} marginTop={2} sm={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Nombre sub zona hidrica"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>

                <Grid item marginTop={2} marginLeft={2} xs={12} sm={1.5}>
                    <Button variant="contained" color='primary' onClick={handleSearch}>
                        Buscar
                    </Button>
                </Grid>



                <Divider
                    style={{
                        width: '98%',
                        marginTop: '8px',
                        marginBottom: '8px',
                        marginLeft: 'auto',
                    }}
                />
                <Grid item xs={12} sm={11} >

                </Grid>

                <Grid item   >
                    <ButtonGroup style={{ margin: 5, }}>
                        {download_xls({ nurseries: data, columns })}
                        {download_pdf({
                            nurseries: data,
                            columns,
                            title: 'Mis alertas',
                        })}
                    </ButtonGroup>
                </Grid>



                <Grid item xs={12} sm={12} marginTop={2}>
                    <DataGrid
                        autoHeight
                        pageSize={10}
                        columns={columns}
                        rows={data}
                        getRowId={(row) => row.codigo_rio}
                    />
                </Grid>
            </Grid>



            {/* <RenderDataGrid
                title=''
                columns={columns ?? []}
                rows={data ?? []}
            /> */}
        </>
    );
};