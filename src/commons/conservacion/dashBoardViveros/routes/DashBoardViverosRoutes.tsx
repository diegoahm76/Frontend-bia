import { Route, Routes } from 'react-router-dom';
import { Page404 } from '../../../../screens/404';
import { DashBoardViverosScreen } from '../screens/DashBoardViverosScreen';
;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DashBoardViverosRoutes: React.FC = () => {
  return (
    
    <Routes>
      <Route path="viveros" element={<DashBoardViverosScreen/>} />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};
