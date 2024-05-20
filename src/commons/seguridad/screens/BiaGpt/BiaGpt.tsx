/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import './styles.css';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from '@mui/icons-material/Close';
import { getOutModule } from '../../../../utils/functions/getOutOfModule';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { useFiles } from '../../../../hooks/useFiles/useFiles';
export const BiaGpt = (): JSX.Element => {
  //* const navigate declaration
  const navigate = useNavigate();
  const [isChatOpen, setChatOpen] = useState<boolean>(true);

  const { mod_dark } = useSelector(
    (state: {
      layout: {
        mod_dark: boolean;
      };
    }) => state.layout
  );

  const { representacion_legal, userinfo } = useAppSelector(
    (state) => state.auth
  );

  const { tamagno_archivos } = useFiles();

  console.log(
    'representante_legalrepresentante_legalrepresentante_legal',
    representacion_legal
  );

  useEffect(() => {
    console.log('userinfouserinfouserinfo', userinfo);
    console.log(
      'tamagno_archivostamagno_archivostamagno_archivos',
      tamagno_archivos
    );
  }, [mod_dark, representacion_legal]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ m: '20px 0' }}
      >
        <Button
          startIcon={isChatOpen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          variant="contained"
          color={
            mod_dark ? 'secondary' : 'primary'
          } /* Cambia el color de fondo */
          onClick={() => setChatOpen(!isChatOpen)}
        >
          {isChatOpen ? 'Cerrar Chat' : 'Abrir Chat'}
        </Button>
        <Button
          color="error"
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={() => {
            getOutModule(
              navigate,
              [() => {}],
              '¿Está seguro que desea salir del módulo?'
            );
          }}
        >
          SALIR DEL MÓDULO
        </Button>
      </Stack>

      {!isChatOpen && (
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: mod_dark ? '#fff' : '#000',
            fontWeight: 'bold',
            mt: '4.5rem',
            mb: '2.5rem',
          }}
        >
          ¡Chat cerrado!
        </Typography>
      )}
      <section
        className={isChatOpen ? 'open' : 'closed'}
        style={{
          display: 'flex',
          margin: '13px',
          placeContent: 'center',
          height: '100%',
          // minHeight: '1000px',
          position: 'relative', // Añade esta línea
        }}
      >
        <iframe
          src={process.env.REACT_APP_BIA_GPT}
          width="70%"
          style={{
            boxShadow: mod_dark
              ? '0px 0px 0px 0px rgba(255,255,255,0.75)' // Cambia esto a blanco
              : '0px 0px 0px 0px rgba(0,0,0,0.75)',
            margin: '13px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            borderRadius: '10px',
          }}
          frameBorder="0"
        ></iframe>
        <div // Este es el nuevo elemento que se superpone
          style={{
            position: 'absolute',
            bottom: '2.5%',
            height: '30px',
            width: '60%',
            backgroundColor: '#fff', // Cambia esto al color que prefieras
          }}
        ></div>
      </section>
    </>
  );
};
