import { Grid, Radio, FormLabel, TextField, Button } from "@mui/material";
import TarjetaInspeccion from "./TarjetaInspeccion";
import { useEffect, useState } from "react";
import { cambio_input_radio } from "../thunsk/cambio_input_radio";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';


// eslint-disable-next-line @typescript-eslint/naming-convention
const ElementosInspeccionar = () => {
  const [direcionales_delanteras, set_direcionales_delanteras] = useState<string>('true');
  const [direcionales_traseras, set_direcionales_traseras] = useState<string>('true');
  const [limpiabrisas_delantero, set_limpiabrisas_delantero] = useState<string>('true');
  const [limpiabrisas_trasero, set_limpiabrisas_trasero] = useState<string>('true');
  const [nivel_aceite, set_nivel_aceite] = useState<string>('true');
  const [nivel_frenos, set_nivel_frenos] = useState<string>('true');
  const [frenos_generales, set_frenos_generales] = useState<string>('true');
  const [frenos_emergencia, set_frenos_emergencia] = useState<string>('true');
  const [nivel_refrigerante, set_nivel_refrigerante] = useState<string>('true');
  const [apoyacabezas_piloto, set_apoyacabezas_piloto] = useState<string>('true');
  const [apoyacabezas_copiloto, set_apoyacabezas_copiloto] = useState<string>('true');
  const [apoyacabezas_traseros, set_apoyacabezas_traseros] = useState<string>('true');
  const [llantas_delanteras, set_llantas_delanteras] = useState<string>('true');
  const [llantas_traseras, set_llantas_traseras] = useState<string>('true');
  const [llanta_repuesto, set_llanta_repuesto] = useState<string>('true');
  const [espejos_laterales, set_espejos_laterales] = useState<string>('true');
  const [espejos_retrovisor, set_espejos_retrovisor] = useState<string>('true');
  const [cinturones_delanteros, set_cinturones_delanteros] = useState<string>('true');
  const [cinturones_traseros, set_cinturones_traseros] = useState<string>('true');
  const [luces_altas, set_luces_altas] = useState<string>('true');
  const [luces_medias, set_luces_medias] = useState<string>('true');
  const [luces_bajas, set_luces_bajas] = useState<string>('true');
  const [luces_parada, set_luces_parada] = useState<string>('true');
  const [luces_parqueo, set_luces_parqueo] = useState<string>('true');
  const [luces_reversa, set_luces_reversa] = useState<string>('true');
  const [kit_herramientas, set_kit_herramientas] = useState<string>('true');
  const [botiquin_completo, set_botiquin_completo] = useState<string>('true');
  const [pito, set_pito] = useState<string>('true');

  const [tiene_observaciones, set_tiene_observaciones] = useState<boolean>(false);

  useEffect(() => {
    const estados_individuales = [
      direcionales_delanteras,
      direcionales_traseras,
      limpiabrisas_delantero,
      limpiabrisas_trasero,
      nivel_aceite,
      nivel_frenos,
      frenos_generales,
      frenos_emergencia,
      nivel_refrigerante,
      apoyacabezas_piloto,
      apoyacabezas_copiloto,
      apoyacabezas_traseros,
      llantas_delanteras,
      llantas_traseras,
      llanta_repuesto,
      espejos_laterales,
      espejos_retrovisor,
      cinturones_delanteros,
      cinturones_traseros,
      luces_altas,
      luces_medias,
      luces_bajas,
      luces_parada,
      luces_parqueo,
      luces_reversa,
      kit_herramientas,
      botiquin_completo,
      pito
    ];
    const hay_fallo = estados_individuales.some(estado => estado === 'false');
    set_tiene_observaciones(hay_fallo ? true : false);
  }, [direcionales_delanteras,
    direcionales_traseras,
    limpiabrisas_delantero,
    limpiabrisas_trasero,
    nivel_aceite,
    nivel_frenos,
    frenos_generales,
    frenos_emergencia,
    nivel_refrigerante,
    apoyacabezas_piloto,
    apoyacabezas_copiloto,
    apoyacabezas_traseros,
    llantas_delanteras,
    llantas_traseras,
    llanta_repuesto,
    espejos_laterales,
    espejos_retrovisor,
    cinturones_delanteros,
    cinturones_traseros,
    luces_altas,
    luces_medias,
    luces_bajas,
    luces_parada,
    luces_parqueo,
    luces_reversa,
    kit_herramientas,
    botiquin_completo,
    pito]);

  console.log(luces_medias === 'true' ? true : false);

  return (
    <Grid item xs={12} sx={{
      display:'flex',
      justifyContent:'space-between',
      flexWrap:'wrap'
    }}>
      <TarjetaInspeccion title="Direccionales">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Direccionales delanteras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',direcionales_delanteras,set_direcionales_delanteras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',direcionales_delanteras,set_direcionales_delanteras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Direccionales Traseras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',direcionales_traseras,set_direcionales_traseras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',direcionales_traseras,set_direcionales_traseras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Limpiabrisas">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Limpiabrisas delantero</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',limpiabrisas_delantero,set_limpiabrisas_delantero)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',limpiabrisas_delantero,set_limpiabrisas_delantero)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Limpiabrisas trasero</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',limpiabrisas_trasero,set_limpiabrisas_trasero)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',limpiabrisas_trasero,set_limpiabrisas_trasero)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Aceite">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Nivel de aceite</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',nivel_aceite,set_nivel_aceite)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',nivel_aceite,set_nivel_aceite)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Frenos">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Nivel de frenos</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',nivel_frenos,set_nivel_frenos)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',nivel_frenos,set_nivel_frenos)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Frenos principales</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',frenos_generales,set_frenos_generales)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',frenos_generales,set_frenos_generales)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Frenos de emergencia</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',frenos_emergencia,set_frenos_emergencia)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',frenos_emergencia,set_frenos_emergencia)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Refrigerante">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Nivel de refrigerante</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',nivel_refrigerante,set_nivel_refrigerante)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',nivel_refrigerante,set_nivel_refrigerante)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Apoya cabezas">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Apoya cabezas del piloto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',apoyacabezas_piloto,set_apoyacabezas_piloto)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',apoyacabezas_piloto,set_apoyacabezas_piloto)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Apoya cabeza del copiloto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',apoyacabezas_copiloto,set_apoyacabezas_copiloto)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',apoyacabezas_copiloto,set_apoyacabezas_copiloto)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Apoya cabezas traseros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',apoyacabezas_traseros,set_apoyacabezas_traseros)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',apoyacabezas_traseros,set_apoyacabezas_traseros)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Llantas">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Llantas delanteras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',llantas_delanteras,set_llantas_delanteras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',llantas_delanteras,set_llantas_delanteras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Llantas traseras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',llantas_traseras,set_llantas_traseras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',llantas_traseras,set_llantas_traseras)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Llanta de repuesto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',llanta_repuesto,set_llanta_repuesto)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',llanta_repuesto,set_llanta_repuesto)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Espejos">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Espejos laterales</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',espejos_laterales,set_espejos_laterales)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',espejos_laterales,set_espejos_laterales)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Espejo retrovisor</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',espejos_retrovisor,set_espejos_retrovisor)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',espejos_retrovisor,set_espejos_retrovisor)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Cinturones">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Cinturones delanteros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',cinturones_delanteros,set_cinturones_delanteros)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',cinturones_delanteros,set_cinturones_delanteros)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Cinturones traseros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',cinturones_traseros,set_cinturones_traseros)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',cinturones_traseros,set_cinturones_traseros)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Luces">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Luces altas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_altas,set_luces_altas)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',luces_altas,set_luces_altas)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Luces Medias</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_medias,set_luces_medias)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',luces_medias,set_luces_medias)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Luces bajas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_bajas,set_luces_bajas)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',luces_bajas,set_luces_bajas)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Luces freno</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_parada,set_luces_parada)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',luces_parada,set_luces_parada)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Luces parqueo</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_parqueo,set_luces_parqueo)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',luces_parqueo,set_luces_parqueo)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Luces reversa</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_reversa,set_luces_reversa)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',luces_reversa,set_luces_reversa)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Herramientas">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Kit de herramientas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',kit_herramientas,set_kit_herramientas)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',kit_herramientas,set_kit_herramientas)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Botiquin">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Botiquin</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',botiquin_completo,set_botiquin_completo)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',botiquin_completo,set_botiquin_completo)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Pito">
        <Grid item sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
          }}>
          <FormLabel>Pito</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',pito,set_pito)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#27b355',
                    '&.Mui-checked': {
                      color: '#27b355',
                    },
                    fontSize: 28,
                  },
              }}
            />
            <Radio
              {...cambio_input_radio('false',pito,set_pito)}
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#e23a3a',
                    '&.Mui-checked': {
                      color: '#e23a3a',
                    },
                    fontSize: 28,
                  },
              }}
            />
          </Grid>
        </Grid>
      </TarjetaInspeccion>

      {tiene_observaciones &&
        <Grid item container xs={12}>
          <Title title="Observaciones" />
          <TextField
            style={{margin:'20px 0px'}}
            id="observaciones"
            required
            fullWidth
            placeholder="Escriba aqui sus observaciones"
            size="small"
            multiline
            rows={2}
          />
        </Grid>
      }

      <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "20px",
            gap: 4,
          }}
        >
          <Button
            color="success"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {}}
          >
            {"Guardar"}
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={() => {}}
          >
            Salir
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {}}
          >
            Limpiar
          </Button>
        </Grid>
    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default ElementosInspeccionar;