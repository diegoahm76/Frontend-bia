/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Title } from "../../../../components";
import ReplyIcon from '@mui/icons-material/Reply';
import { Grid, Button, Typography } from "@mui/material";
import { miEstilo } from "../../Encuesta/interfaces/types";
import { DownloadButton } from "../../../../utils/DownloadButton/DownLoadButton";


export interface IProps {
    selectedEmail: any;
    setSelectedEmail: any;
    activeStep: any;
    steps: any;
    handleBack: any;
    handleNext: any;
}

export const VerMensaje: React.FC<IProps> = ({ handleNext, steps, handleBack, activeStep, setSelectedEmail, selectedEmail }) => {


    
    const columns = [
        { field: 'Nombre_archivo', headerName: 'Nombre Archivo', flex: 1, width: 200 },
        // { field: 'ruta', headerName: 'Ruta',flex: 1, width: 250 },
        { field: 'md5_hexdigest', headerName: 'MD5', flex: 1, width: 200 },
        { field: 'formato', headerName: 'Formato', flex: 1, width: 200 },
        {
            field: 'ruta',
            headerName: 'ruta',
            width: 100,
            flex: 1,
            renderCell: (params: any) => (
                <DownloadButton
                    condition={false}
                    fileUrl={params.row.ruta}
                    fileName={params.row.Nombre_archivo}
                />
            )
        },
     ];

    return (
        <>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >
                <Grid item xs={12} sm={12}>
                    <Title title="Email      " />
                </Grid>

                <Grid marginTop={2} item xs={12} sm={12}>
                    <Typography variant="subtitle2" gutterBottom>
                        ASUNTO : {selectedEmail?.Asunto}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        REMITENTE : {selectedEmail?.Remitente}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        FECHA : {selectedEmail?.Fecha}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        MENSAJE : {selectedEmail.Mensaje}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                    {selectedEmail && (
                        <DataGrid
                            density="compact"
                            autoHeight
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            columns={columns}
                            rows={selectedEmail.ArchivosAdjuntos}
                            getRowId={(row) => row.Nombre_archivo}
                        />
                    )}
                </Grid>





            </Grid>
            <Grid container
                spacing={2} m={2} p={2}
                sx={miEstilo}
            >

                <Grid item xs={4} sm={2}>
                    <Button startIcon={<ReplyIcon />} fullWidth color='error'  variant='contained' disabled={activeStep === 0} onClick={handleBack}>
                    Regresar
                    </Button>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Button fullWidth variant='contained' disabled={activeStep === steps.length - 1} onClick={handleNext}>
                        Radicar
                    </Button>

                </Grid>

            </Grid>


        </>
    );
};