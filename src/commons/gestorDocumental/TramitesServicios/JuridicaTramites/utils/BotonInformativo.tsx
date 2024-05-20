/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Typography, Menu, MenuItem } from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface BotonInformativoProps {
    texto: string;
}
export const BotonInformativo: React.FC<BotonInformativoProps> = ({ texto }) => {

    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleOpen = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Texto para mostrar con saltos de línea cada 30 letras
    const informacion = texto?texto:"";

    // Función para dividir el texto en subcadenas de 30 letras
    const dividirTexto = (texto: string) => {
        const lineas: string[] = [];
        let start = 0;
        let end = 30;
        // Manejar caso en que el texto esté vacío
        if (texto.length === 0) {
            return lineas;
        }
        while (start < texto.length) {
            // Buscar el siguiente espacio dentro del rango de 30 caracteres
            while (end < texto.length && texto.charAt(end) !== ' ' && texto.charAt(end - 1) !== ' ') {
                end--;
            }
            // Agregar la línea al array
            lineas.push(texto.slice(start, end));
            // Actualizar los índices para la siguiente iteración
            start = end; // El próximo inicio será justo después del espacio
            // Omitir espacios iniciales en la siguiente línea
            while (start < texto.length && texto.charAt(start) === ' ') {
                start++;
            }
            end = start + 30; // El próximo fin será 30 caracteres después del inicio
        }
        return lineas;
    };
    
    // Dividir el texto en líneas de 30 letras
    const lineas = dividirTexto(informacion);

    return (
        <>
            <div>
                <Button
                    style={{ marginTop: 15 }}
                    id="basic-button"
                    aria-controls={anchorEl ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    variant="outlined"
                    aria-expanded={anchorEl ? 'true' : undefined}
                    onClick={handleOpen}
                >
                    <QuestionMarkIcon />
                </Button>
                <Menu
                onClick={handleClose}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {/* Renderizar cada línea del texto en un MenuItem */}
                    {lineas.map((linea, index) => (
                        <MenuItem key={index} selected={false} disabled={true} >
                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                {linea}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </>
    );
};
