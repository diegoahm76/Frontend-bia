import { Grid } from "@mui/material"
import { Title } from '../../../../components/Title';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const CatalogodeBienesScreen: React.FC = () => {
    return (
      <>
      <Title title='INFORMACIÓN GENERAL' />
      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      ></Grid></>

        
   
    )
}

