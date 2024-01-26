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


// eslint-disable-next-line @typescript-eslint/naming-convention
interface DataRow {
    codigo_rio: number;
    nuevo_dato?: string;
    nombre_sub_zona_hidrica:any;
    nombre_zona_hidirca:any;
    nombre_zona_hidrica_macrocuenca:any;
}

export const ValorRegional: React.FC = () => {

    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [newData, setNewData] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handle_close = (): void => {
        setIsModalOpen(false)
        setEditingRow(null);
        setNewData('');

    };
    const columns = [
        { field: 'nombre_zona_hidrica_macrocuenca', headerName: 'nombre zona hidrica macrocuenca  ', width: 130, flex: 1 },
        { field: 'nombre_zona_hidirca', headerName: 'nombre zona hidirca  ', width: 130, flex: 1 },
        { field: 'nombre_sub_zona_hidrica', headerName: 'nombre sub zona hidrica  ', width: 130, flex: 1 },
        { field: 'codigo_rio', headerName: 'codigo rio  ', width: 130, flex: 1 },
        // { field: 'valor_regional', headerName: 'valor regional  ', width: 130, flex: 1 }, 
        { field: 'nuevo_dato', headerName: 'valor regional  ', width: 130, flex: 1 },

        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params: any) => (
                <>
                    {editingRow === params.row.codigo_rio ? (
                        <>

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
                                            value={newData}
                                            onChange={(e) => setNewData(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item  marginTop={2} >
                                        <Button
                                            color='success'
                                            variant='contained'
                                            onClick={() => handleSave(params.row.codigo_rio)}
                                            fullWidth
                                            startIcon={<SaveIcon />}
                                        >
                                            Guardar
                                        </Button>
                                    </Grid>



                                    {/* <IconButton
                                        color="success"
                                        onClick={() => handleSave(params.row.codigo_rio)}
                                    >

                                    </IconButton> */}
                                </Grid>

                            </Dialog>

                        </>
                    ) : (
                        <IconButton
                            color="primary"
                            aria-label="Editar"
                            onClick={() => handleEdit(params.row.codigo_rio)}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                </>
            ),
        }

    ];

    const handleEdit = (codigoRio: number) => {
        setEditingRow(codigoRio);
        const currentData = data.find(row => row.codigo_rio === codigoRio);
        setNewData(currentData?.nuevo_dato || '');
        setIsModalOpen(true)

    };

    const handleSave = (codigoRio: number) => {
        const newDataArray = data.map(row => {
            if (row.codigo_rio === codigoRio) {
                return { ...row, nuevo_dato: newData };
            }
            return row;
        });
        setData(newDataArray);
        setEditingRow(null);
        setNewData('');
        setIsModalOpen(false)

    };

    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/hidrico/zonas-hidricas/data_rios_completa/');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        console.log(data);
        console.log("2222222");

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
                <Title title="Recursos Hidricos  " />





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
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            autoHeight
                            pageSize={5}
                            columns={columns}
                            rows={data}
                            getRowId={(row) => row.codigo_rio}
                        />
                    </div>
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