import { Route, Routes, Navigate } from 'react-router-dom';
import { ConslitaOtrosExterno } from '../components/conslitaOtrosExterno';
     

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Consulta_OtrosExterno_Routes: React.FC = () => {
    return (
        <Routes>
            {/* <Route path="/ConsultaOtrosExterno" element={<ConslitaOtrosExterno/>} /> */}
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

