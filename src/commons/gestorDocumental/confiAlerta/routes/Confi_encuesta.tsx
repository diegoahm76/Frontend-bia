import { Route, Routes, Navigate } from 'react-router-dom';
import { Encabezado } from '../components/Encabezado';
import { EncabezadoCrear } from '../components/EncabezadoCrear';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const Confi_Encuasta_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/encuesta" element={< Encabezado />} />  
            {/* <Route path="/crear" element={< EncabezadoCrear />} /> */}
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
        
    );
};

