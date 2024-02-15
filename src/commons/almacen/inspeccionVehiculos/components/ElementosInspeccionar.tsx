import { Grid, Radio, FormLabel, TextField, Button } from "@mui/material";
import TarjetaInspeccion from "./TarjetaInspeccion";
import { useEffect, useState } from "react";
import { cambio_input_radio } from "../thunsk/cambio_input_radio";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import ContenedorInput from "./ContenedorInput";
import { estilo_radio } from "../thunsk/estilo_radio";


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
    //Si hay por lo menos un estado malo, entoces devuelve true
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
        <ContenedorInput>
          <FormLabel>Direccionales delanteras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',direcionales_delanteras,set_direcionales_delanteras)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',direcionales_delanteras,set_direcionales_delanteras)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Direccionales Traseras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',direcionales_traseras,set_direcionales_traseras)}
              sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',direcionales_traseras,set_direcionales_traseras)}
              sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Limpiabrisas">
        <ContenedorInput>
          <FormLabel>Limpiabrisas delantero</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',limpiabrisas_delantero,set_limpiabrisas_delantero)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',limpiabrisas_delantero,set_limpiabrisas_delantero)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Limpiabrisas trasero</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',limpiabrisas_trasero,set_limpiabrisas_trasero)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',limpiabrisas_trasero,set_limpiabrisas_trasero)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Aceite">
        <ContenedorInput>
          <FormLabel>Nivel de aceite</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',nivel_aceite,set_nivel_aceite)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',nivel_aceite,set_nivel_aceite)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Frenos">
        <ContenedorInput>
          <FormLabel>Nivel de frenos</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',nivel_frenos,set_nivel_frenos)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',nivel_frenos,set_nivel_frenos)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Frenos principales</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',frenos_generales,set_frenos_generales)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',frenos_generales,set_frenos_generales)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Frenos de emergencia</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',frenos_emergencia,set_frenos_emergencia)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',frenos_emergencia,set_frenos_emergencia)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Refrigerante">
        <ContenedorInput>
          <FormLabel>Nivel de refrigerante</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',nivel_refrigerante,set_nivel_refrigerante)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',nivel_refrigerante,set_nivel_refrigerante)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Apoya cabezas">
        <ContenedorInput>
          <FormLabel>Apoya cabezas del piloto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',apoyacabezas_piloto,set_apoyacabezas_piloto)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',apoyacabezas_piloto,set_apoyacabezas_piloto)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Apoya cabeza del copiloto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',apoyacabezas_copiloto,set_apoyacabezas_copiloto)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',apoyacabezas_copiloto,set_apoyacabezas_copiloto)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Apoya cabezas traseros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',apoyacabezas_traseros,set_apoyacabezas_traseros)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',apoyacabezas_traseros,set_apoyacabezas_traseros)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Llantas">
        <ContenedorInput>
          <FormLabel>Llantas delanteras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',llantas_delanteras,set_llantas_delanteras)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',llantas_delanteras,set_llantas_delanteras)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Llantas traseras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',llantas_traseras,set_llantas_traseras)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',llantas_traseras,set_llantas_traseras)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Llanta de repuesto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',llanta_repuesto,set_llanta_repuesto)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',llanta_repuesto,set_llanta_repuesto)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Espejos">
        <ContenedorInput>
          <FormLabel>Espejos laterales</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',espejos_laterales,set_espejos_laterales)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',espejos_laterales,set_espejos_laterales)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Espejo retrovisor</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',espejos_retrovisor,set_espejos_retrovisor)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',espejos_retrovisor,set_espejos_retrovisor)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Cinturones">
        <ContenedorInput>
          <FormLabel>Cinturones delanteros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',cinturones_delanteros,set_cinturones_delanteros)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',cinturones_delanteros,set_cinturones_delanteros)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Cinturones traseros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',cinturones_traseros,set_cinturones_traseros)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',cinturones_traseros,set_cinturones_traseros)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Luces">
        <ContenedorInput>
          <FormLabel>Luces altas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_altas,set_luces_altas)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',luces_altas,set_luces_altas)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces Medias</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_medias,set_luces_medias)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',luces_medias,set_luces_medias)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces bajas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_bajas,set_luces_bajas)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',luces_bajas,set_luces_bajas)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces freno</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_parada,set_luces_parada)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',luces_parada,set_luces_parada)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces parqueo</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_parqueo,set_luces_parqueo)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',luces_parqueo,set_luces_parqueo)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces reversa</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',luces_reversa,set_luces_reversa)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',luces_reversa,set_luces_reversa)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Herramientas">
        <ContenedorInput>
          <FormLabel>Kit de herramientas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',kit_herramientas,set_kit_herramientas)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',kit_herramientas,set_kit_herramientas)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Botiquin">
        <ContenedorInput>
          <FormLabel>Botiquin</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',botiquin_completo,set_botiquin_completo)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',botiquin_completo,set_botiquin_completo)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
      </TarjetaInspeccion>

      <TarjetaInspeccion title="Pito">
        <ContenedorInput>
          <FormLabel>Pito</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              {...cambio_input_radio('true',pito,set_pito)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              {...cambio_input_radio('false',pito,set_pito)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
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