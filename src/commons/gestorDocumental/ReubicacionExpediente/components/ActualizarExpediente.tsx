/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { miEstilo } from '../interfaces/types';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography, } from '@mui/material';
import FolderIcon from "@mui/icons-material/Folder";

const initialState = [
    {
        id: 'l1',
        title: 'General settings',
        content: 'Nulla facilisi. Phasellus sollicitudin...',
    },
    {
        id: 'l2',
        title: 'Users',
        content: 'Donec placerat, lectus sed mattis...',
        
    },
    {
        id: 'l3',
        title: 'miguel',
        content: 'Donec placerat, lectus sed mattis...',
    },
    // Agrega los otros paneles aquí...
];

export const ActualizarExpediente: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [panels, setPanels] = React.useState(initialState);
    // const [deletedItems, setDeletedItems] = React.useState([]); // Estado para almacenar el historial de borrados
    const [deletedItems, setDeletedItems] = React.useState<{ id: string; title: string; content: string; }[]>([]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleDelete = (panelId: string) => {
        // Actualizamos los paneles y guardamos los borrados en el historial
        setPanels(prevPanels => {
            const updatedPanels = prevPanels.map(panel => {
                if (panel.id === panelId) {
                    setDeletedItems([...deletedItems, { ...panel }]);
                    return { ...panel, content: '' };
                }
                return panel;
            });
            return updatedPanels;
        });
    };

    const handleUndo = (panelId: string) => {
        // Encontrar el item en el historial y restaurar su contenido
        const itemToRestore = deletedItems.find(item => item.id === panelId);

        if (itemToRestore) {
            setPanels(prevPanels => prevPanels.map(panel => {
                if (panel.id === panelId) {
                    return { ...panel, content: itemToRestore.content };
                }
                return panel;
            }));

            // Quitar el item del historial de borrados
            setDeletedItems(prevDeletedItems => prevDeletedItems.filter(item => item.id !== panelId));
        }
    };

    return (
        <>
            <Grid container
                item xs={12} spacing={2} marginLeft={2} marginRight={2} marginTop={3}
                sx={miEstilo}
            >
                <Grid item xs={12} >

                    <Title title="Actualización de ubicación física " />
                </Grid>

                <Grid item xs={12} marginTop={2}>
                    {panels.map(panel => (
                        <Accordion expanded={expanded === panel.id} onChange={handleChange(panel.id)} key={panel.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${panel.id}bh-content`}
                                id={`${panel.id}bh-header`}
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                <Grid item   container>


                                    <Grid item xs={2} >
                                        <FolderIcon />  
                                    </Grid>
                                    <Grid item xs={10} >
                                         {panel.title}
                                    </Grid>
                                </Grid>

                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {panel.content}
                                    <Button onClick={() => handleDelete(panel.id)}>borrar</Button>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>

                <>
                    {/* Tu Grid y Accordions aquí como lo tenías antes... */}
                    <Grid item xs={12} sm={12}>

                        <h1>Historial de ubicación fisicas  Borradas</h1>
                    </Grid>

                    {deletedItems.length > 0 ? (
                        <ul>
                            {deletedItems.map(item => (
                                <li key={item.id}>
                                    {item.title}: {item.content}
                                    <Button onClick={() => handleUndo(item.id)}>Devolver</Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Grid item xs={12} sm={12}>

                            <p>No hay historial de borrados.</p>
                        </Grid>

                    )}
                    {/* Resto de tu componente... */}
                </>



                <Grid item xs={12} sm={7.8}></Grid>
                {/* <Grid item xs={12} sm={1}>
                    <ButtonSalir />
                </Grid> */}
                <Grid item xs={12} sm={1.6}>
                    <Button startIcon={<SaveIcon />} color='success' fullWidth variant="contained">
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1.6}>
                    <Button
                        color='primary' variant="outlined" fullWidth startIcon={<CleanIcon />}
                    >
                        Limpiar
                    </Button>
                </Grid>
            </Grid>

        </>
    );
};
