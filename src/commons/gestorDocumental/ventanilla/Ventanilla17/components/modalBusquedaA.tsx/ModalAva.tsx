import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { BuscadorPersona } from '../../../../../../components/BuscadorPersona';
import type { Persona } from '../../../../../../interfaces/globalModels';
import { Grid, TextField } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BasicModalButtonBusquedaPersona: React.FC = () => {
 // eslint-disable-next-line @typescript-eslint/naming-convention
   const [open, setOpen] = useState(false);

 // eslint-disable-next-line @typescript-eslint/naming-convention
   const handleOpen = ():void => {
        setOpen(true);
    };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleClose = ():void => {
        setOpen(false);
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [persona, set_persona] = useState<Persona | undefined>();
    console.log(persona);

    const on_result = async (info_persona: Persona): Promise<void> => {
        set_persona(info_persona);

    }
    const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido } = persona ?? {}; // Usar el operador de encadenamiento opcional (??) para manejar persona undefined

    const nombre_completo = `${primer_nombre ?? ""} ${segundo_nombre ?? ""} ${primer_apellido ?? ""} ${segundo_apellido ?? ""}`;
    const nombre = nombre_completo ?? "";



    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Busqueda Avanzada
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '45%',
                      
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                  

                    <BuscadorPersona
                                onResult={(data) => {
                                    void on_result(data);
                                }}
                            />

                    <Grid item xs={12} >

                        <TextField
                            style={{ margin: 6 }}
                            label="Nombre Completo"
                            variant="outlined"
                            size="small"
                            disabled
                            fullWidth
                            value={nombre}
                        />
                    </Grid>

                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{ mt: 2, justifyContent: 'center' }}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};


