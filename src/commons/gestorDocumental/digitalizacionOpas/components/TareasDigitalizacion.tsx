/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { miEstilo } from '../../Encuesta/interfaces/types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
// import { organigrama, AsignacionEncuesta, FormData, Pqr, estado, TipoPQRSDF } from '../interface/types';
import { Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import { api } from '../../../../api/axios';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';
import { useAppSelector } from '../../../../hooks';
import { useForm } from 'react-hook-form';
import { IObjExhibit } from '../../CentralDigitalizacion/interfaces/central_digitalizacion';
// import { cargarAsignaciones, cargarestado, cargarorganigrama, fetchSpqrs, fetchTipoPQRSDF } from '../services/consultaExterno.service';


export interface IProps {
    steps: any;
    handleNext: any;
    activeStep: any;
    handleEnd: any;
    handleBack: any;
    selectedEmail: any;
    setSelectedEmail: any;
}
interface opas {
    anexos: any[];
    titular: string;
    asunto: string | null;
    numero_anexos: number;
    fecha_solicitud: string;
    numero_radicado: string;
    estado_digitalizacion: string;
    nombre_tipo_solicitud: string;
    fecha_rta_solicitud: string | null;
    id_solicitud_de_digitalizacion: number;
}

 
export const TareasDigitalizacion: React.FC = () => {
    const [opas, setOpas] = useState<opas[]>([]); 

    const fetchOopas = async (): Promise<void> => {
        try {
            const url = `/gestor/central-digitalizacion/opas/get-solicitudes-pendientes/`;
            const res = await api.get(url);
            const EmailData: opas[] = res.data?.data || [];
            setOpas(EmailData);
            control_success("Correos esncontrados");
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        void fetchOopas();
    }, []);


    const {
        exhibits,
        metadata,
        exhibit,
        storage_mediums,
        digitization_request,
        file_fisico,
        edit_digitization,
      } = useAppSelector((state) => state.central_digitalizacion_slice);
      const {
        control: control_form,
        handleSubmit: handle_submit_exhibit,
        reset,
        getValues: get_values,
      } = useForm<IObjExhibit>();

    useEffect(() => {
        //  console.log('')(digitization_request);
        if (
          digitization_request.id_solicitud_de_digitalizacion !== null &&
          digitization_request.anexos !== undefined
        ) {
        //   dispatch(set_exhibits(digitization_request.anexos));
        }
      }, []);
      useEffect(() => {
        console.log("2222222222");
    
         console.log(digitization_request);
        
      }, []);

    const columns = [
        { field: 'nombre_tipo_solicitud', headerName: 'nombre_tipo_solicitud', width: 130, flex: 1 },
        { field: 'fecha_solicitud', headerName: 'fecha_solicitud', width: 130, flex: 1 },
        { field: 'numero_radicado', headerName: 'numero_radicado', width: 130, flex: 1 },
        { field: 'titular', headerName: 'titular', width: 130, flex: 1 },
        { field: 'numero_anexos', headerName: 'numero_anexos', width: 130, flex: 1 },
        { field: 'estado_digitalizacion', headerName: 'estado_digitalizacion', width: 130, flex: 1 },
    ];
   
    return (
        <>
           
           <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >

                <Grid item xs={12} sm={12}>
                    <Title title="  Tareas de digitalizacion" />
                </Grid> 
                {digitization_request.id_solicitud_de_digitalizacion }
                <Grid item xs={12} sm={12}>
                    <DataGrid
                        autoHeight
                        pageSize={15}
                        columns={columns}
                        density="compact"
                        rowsPerPageOptions={[10]}
                        rows={opas || []}
                        getRowId={(row) => row.id_solicitud_de_digitalizacion}

                    />
                </Grid>
                
               
                
            </Grid>
           
        </>
    );
};
