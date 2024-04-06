/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFiles } from "../../../../../hooks/useFiles/useFiles";
import { MetadatosInfo } from "./MetadatosInfo";
import Divider from '@mui/material/Divider';


export const Metadatos = () => {
    const [archivo, setArchivo] = useState<File | null>(null);
    console.log("archivo", archivo);

    const { controlar_tamagno_archivos } = useFiles();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            // Verificar que 'file' sea un objeto 'File' antes de asignar al estado
            if (file instanceof File) {
                // Utilizar controlar_tamagno_archivos aquí
                controlar_tamagno_archivos(file, (newValue: any) => {
                    setArchivo(newValue);
                });
            }
        }
    };

    const handleClearFile = () => {
        setArchivo(null);
    };

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
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                {/* <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Fecha de Salida"
                        value={"hola"}
                        style={{ marginTop: 15, width: '90%' }}
                    />
                </Grid> */}


                <Grid item xs={2}>
                    <Button
                        variant="outlined"
                        component="label"
                        style={{
                            marginTop: 15,

                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        {archivo === null
                            ? 'Subir archivo'
                            : 'Archivo subido'}
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            onChange={handleFileChange}
                        />
                    </Button>
                </Grid>

                {archivo && (<>
                    <Grid item xs={5}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            style={{ marginTop: 15, width: "95%" }}
                            label="Nombre del Archivo"
                            value={archivo.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="outlined"
                            color="error"
                            style={{ marginTop: 15 }}
                            startIcon={<DeleteIcon />}
                            onClick={handleClearFile}
                        >
                            Quitar Archivo
                        </Button>
                    </Grid>
                </>
                )}
                <Grid item xs={12}>

                    <Divider style={{ marginTop: 15 }} />

                </Grid>

                <MetadatosInfo />

            </Grid>
        </>
    );
};
