import { Box } from '@mui/material';
import { NavBar, SideBar } from '../components';

const drawer_width = 300;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MainLayout: React.FC<any> = ({ children }: any) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <NavBar drawer_width={drawer_width} />
      {/* Sidebar */}
      <SideBar drawer_width={drawer_width} />
      {/* Container */}
      
        {children}
     
    </Box>
  );
};
