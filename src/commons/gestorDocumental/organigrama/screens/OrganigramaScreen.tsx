import { type SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ListOrganigramas } from '../componentes/ListOrganigramas';
import { EditarOrganigrama } from '../componentes/EditarOrganigrama';
import { clean_current_organigram } from '../store/slices/organigramSlice';
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const OrganigramaScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [position_tab, set_position_tab_organigrama] = useState('1');
  const { organigram_current } = useAppSelector((state) => state.organigram);
  const handle_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab_organigrama(newValue);
    void dispatch(clean_current_organigram());
  };

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Title title="ORGANIGRAMAS" />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={position_tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handle_change} aria-label="lab API tabs example">
              <Tab label="Organigramas" value="1" />
              <Tab
                label={
                  organigram_current.fecha_terminado !== null
                    ? 'Ver organigrama'
                    : 'Editar organigrama'
                }
                disabled={position_tab === '1' && true}
                value="2"
              />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: '20px 0' }}>
            <ListOrganigramas
              set_position_tab_organigrama={set_position_tab_organigrama}
            />
          </TabPanel>
          <TabPanel value="2" sx={{ p: '20px 0' }}>
            <EditarOrganigrama
              set_position_tab_organigrama={set_position_tab_organigrama}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Grid>
  );
};
