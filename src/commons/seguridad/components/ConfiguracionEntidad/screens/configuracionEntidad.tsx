
import { MostrarEditables } from "../components/Editables/MostrarEditables";
import { MostrarEntidad } from "../components/Entidad/MostrarEntidad";
import { TablaLineresUnidadesOrganizacionales } from "../components/TablaLideres/TablaLideresUnidades";
import { MostrarEmail } from "../components/TextEmail/MostarImail";
import { TablaSucursales } from "../components/tablasSucursales/tablasSucursales";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionEntidad: React.FC = () => {
 


    return (
        <>
            <MostrarEntidad />
            <MostrarEmail  /> {/* Pasa el prop emailSent a MostrarEmail */}
            <MostrarEditables />
            <br />
            <TablaSucursales />
            <br />
            <TablaLineresUnidadesOrganizacionales />

        
        </>
    );
};