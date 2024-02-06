/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from "react";
import { Persona } from "../../interface/IwordFlow";
import { BuscadorPersona } from "../../../ventanilla/registroPersonas/BuscadorPersonaV";
import { Grid } from "@mui/material";
interface PropsBuscador {
  onResultt: (persona: Persona | undefined) => void; // Modificado para manejar el caso cuando no se selecciona ninguna persona
}

export const BuscadorPerzonasStiven = ({ onResultt }: PropsBuscador) => {

  const on_result = async (info_persona: Persona): Promise<void> => {
    onResultt(info_persona); // Llamar a la función proporcionada con la información de la persona
  };

  return (
    <div>
   
        <BuscadorPersona
          onResult={(data) => {
            void on_result(data);
          }}
        />

    </div>
  );
}