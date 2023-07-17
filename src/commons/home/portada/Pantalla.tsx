/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CumpleCormacarena } from './imagen';
import { Jaguar } from './Jaguar';
import { LJaguarBlanco } from './LJaguarBlanco';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Pantalla: React.FC = () => {
  return (
    <section
      
        style={{
    marginTop: '0px',
    position: 'relative',
    backgroundImage: 'url(../image/imagenes/FondoCormaca.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%'
  }}
    >
      <footer
        style={{
          position: 'absolute',
          right: '0px',
          marginTop: '50px',
          maxHeight: '230px',
          left: '0px',
          bottom: '0px',
          width: '100%',
          paddingTop: '10px',
          // padding: '0px 20px 0px 20px',

          height: 'auto',
          backgroundColor: '#042f4a',
          // opacity: '0.8',
          textAlign: 'center',
          display: 'grid',
          // height: '10vh',

          alignItems: 'center',
          gridTemplateColumns: '1fr 1fr 1fr',
          placeItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Jaguar />

        <LJaguarBlanco />
        <section>
          <p
            style={{
              color: '#fff',
              marginTop: '2px',
              marginBottom: '2px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Horario de atención: 8:00am - 6:00pm
          </p>
          <p
            style={{
              color: '#fff',
              marginTop: '2px',
              marginBottom: '2px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Linea nacional: 01-8000-51847095
          </p>
          <p
            style={{
              color: '#fff',
              marginTop: '2px',
              marginBottom: '2px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            info@cormacarena.gov.co
          </p>
          <p
            style={{
              color: '#fff',
              marginTop: '2px',
              marginBottom: '10px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Villavicencio, CO
          </p>
          <a href="https://instagram.com/cormacarena?igshid=MzRlODBiNWFlZA=="
            target="_blank" rel="noopener noreferrer"
          >
          <InstagramIcon
            sx={{
              color: '#fff',
              width: '50px',

              fontSize: '30px',
            }}
          />
          </a>
          <a href="https://www.facebook.com/CORMACARENA.CDS?mibextid=LQQJ4d"
            target="_blank" rel="noopener noreferrer"
          >
          <FacebookIcon
            sx={{
              color: '#fff',
              width: '50px',

              fontSize: '30px',
            }}
          />
          </a>
        </section>
      </footer>
      {/* <CumpleCormacarena />*/}
    </section>
  );
};
