/* eslint-disable @typescript-eslint/naming-convention */
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { LJaguarBlanco } from '../../../home/portada/LJaguarBlanco';
import { Jaguar } from '../../../home/portada/Jaguar';

export const Footer = () => {
  const theme = useTheme();
  const isDesktopOrLaptop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <section
      style={{
        marginTop: '0px',
        position: 'relative',
        backgroundPosition: 'center',
        height: '81vh',
        width: '100%',
      }}
    >
      <footer
        style={{
          position: 'absolute',
          right: '0px',
          marginTop: isDesktopOrLaptop ? '50px' : '20px',
          maxHeight: '230px',
          left: '0px',
          bottom: '0px',
          width: '100%',
          paddingTop: '10px',
          height: 'auto',
          backgroundColor: '#042f4a',
          textAlign: 'center',
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: isDesktopOrLaptop ? '1fr 1fr 1fr' : '1fr',
          placeItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDesktopOrLaptop && <Jaguar />}

        <LJaguarBlanco />
        <section>
          <p
            style={{
              color: '#fff',
              marginTop: '2px',
              marginBottom: '2px',
              fontWeight: 'bold',
              textAlign: 'center',
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
              textAlign: 'center',
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
              textAlign: 'center',
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
              textAlign: 'center',
            }}
          >
            Villavicencio, CO
          </p>
          <a
            href="https://instagram.com/cormacarena?igshid=MzRlODBiNWFlZA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              sx={{
                color: '#fff',
                width: '50px',
                fontSize: '30px',
              }}
            />
          </a>
          <a
            href="https://www.facebook.com/CORMACARENA.CDS?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
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
    </section>
  );
};
