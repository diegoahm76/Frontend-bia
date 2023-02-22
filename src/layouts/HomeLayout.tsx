import { Box } from '@mui/material';
import { NavBar, SidebarFernando } from '../global/components/';

const drawer_width = 300;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HomeLayout: any = ({ children }: any) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <NavBar drawer_width={drawer_width} />
      {/* Sidebar */}
      <SidebarFernando drawer_width={drawer_width} />

      <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
