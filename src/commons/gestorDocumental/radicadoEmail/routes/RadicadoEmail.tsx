import { Route, Routes, Navigate } from 'react-router-dom';
import { Email } from '../components/Email';
  

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Radicado_Email_Routes: React.FC = () => {
    return (
        <Routes>
            <Route path="/radicado_email" element={<  Email />} />
            <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
    );
};

