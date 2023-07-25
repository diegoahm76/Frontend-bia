import { useState } from "react";
import { Button } from "@mui/material";
import { MostrarEditables } from "../components/Editables/MostrarEditables";
import { MostrarEntidad } from "../components/Entidad/MostrarEntidad";
import { TablaLineresUnidadesOrganizacionales } from "../components/TablaLideres/TablaLideresUnidades";
import { MostrarEmail } from "../components/TextEmail/MostarImail";
import { TablaSucursales } from "../components/tablasSucursales/tablasSucursales";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionEntidad: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [emailSent, setEmailSent] = useState<boolean>(false); // Estado para almacenar el valor booleano

    // eslint-disable-next-line @typescript-eslint/naming-convention
    function handleChangeEmail(): void {

        setEmailSent(true); // Establecer emailSent en true si la acción fue exitosa
    }

    return (
        <>
            <MostrarEntidad />
            <MostrarEmail parametro={emailSent} /> {/* Pasa el prop emailSent a MostrarEmail */}
            <MostrarEditables />
            <br />
            <TablaSucursales />
            <br />
            <TablaLineresUnidadesOrganizacionales />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    style={{ margin: 3 }}
                    type="submit"
                    variant="contained"
                    color="success"
                    onClick={handleChangeEmail}
                >
                    Guardar
                </Button>
            </div>
       
        </>
    );
};