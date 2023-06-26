
import { MostrarEditables } from "../components/Editables/MostrarEditables";
import { MostrarEntidad } from "../components/Entidad/MostrarEntidad";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionEntidad: React.FC = () => {
    return (
        <>
            <MostrarEntidad/>
            <br /> {/* Salto de línea */}
            <MostrarEditables/>
        </>
    );
}