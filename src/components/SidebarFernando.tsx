import { Box, Divider, Drawer, Toolbar, Typography } from '@mui/material';

interface Props {
  drawer_width: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SidebarFernando: React.FC<Props> = ({
  drawer_width = 240,
}: Props) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawer_width }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawer_width,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6">Encabezado</Typography>
        </Toolbar>
        <Divider />
        {/* Lista de menu */}
      </Drawer>
    </Box>
  );
};
