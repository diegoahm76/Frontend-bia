import { Grid } from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

// import logo_bia from '.../../../assets/logos/logo_bia.png';
import { LoginForm } from '../components/LoginForm';
import { useSelector } from 'react-redux';
import { RegisterForm } from '../components/RegisterForm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoginScreen: React.FC = () => {
  const { tab } = useSelector((state: any) => state.auth);

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'primary.main',
      }}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          item
          className="box-shadow"
          xs={12}
          sm={tab === '2' ? 9 : 6}
          md={tab === '2' ? 6 : 5}
          lg={tab === '2' ? 4 : 3}
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 5,
          }}
        >
          <TabContext value={tab}>
            <TabPanel value="1">
              {/* <img src={logo_bia} alt="logo bia" /> */}
              <LoginForm />
            </TabPanel>
            <TabPanel value="2">
              {/* Tab para el registro de usuario */}
              <RegisterForm />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Grid>
  );
};
