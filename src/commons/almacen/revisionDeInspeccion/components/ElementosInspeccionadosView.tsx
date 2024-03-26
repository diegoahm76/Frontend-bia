/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Radio, FormLabel, TextField, Button } from "@mui/material";
import TarjetaInspeccion from "./TarjetaInspeccion";
import { useEffect, useState } from "react";
import { cambio_input_radio } from "../thunks/cambio_input_radio";
import { Title } from "../../../../components";
import ContenedorInput from "./ContenedorInput";
import { estilo_radio } from "../thunks/estilo_radio";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import CloseIcon from '@mui/icons-material/Close';
import { interface_put_revisar_vehiculo, response_put_revisar_vehiculo } from "../interfaces/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { put_verificar_inspeccion } from "../thunks/revision_inspeccion";
import Swal from "sweetalert2";
import SaveIcon from '@mui/icons-material/Save';
import { control_success } from "../../../../helpers";



interface props {
  set_mostrar_view_inpeccion: React.Dispatch<React.SetStateAction<boolean>>;
  data_inspeccion_revisada: interface_put_revisar_vehiculo;
}

const ElementosInspeccionadosView: React.FC<props> = ({set_mostrar_view_inpeccion,data_inspeccion_revisada}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Estados de los elementos inspeccionados
  const [direcionales_delanteras, set_direcionales_delanteras] = useState<string>('true'); // Direcionales delanteras
  const [direcionales_traseras, set_direcionales_traseras] = useState<string>('true'); // Direcionales traseras
  const [limpiabrisas_delantero, set_limpiabrisas_delantero] = useState<string>('true'); // Limpiabrisas delantero
  const [limpiabrisas_trasero, set_limpiabrisas_trasero] = useState<string>('true'); // Limpiabrisas trasero
  const [nivel_aceite, set_nivel_aceite] = useState<string>('true'); // Nivel de aceite
  const [nivel_frenos, set_nivel_frenos] = useState<string>('true'); // Nivel de frenos
  const [frenos_generales, set_frenos_generales] = useState<string>('true'); // Frenos generales
  const [frenos_emergencia, set_frenos_emergencia] = useState<string>('true'); // Frenos de emergencia
  const [nivel_refrigerante, set_nivel_refrigerante] = useState<string>('true'); // Nivel de refrigerante
  const [apoyacabezas_piloto, set_apoyacabezas_piloto] = useState<string>('true'); // Apoyacabezas del piloto
  const [apoyacabezas_copiloto, set_apoyacabezas_copiloto] = useState<string>('true'); // Apoyacabezas del copiloto
  const [apoyacabezas_traseros, set_apoyacabezas_traseros] = useState<string>('true'); // Apoyacabezas traseros
  const [llantas_delanteras, set_llantas_delanteras] = useState<string>('true'); // Llantas delanteras
  const [llantas_traseras, set_llantas_traseras] = useState<string>('true'); // Llantas traseras
  const [llanta_repuesto, set_llanta_repuesto] = useState<string>('true'); // Llanta de repuesto
  const [espejos_laterales, set_espejos_laterales] = useState<string>('true'); // Espejos laterales
  const [espejos_retrovisor, set_espejos_retrovisor] = useState<string>('true'); // Espejo retrovisor
  const [cinturones_delanteros, set_cinturones_delanteros] = useState<string>('true'); // Cinturones delanteros
  const [cinturones_traseros, set_cinturones_traseros] = useState<string>('true'); // Cinturones traseros
  const [luces_altas, set_luces_altas] = useState<string>('true'); // Luces altas
  const [luces_medias, set_luces_medias] = useState<string>('true'); // Luces medias
  const [luces_bajas, set_luces_bajas] = useState<string>('true'); // Luces bajas
  const [luces_parada, set_luces_parada] = useState<string>('true'); // Luces de parada
  const [luces_parqueo, set_luces_parqueo] = useState<string>('true'); // Luces de parqueo
  const [luces_reversa, set_luces_reversa] = useState<string>('true'); // Luces de reversa
  const [kit_herramientas, set_kit_herramientas] = useState<string>('true'); // Kit de herramientas
  const [botiquin_completo, set_botiquin_completo] = useState<string>('true'); // Botiquín completo
  const [pito, set_pito] = useState<string>('true'); // Pito

  // Estados de observaciones
  const [observaciones, set_observaciones] = useState<string>('');
  const [observacion_inspeccion, set_observacion_inspeccion] = useState<string>(''); // Observaciones de la inspección  
  const [tiene_observaciones, set_tiene_observaciones] = useState<boolean>(false);


  useEffect(()=>{
    // Comentario: Este hook se ejecuta cuando cambia el valor de la variable "data_inspeccion_revisada"
    if(data_inspeccion_revisada !== undefined && Object.keys(data_inspeccion_revisada).length !== 0){
      set_direcionales_delanteras(data_inspeccion_revisada.dir_llantas_delanteras.toString());
      set_direcionales_traseras(data_inspeccion_revisada.dir_llantas_Traseras.toString());
      set_limpiabrisas_delantero(data_inspeccion_revisada.limpiabrisas_delantero.toString());
      set_limpiabrisas_trasero(data_inspeccion_revisada.limpiabrisas_traseros.toString());
      set_nivel_aceite(data_inspeccion_revisada.nivel_aceite.toString());
      set_nivel_frenos(data_inspeccion_revisada.estado_frenos.toString());
      set_nivel_refrigerante(data_inspeccion_revisada.nivel_refrigerante.toString());
      set_apoyacabezas_piloto(data_inspeccion_revisada.apoyo_cabezas_piloto.toString());
      set_apoyacabezas_copiloto(data_inspeccion_revisada.apoyo_cabezas_copiloto.toString());
      set_apoyacabezas_traseros(data_inspeccion_revisada.apoyo_cabezas_traseros.toString());
      set_frenos_generales(data_inspeccion_revisada.frenos_generales.toString());
      set_frenos_emergencia(data_inspeccion_revisada.freno_emergencia.toString());
      set_llantas_delanteras(data_inspeccion_revisada.llantas_delanteras.toString());
      set_llantas_traseras(data_inspeccion_revisada.llantas_traseras.toString());
      set_llanta_repuesto(data_inspeccion_revisada.llanta_repuesto.toString());
      set_espejos_laterales(data_inspeccion_revisada.espejos_laterales.toString());
      set_espejos_retrovisor(data_inspeccion_revisada.espejo_retrovisor.toString());
      set_cinturones_delanteros(data_inspeccion_revisada.cinturon_seguridad_delantero.toString());
      set_cinturones_traseros(data_inspeccion_revisada.cinturon_seguridad_trasero.toString());
      set_luces_altas(data_inspeccion_revisada.luces_altas.toString());
      set_luces_medias(data_inspeccion_revisada.luces_media.toString());
      set_luces_bajas(data_inspeccion_revisada.luces_bajas.toString());
      set_luces_parada(data_inspeccion_revisada.luces_parada.toString());
      set_luces_parqueo(data_inspeccion_revisada.luces_parqueo.toString());
      set_luces_reversa(data_inspeccion_revisada.luces_reversa.toString());
      set_kit_herramientas(data_inspeccion_revisada.kit_herramientas.toString());
      set_botiquin_completo(data_inspeccion_revisada.botiquin_completo.toString());
      set_pito(data_inspeccion_revisada.pito.toString());
      set_observacion_inspeccion(data_inspeccion_revisada.observaciones_verifi_sup ?? '');
    }
  },[data_inspeccion_revisada]);

  useEffect(()=>{
    if(data_inspeccion_revisada !== undefined && Object.keys(data_inspeccion_revisada).length !== 0){
      if('observaciones' in data_inspeccion_revisada){
        set_tiene_observaciones(true);
        set_observaciones(data_inspeccion_revisada?.observaciones ?? '')
      }
    }
  },[data_inspeccion_revisada])

  // Redirige a la página de programación de mantenimiento de vehículos
  const redirect_mantenimiento = () => {
    navigate('/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_vehiculos');
  }

  const put_verificar_inspeccion_fc: () => Promise<boolean> = async() => {
    await dispatch(put_verificar_inspeccion(data_inspeccion_revisada.id_inspeccion_vehiculo,{
      observaciones_verifi_sup: observacion_inspeccion
    }))
      .then((response: response_put_revisar_vehiculo) => {
        if(response !== undefined && Object.keys(response).length !== 0){
          if(response.success){
            control_success('Inspección revisada con éxito');
          }
        }
      }
    )
    return true;
  }

  const enviar_revisado = async() => {
    Swal.fire({
      title: '¿Está seguro de enviar la revisión de la inspección?',
      showDenyButton: true,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
      confirmButtonText: `Revisar`,
      denyButtonText: `Cancelar`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        const data = await put_verificar_inspeccion_fc();
        if(data){
          set_mostrar_view_inpeccion(false);
        }
      }
    });
  }
  
  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '20px',
        mb: '20px',
        display:'flex',
        justifyContent:'space-between',
        gap: 2
      }}
      >
      <Title title="Elementos a inspeccionar" />

      <Grid item container xs={12}>
        <Grid item xs={12} md={2} sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <TextField
            label='Kilometraje'
            value={data_inspeccion_revisada?.kilometraje ? Number(data_inspeccion_revisada.kilometraje).toLocaleString() : ''}
            disabled
            size="small"
            fullWidth
          />
          <FormLabel>KM</FormLabel>
        </Grid>
      </Grid>

      <TarjetaInspeccion title="Direccionales">
        <ContenedorInput>
          <FormLabel>Direccionales delanteras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',direcionales_delanteras,set_direcionales_delanteras)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',direcionales_delanteras,set_direcionales_delanteras)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Direccionales Traseras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',direcionales_traseras,set_direcionales_traseras)}
              sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',limpiabrisas_delantero,set_limpiabrisas_delantero)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',limpiabrisas_delantero,set_limpiabrisas_delantero)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Limpiabrisas trasero</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',limpiabrisas_trasero,set_limpiabrisas_trasero)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',nivel_aceite,set_nivel_aceite)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',nivel_frenos,set_nivel_frenos)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',nivel_frenos,set_nivel_frenos)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Frenos principales</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',frenos_generales,set_frenos_generales)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',frenos_generales,set_frenos_generales)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Frenos de emergencia</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',frenos_emergencia,set_frenos_emergencia)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',nivel_refrigerante,set_nivel_refrigerante)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',apoyacabezas_piloto,set_apoyacabezas_piloto)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',apoyacabezas_piloto,set_apoyacabezas_piloto)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Apoya cabeza del copiloto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',apoyacabezas_copiloto,set_apoyacabezas_copiloto)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',apoyacabezas_copiloto,set_apoyacabezas_copiloto)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Apoya cabezas traseros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',apoyacabezas_traseros,set_apoyacabezas_traseros)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',llantas_delanteras,set_llantas_delanteras)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',llantas_delanteras,set_llantas_delanteras)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Llantas traseras</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',llantas_traseras,set_llantas_traseras)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',llantas_traseras,set_llantas_traseras)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Llanta de repuesto</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',llanta_repuesto,set_llanta_repuesto)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',espejos_laterales,set_espejos_laterales)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',espejos_laterales,set_espejos_laterales)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Espejo retrovisor</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',espejos_retrovisor,set_espejos_retrovisor)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',cinturones_delanteros,set_cinturones_delanteros)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',cinturones_delanteros,set_cinturones_delanteros)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Cinturones traseros</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',cinturones_traseros,set_cinturones_traseros)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',luces_altas,set_luces_altas)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',luces_altas,set_luces_altas)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces Medias</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',luces_medias,set_luces_medias)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',luces_medias,set_luces_medias)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces bajas</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',luces_bajas,set_luces_bajas)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',luces_bajas,set_luces_bajas)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces freno</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',luces_parada,set_luces_parada)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',luces_parada,set_luces_parada)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces parqueo</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',luces_parqueo,set_luces_parqueo)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',luces_parqueo,set_luces_parqueo)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </ContenedorInput>
        <ContenedorInput>
          <FormLabel>Luces reversa</FormLabel>
          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',luces_reversa,set_luces_reversa)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',kit_herramientas,set_kit_herramientas)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',botiquin_completo,set_botiquin_completo)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
              disabled
              {...cambio_input_radio('true',pito,set_pito)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
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
            disabled
            label="Observaciones"
            size="small"
            multiline
            rows={2}
          />
        </Grid>
      }

        <Grid item container xs={12}>
          <Title title="Observacion de revisión:" />
          <TextField
            style={{margin:'20px 0px'}}
            value={observacion_inspeccion}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_observacion_inspeccion(e.target.value)}
            required
            fullWidth
            disabled={data_inspeccion_revisada.verificacion_superior_realizada ? true : false}
            label="Observacion de revisión:"
            size="small"
            multiline
            rows={2}
          />
        </Grid>

      <Grid item container spacing={2} xs={12} sx={{
        display: 'flex',
        justifyContent: 'end',
      }}>
        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            startIcon={<SaveIcon/>}
            onClick={enviar_revisado}
            >
              Confirmar revisión
          </Button>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Button
            fullWidth
            color="success"
            variant="contained"
            startIcon={<SettingsApplicationsIcon />}
            onClick={redirect_mantenimiento}
          >
            Mantenimiento
          </Button>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Button
            fullWidth
            color="error"
            variant="contained"
            startIcon={<CloseIcon />}
            onClick={()=>{set_mostrar_view_inpeccion(false)}}
          >
            Salir
          </Button>
        </Grid>
      </Grid>

    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default ElementosInspeccionadosView;