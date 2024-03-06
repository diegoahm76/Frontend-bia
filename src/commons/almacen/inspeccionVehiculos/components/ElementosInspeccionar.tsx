/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Radio, FormLabel, TextField, Button } from "@mui/material";
import TarjetaInspeccion from "./TarjetaInspeccion";
import { useEffect, useState } from "react";
import { cambio_input_radio } from "../thunks/cambio_input_radio";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import ContenedorInput from "./ContenedorInput";
import { estilo_radio } from "../thunks/estilo_radio";
import { create_inspeccion_vehiculo } from "../interfaces/types";
import { useAppDispatch } from "../../../../hooks";
import { enviar_inspeccion_vehiculo } from "../thunks/inspeccion_vehiculos";
import Swal from "sweetalert2";
import { control_error } from "../../../../helpers";

interface props {
  set_data_inspeccion_vehiculo: React.Dispatch<React.SetStateAction<create_inspeccion_vehiculo>>;
  data_inspeccion_vehiculo: create_inspeccion_vehiculo;
  set_kilometraje: React.Dispatch<React.SetStateAction<number>>;
  id_hoja_vida_vehiculo: number;
}


const ElementosInspeccionar: React.FC<props> = ({
  set_data_inspeccion_vehiculo,
  data_inspeccion_vehiculo,
  set_kilometraje,
  id_hoja_vida_vehiculo
}) => {
  const dispatch = useAppDispatch();
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

  const [observaciones, set_observaciones] = useState<string>('');
  const [tiene_observaciones, set_tiene_observaciones] = useState<boolean>(false);

  useEffect(()=>{
    set_data_inspeccion_vehiculo((prev)=>{
      const nuevos_datos = {
        dir_llantas_delanteras: direcionales_delanteras === 'true' ? true : false,
        dir_llantas_traseras: direcionales_traseras === 'true' ? true : false,
        limpiabrisas_delantero: limpiabrisas_delantero === 'true' ? true : false,
        limpiabrisas_traseros: limpiabrisas_trasero === 'true' ? true : false,
        nivel_aceite: nivel_aceite === 'true' ? true : false,
        estado_frenos: nivel_frenos === 'true' ? true : false,
        nivel_refrigerante: nivel_refrigerante === 'true' ? true : false,
        apoyo_cabezas_piloto: apoyacabezas_piloto === 'true' ? true : false,
        apoyo_cabezas_copiloto: apoyacabezas_copiloto === 'true' ? true : false,
        apoyo_cabezas_traseros: apoyacabezas_traseros === 'true' ? true : false,
        frenos_generales: frenos_generales === 'true' ? true : false,
        freno_emergencia: frenos_emergencia === 'true' ? true : false,
        llantas_delanteras: llantas_delanteras === 'true' ? true : false,
        llantas_traseras: llantas_traseras === 'true' ? true : false,
        llanta_repuesto: llanta_repuesto === 'true' ? true : false,
        espejos_laterales: espejos_laterales === 'true' ? true : false,
        espejo_retrovisor: espejos_retrovisor === 'true' ? true : false,
        cinturon_seguridad_delantero: cinturones_delanteros === 'true' ? true : false,
        cinturon_seguridad_trasero: cinturones_traseros === 'true' ? true : false,
        luces_altas: luces_altas === 'true' ? true : false,
        luces_media: luces_medias === 'true' ? true : false,
        luces_bajas: luces_bajas === 'true' ? true : false,
        luces_parada: luces_parada === 'true' ? true : false,
        luces_parqueo: luces_parqueo === 'true' ? true : false,
        luces_reversa: luces_reversa === 'true' ? true : false,
        kit_herramientas: kit_herramientas === 'true' ? true : false,
        botiquin_completo: botiquin_completo === 'true' ? true : false,
        pito: pito === 'true' ? true : false,
        ...(tiene_observaciones && { observaciones: observaciones }),
      }

      /**validamos si todos los elementos estan bien, eliminamos la clave 'observaciones' de los datos
       * y de los datos traidos por '..prev'
      */
      if (!tiene_observaciones) {
        delete nuevos_datos.observaciones;
        delete prev.observaciones;
      }
      return { ...prev, ...nuevos_datos };
      }
    )
  },[direcionales_delanteras,
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
    pito,
    tiene_observaciones,observaciones])

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

  const limpiar_inspeccion = () => {
    set_direcionales_delanteras('true');
    set_direcionales_traseras('true');
    set_limpiabrisas_delantero('true');
    set_limpiabrisas_trasero('true');
    set_nivel_aceite('true');
    set_nivel_frenos('true');
    set_frenos_generales('true');
    set_frenos_emergencia('true');
    set_nivel_refrigerante('true');
    set_apoyacabezas_piloto('true');
    set_apoyacabezas_copiloto('true');
    set_apoyacabezas_traseros('true');
    set_llantas_delanteras('true');
    set_llantas_traseras('true');
    set_llanta_repuesto('true');
    set_espejos_laterales('true');
    set_espejos_retrovisor('true');
    set_cinturones_delanteros('true');
    set_cinturones_traseros('true');
    set_luces_altas('true');
    set_luces_medias('true');
    set_luces_bajas('true');
    set_luces_parada('true');
    set_luces_parqueo('true');
    set_luces_reversa('true');
    set_kit_herramientas('true');
    set_botiquin_completo('true');
    set_pito('true');
    set_kilometraje(0);
  }

  const enviar_asignacion_vehiculo = () => {
    if(id_hoja_vida_vehiculo === 0){
      control_error('No se ha seleccionado un vehículo');
      return
    } else {
      Swal.fire({
        title: '¿Está seguro que desea enviar la inspección del vehículo?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(enviar_inspeccion_vehiculo(data_inspeccion_vehiculo)).then((response: { success: boolean, detail: string, data: any }) => {
            if (response) {
              console.log(response);        
              return;
            }
          })
          limpiar_inspeccion();
          return true;
        } else if(result.isDenied){
          return false;
        }
      });   
    }
  }

  return (
    <Grid container item spacing={1} xs={12} sx={{
      display:'flex',
      justifyContent:'space-between',
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
            value={observaciones}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_observaciones(e.target.value)}
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
            onClick={enviar_asignacion_vehiculo}
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
            onClick={limpiar_inspeccion}
          >
            Limpiar
          </Button>
        </Grid>
    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default ElementosInspeccionar;