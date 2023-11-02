/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Typography } from "@mui/material";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export const CustomTabPanel  = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/*revisar cuidadosamente porque el elemento no solo va a recibir un escrito simplemente*/}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}