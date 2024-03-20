/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from "react";
import { Persona } from "../../interface/IwordFlow";
import { BuscadorPersona } from "../../../ventanilla/registroPersonas/BuscadorPersonaV";
import { Grid, Button, Modal, Box } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
interface PropsBuscador {
  onResultt: (persona: Persona | undefined) => void;
}

export const BuscadorPerzonasStiven = ({ onResultt }: PropsBuscador) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [cerrar, set_cerrar] = useState<boolean>(false);
  const on_result = async (info_persona: Persona): Promise<void> => {
    onResultt(info_persona);
    setIsModalOpen(false); 
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
      setIsModalOpen(false); 
  }, [cerrar]);



  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>
        <PersonSearchIcon/>
      </Button>

      <Modal open={isModalOpen} onClose={handleCloseModal} autoFocus={false}>
        <Box
          sx={{
            position: "absolute",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px", // Agrega un radio de 10 píxeles al borde del Box
            boxShadow: 24,
            p: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: '90%', // Establece el ancho máximo del Box
            width: '59%', // Permite desplazamiento vertical si el contenido es demasiado grande
          }}
        >
          <BuscadorPersona
            onResult={(data) => {
              void on_result(data);
            }}
          />
          <Grid container spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Grid>

        </Box>
      </Modal>
    </div>
  );
};


