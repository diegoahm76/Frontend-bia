/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import React from 'react';
import { Title } from '../../../../components';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchOutlined } from '@mui/icons-material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Resultados } from './Resultados';
import { Resultadospoai,  } from './Resultadospoai';
import {
  Planes,
  FormData,
  Programa,
  Proyecto,
  Producto,
  Actividad,
  Indicador,
  metas,
  EjeEstrategico,
  miEstilo,
  ConsultarSeguimiento,
  FormDataRegistro,
} from '../interface/types';
import SaveIcon from '@mui/icons-material/Save';

import { AgregarPoai } from './AgregarPoai';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { api } from '../../../../api/axios';

export const Seguimiento: React.FC = () => {

  const [selecTodosId, setSelecTodosId] = useState<any>(null);

 
  const initialFormDataCrear: FormDataRegistro = {
    id_concepto: '',
    id_plan: '',
    id_producto: '',
    id_actividad: '',
    id_indicador: '',
    id_meta: '',
    id_rubro: '',
    descripcion: '',
    id_prioridad: '',
    codigo_pre: '',
    cuenta: '',
    id_unidad_organizacional: '',
    id_modalidad: '',
    id_fuente1: '',
    valor_fte1: '',
    adicion1: false,
    id_fuente2: '',
    valor_fte2: '',
    adicion2: false,
    id_fuente3: '',
    valor_fte3: '',
    adicion3: false,
    id_fuente4: '',
    valor_fte4: '',
    adicion4: false,
    valor_banco: '',
    valor_cdp: '',
    valor_rp: '',
    valor_obligado: '',
    fecha_terminacion: '',
    duracion: '',
    valor_mensual: '',
    fecha_estimada: '',
    mes_proyectado: '',
    codigo_unsp: '',
    lugar_ejecucion: '',
    numero_contrato: '',
    numero_banco: '',
    numero_rp: '',
    fecha_rp: '',
    numero_cdp: '',
    fecha_cdp: '',
    nombre_contratista: '',
    observaciones_poai: '',
    fecha_registro: '',
    valor_pagado: '',
    vseguimiento_paabanco: '',
    vseguimiento_paacdp: '',
    vseguimiento_paarp: '',
    svseguimiento_paaobligado: '', 
    vseguimiento_paapagado: '',
  };
  

  const [formDatagregar, setFormDataCrear] =  useState<FormDataRegistro>(initialFormDataCrear);





  
  const initialFormData: FormData = {
    plan: '',
    programa: '',
    proyecto: '',
    producto: '',
    actividad: '',
    indicador: '',
    meta: '',
    eje: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showHeader, setShowHeader] = useState(false);
  const [showdos, setShowdos] = useState(false);

  const [is_modal_active, set_is_buscar] = useState<boolean>(false);

  const handleBuscarClick = () => {
    set_is_buscar(true);
  };

  const handleLimpiarClick = () => {
    setShowHeader(false);
    setFormData(initialFormData);
  };
  const handlecerrrar = () => {
    setShowHeader(false);
    setShowdos(false);
  };
  const handle = (): void => {
    setShowdos(true);
  };
  const [planes, setPlanes] = useState<Planes[]>([]);
  const [ejeplan, setejeplan] = useState<EjeEstrategico[]>([]);
  const [programa, setPrograma] = useState<Programa[]>([]);

  const [proyecto, setProyecto] = useState<Proyecto[]>([]);
  const [producto, setProducto] = useState<Producto[]>([]);
  const [actividad, setactividad] = useState<Actividad[]>([]);
  const [indicador, setindicador] = useState<Indicador[]>([]);
  const [metas, setmetas] = useState<metas[]>([]);

  const [selectedConceptoId, setSelectedConceptoId] = useState<number | null>(
    null
  );
  const [selectid, setselectid] = useState<any>("");

  const [editar, seteditar] = useState(false);


  useEffect(() => {
   
  }, [editar]);

    const seteditarr = ( ) => {
    seteditar(true) 
    // editartabla() 
    handle() 
  };

  // useEffect(() => {
    
  //     editartabla();
    
  // }, [selectid]);


  useEffect(() => {
    if (showdos && selectid) {

      setFormDataCrear((prevData: any) => ({
      ...prevData, 
      id_concepto: selectid?.id_concepto,
      id_plan: selectid.id_plan , 
      id_producto:  selectid.id_producto,
      id_actividad:  selectid.id_actividad,
      id_indicador:  selectid.id_indicador,
      id_meta:  selectid.id_meta,
      id_rubro:  selectid.id_rubro,
      descripcion: selectid.descripcion,
      id_prioridad:  selectid.id_prioridad,
      codigo_pre:  selectid.codigo_pre,
      cuenta:  selectid.cuenta,
      id_unidad_organizacional:  selectid.id_unidad_organizacional,
      id_modalidad:  selectid.id_modalidad,
      id_fuente1:  selectid.id_fuente1,
      valor_fte1:  selectid.valor_fte1,
      adicion1:  selectid.adicion1,
      id_fuente2:  selectid.id_fuente2,
      valor_fte2:  selectid.valor_fte2,
      adicion2:  selectid.adicion2,
      id_fuente3:  selectid.id_fuente3,
      valor_fte3:  selectid.valor_fte3,
      adicion3:  selectid.adicion3,
      id_fuente4:  selectid.id_fuente4,
      valor_fte4:  selectid.valor_fte4,
      adicion4:  selectid.adicion4,
      valor_banco:  selectid.valor_banco,
      valor_cdp:  selectid.valor_cdp,
      valor_rp:  selectid.valor_rp,
      valor_obligado:  selectid.valor_obligado,
      fecha_terminacion:  selectid.fecha_terminacion,
      duracion: selectid.duracion ,
      valor_mensual:  selectid.valor_mensual,
      fecha_estimada:  selectid.fecha_estimada,
      mes_proyectado: selectid.mes_proyectado,
      codigo_unsp:  selectid.codigo_unsp,
      lugar_ejecucion: selectid.lugar_ejecucion,
      numero_contrato:  selectid.numero_contrato,
      numero_banco:  selectid.numero_banco,
      numero_rp:  selectid.numero_rp,
      fecha_rp:  selectid.fecha_rp,
      numero_cdp:  selectid.numero_cdp,
      fecha_cdp:  selectid.fecha_cdp,
      nombre_contratista: selectid.nombre_contratista,
      observaciones_poai: selectid.observaciones_poai,
      fecha_registro:  selectid.fecha_registro,
      valor_pagado:  selectid.valor_pagado,
      vseguimiento_paabanco:  selectid.vseguimiento_paabanco,
      vseguimiento_paacdp:  selectid.vseguimiento_paacdp,
      vseguimiento_paarp:  selectid.vseguimiento_paarp,
      svseguimiento_paaobligado:  selectid.svseguimiento_paaobligado,
      vseguimiento_paapagado:  selectid.vseguimiento_paapagado , 
  }));
    }
    

  }, [showdos, selectid]);

  const editartabla = () => {
  //   setFormDataCrear((prevData: any) => ({
  //     ...prevData, 
  //     id_concepto: selectid?.id_concepto,
  //     id_plan: selectid.id_plan , 
  //     id_producto:  selectid.id_producto,
  //     id_actividad:  selectid.id_actividad,
  //     id_indicador:  selectid.id_indicador,
  //     id_meta:  selectid.id_meta,
  //     id_rubro:  selectid.id_rubro,
  //     descripcion: selectid.descripcion,
  //     id_prioridad:  selectid.id_prioridad,
  //     codigo_pre:  selectid.codigo_pre,
  //     cuenta:  selectid.cuenta,
  //     id_unidad_organizacional:  selectid.id_unidad_organizacional,
  //     id_modalidad:  selectid.id_modalidad,
  //     id_fuente1:  selectid.id_fuente1,
  //     valor_fte1:  selectid.valor_fte1,
  //     adicion1:  selectid.adicion1,
  //     id_fuente2:  selectid.id_fuente2,
  //     valor_fte2:  selectid.valor_fte2,
  //     adicion2:  selectid.adicion2,
  //     id_fuente3:  selectid.id_fuente3,
  //     valor_fte3:  selectid.valor_fte3,
  //     adicion3:  selectid.adicion3,
  //     id_fuente4:  selectid.id_fuente4,
  //     valor_fte4:  selectid.valor_fte4,
  //     adicion4:  selectid.adicion4,
  //     valor_banco:  selectid.valor_banco,
  //     valor_cdp:  selectid.valor_cdp,
  //     valor_rp:  selectid.valor_rp,
  //     valor_obligado:  selectid.valor_obligado,
  //     fecha_terminacion:  selectid.fecha_terminacion,
  //     duracion: selectid.duracion ,
  //     valor_mensual:  selectid.valor_mensual,
  //     fecha_estimada:  selectid.fecha_estimada,
  //     mes_proyectado: selectid.mes_proyectado,
  //     codigo_unsp:  selectid.codigo_unsp,
  //     lugar_ejecucion: selectid.lugar_ejecucion,
  //     numero_contrato:  selectid.numero_contrato,
  //     numero_banco:  selectid.numero_banco,
  //     numero_rp:  selectid.numero_rp,
  //     fecha_rp:  selectid.fecha_rp,
  //     numero_cdp:  selectid.numero_cdp,
  //     fecha_cdp:  selectid.fecha_cdp,
  //     nombre_contratista: selectid.nombre_contratista,
  //     observaciones_poai: selectid.observaciones_poai,
  //     fecha_registro:  selectid.fecha_registro,
  //     valor_pagado:  selectid.valor_pagado,
  //     vseguimiento_paabanco:  selectid.vseguimiento_paabanco,
  //     vseguimiento_paacdp:  selectid.vseguimiento_paacdp,
  //     vseguimiento_paarp:  selectid.vseguimiento_paarp,
  //     vseguimiento_paaobligado:  selectid.vseguimiento_paaobligado,
  //     vseguimiento_paapagado:  selectid.vseguimiento_paapagado , 
  // }));
  };



  const handlecrear = () => {
    handle()
    seteditar(false)
    setFormDataCrear((prevData: any) => ({
      ...prevData,
      codigo_pre: selecTodosId.cod_presupuestal,
      id_concepto: selecTodosId.id_concepto,
      id_indicador: selecTodosId.id_indicador,
      id_meta: selecTodosId.id_meta,
      id_modalidad: selecTodosId.id_modalidad,
      id_plan: selecTodosId.id_plan,
      id_rubro: selecTodosId.id_rubro,
      id_unidad_organizacional: selecTodosId.id_unidad_organizacional,
      id_producto: formData.producto,
      id_actividad: formData.actividad, 
      
      cuenta: selecTodosId.cuenta,
 
    descripcion: '',
    id_prioridad: '',
    
  
    id_fuente1: '',
    valor_fte1: '',
    adicion1: false,
    id_fuente2: '',
    valor_fte2: '',
    adicion2: false,
    id_fuente3: '',
    valor_fte3: '',
    adicion3: false,
    id_fuente4: '',
    valor_fte4: '',
    adicion4: false,
    valor_banco: '',
    valor_cdp: '',
    valor_rp: '',
    valor_obligado: '',
    fecha_terminacion: '',
    duracion: '',
    valor_mensual: '',
    fecha_estimada: '',
    mes_proyectado: '',
    codigo_unsp: '',
    lugar_ejecucion: '',
    numero_contrato: '',
    numero_banco: '',
    numero_rp: '',
    fecha_rp: '',
    numero_cdp: '',
    fecha_cdp: '',
    nombre_contratista: '',
    observaciones_poai: '',
    fecha_registro: '',
    valor_pagado: '',
    vseguimiento_paabanco: '',
    vseguimiento_paacdp: '',
    vseguimiento_paarp: '',
    svseguimiento_paaobligado: '', 
    vseguimiento_paapagado: '',
    }));
  };


  const [ConsultarSeguimiento, setconsultarSeguimiento] = useState<ConsultarSeguimiento[]>([]);

  const consultarSeguimiento = async (): Promise<void> => {
    try {
      const url = `/seguimiento-planes/consultar-seguimiento-poai/${selectedConceptoId}/`;
      const res = await api.get(url);
      const HistoricoData: ConsultarSeguimiento[] = res.data?.data || [];
      setconsultarSeguimiento(HistoricoData);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   if (showdos && selectid) {
  //     setFormDataCrear((prevData: any) => ({
  //       ...prevData,
  //       id_concepto: selectid?.id_concepto,
  //       id_plan: selectid.id_plan,
  //       id_producto: selectid.id_producto,
  //       id_actividad: selectid.id_actividad,
  //       id_indicador: selectid.id_indicador,
  //       id_meta: selectid.id_meta,
  //       id_rubro: selectid.id_rubro,
  //       descripcion: selectid.descripcion,
  //       id_prioridad: selectid.id_prioridad,
  //       codigo_pre: selectid.codigo_pre,
  //       cuenta: selectid.cuenta,
  //       id_unidad_organizacional: selectid.id_unidad_organizacional,
  //       id_modalidad: selectid.id_modalidad,
  //       id_fuente1: selectid.id_fuente1,
  //       valor_fte1: selectid.valor_fte1,
  //       adicion1: selectid.adicion1,
  //       id_fuente2: selectid.id_fuente2,
  //       valor_fte2: selectid.valor_fte2,
  //       adicion2: selectid.adicion2,
  //       id_fuente3: selectid.id_fuente3,
  //       valor_fte3: selectid.valor_fte3,
  //       adicion3: selectid.adicion3,
  //       id_fuente4: selectid.id_fuente4,
  //       valor_fte4: selectid.valor_fte4,
  //       adicion4: selectid.adicion4,
  //       valor_banco: selectid.valor_banco,
  //       valor_cdp: selectid.valor_cdp,
  //       valor_rp: selectid.valor_rp,
  //       valor_obligado: selectid.valor_obligado,
  //       fecha_terminacion: selectid.fecha_terminacion,
  //       duracion: selectid.duracion,
  //       valor_mensual: selectid.valor_mensual,
  //       fecha_estimada: selectid.fecha_estimada,
  //       mes_proyectado: selectid.mes_proyectado,
  //       codigo_unsp: selectid.codigo_unsp,
  //       lugar_ejecucion: selectid.lugar_ejecucion,
  //       numero_contrato: selectid.numero_contrato,
  //       numero_banco: selectid.numero_banco,
  //       numero_rp: selectid.numero_rp,
  //       fecha_rp: selectid.fecha_rp,
  //       numero_cdp: selectid.numero_cdp,
  //       fecha_cdp: selectid.fecha_cdp,
  //       nombre_contratista: selectid.nombre_contratista,
  //       observaciones_poai: selectid.observaciones_poai,
  //       fecha_registro: selectid.fecha_registro,
  //       valor_pagado: selectid.valor_pagado,
  //       vseguimiento_paabanco: selectid.vseguimiento_paabanco,
  //       vseguimiento_paacdp: selectid.vseguimiento_paacdp,
  //       vseguimiento_paarp: selectid.vseguimiento_paarp,
  //       svseguimiento_paaobligado: selectid.svseguimiento_paaobligado,
  //       vseguimiento_paapagado: selectid.vseguimiento_paapagado,
  //     }));
  //   }
  // }, [showdos, selectid]);


  const limpiartodo = (): void => {
    setFormData(initialFormData)
   };
  return (
    <>

{/* <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={limpiartodo}
                // startIcon={<SaveIcon />}
              >
              
              </Button> */}

      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Registro de Seguimiento POAI" />
        </Grid>
      </Grid>
      {/* {selectedConceptoId} */}
      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Seleccione Meta/Producto" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre de plan</InputLabel>
            <Select
              name="plan"
              disabled
              label="Nombre de plan"
              value={formData.plan}
              onChange={handleInputChange}
            >
              {planes.map((unidad: any) => (
                <MenuItem key={unidad.id_plan} value={unidad.id_plan}>
                  {unidad.nombre_plan}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre de eje</InputLabel>
            <Select
              name="eje"
              disabled
              label="Nombre de plan"
              value={formData.eje}
              onChange={handleInputChange}
            >
              {ejeplan.map((unidad: any) => (
                <MenuItem
                  key={unidad.id_eje_estrategico}
                  value={unidad.id_eje_estrategico}
                >
                  {unidad.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre de programa</InputLabel>
            <Select
              name="programa"
              disabled
              value={formData.programa}
              onChange={handleInputChange}
              label="Nombre de programa"
            >
              {programa.map((programa: any) => (
                <MenuItem
                  key={programa.id_programa}
                  value={programa.id_programa}
                >
                  {programa.nombre_programa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Nombre del proyecto </InputLabel>
            <Select
              value={formData.proyecto}
              onChange={handleInputChange}
              name="proyecto"
              disabled
              label="Nombre del proyecto"
            >
              {proyecto.map((Proyecto: any) => (
                <MenuItem
                  key={Proyecto.id_proyecto}
                  value={Proyecto.id_proyecto}
                >
                  {Proyecto.nombre_proyecto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">Nombre del producto</InputLabel>
            <Select
              name="producto"
              disabled
              label="Nombre del producto"
              value={formData.producto}
              onChange={handleInputChange}
            >
              {producto.map((Proyecto: any) => (
                <MenuItem
                  key={Proyecto.id_producto}
                  value={Proyecto.id_producto}
                >
                  {Proyecto.nombre_producto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> 
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">
              {' '}
              Nombre de la actividad
            </InputLabel>
            <Select
              value={formData.actividad}
              onChange={handleInputChange}
              name="actividad"
              disabled
              label="Nombre del la actividad "
            >
              {actividad.map((Proyecto: any) => (
                <MenuItem
                  key={Proyecto.id_actividad}
                  value={Proyecto.id_actividad}
                >
                  {Proyecto.nombre_actividad}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">
              {' '}
              Nombre del indicador
            </InputLabel>
            <Select
              value={formData.indicador}
              onChange={handleInputChange}
              name="indicador"
              disabled
              label="Nombre del la indicador "
            >
              {indicador.map((Proyecto: any) => (
                <MenuItem
                  key={Proyecto.id_indicador}
                  value={Proyecto.id_indicador}
                >
                  {Proyecto.nombre_indicador}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">
              {' '}
              Nombre de la Meta{' '}
            </InputLabel>
            <Select
              name="meta"
              disabled
              value={formData.meta}
              onChange={handleInputChange}
              label="Nombre del la Meta"
            >
              {metas.map((Proyecto: any) => (
                <MenuItem key={Proyecto.id_meta} value={Proyecto.id_meta}>
                  {Proyecto.nombre_indicador}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={handlecerrrar}
              startIcon={<ClearIcon />}
            >
              cerrar
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={<SearchOutlined />}
              variant="contained"
              fullWidth
              onClick={handleBuscarClick}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <ButtonSalir />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Resultados
          setSelecTodosId={setSelecTodosId}
          setSelectedConceptoId={setSelectedConceptoId}
          setPlanes={setPlanes}
          setPrograma={setPrograma}
          setShowHeader={setShowHeader}
          is_modal_active={is_modal_active}
          set_is_modal_active={set_is_buscar}
          handleBuscarClick={handleBuscarClick}
          handleInputChange={handleInputChange}
          formData={formData}
          planes={planes}
          setProyecto={setProyecto}
          proyecto={proyecto}
          programa={programa}
          setProducto={setProducto}
          producto={producto}
          actividad={actividad}
          setactividad={setactividad}
          indicador={indicador}
          setmetas={setmetas}
          metas={metas}
          setindicador={setindicador}
          setFormData={setFormData}
          setejeplan={setejeplan}
          ejeplan={ejeplan}
        />
      </Grid>
      {showHeader && (
        <>
          <Grid
            container
            item
            xs={12}
            marginLeft={2}
            marginRight={2}
            marginTop={3}
            spacing={2}
            sx={miEstilo}
          >
            <Grid item xs={12}>
              <Resultadospoai
              selecTodosId={selecTodosId}
                setselectid={setselectid}
                selectedConceptoId={selectedConceptoId}
                handle={handle}
                seteditar={seteditar}
                editartabla={editartabla}
                seteditarr={seteditarr}
                consultarSeguimiento={consultarSeguimiento}
                ConsultarSeguimiento={ConsultarSeguimiento}
              />
            </Grid>

            <Grid
              container
              spacing={2}
              marginTop={2}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth
                  onClick={handlecrear}
                  // startIcon={<SaveIcon />}
                >
                  Agregar segrimiento POAI
                </Button>
              </Grid>
         
            </Grid> 
            <Grid
              container
              spacing={2}
              marginTop={2}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={handlecerrrar}
                  startIcon={<ClearIcon />}
                >
                  cerrar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<SearchOutlined />}
                  variant="contained"
                  fullWidth
                  onClick={handleBuscarClick}
                >
                  Buscar
                </Button>
              </Grid>
              <Grid item xs={12} sm={1}>
                <ButtonSalir />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}

      {showdos && (
        <>
          <AgregarPoai
            selectid={selectid}
            formData={formData}
            selecTodosId={selecTodosId}
            setShowdos={setShowdos}
            handle={handle}
            editar={editar}
            formDatagregar={formDatagregar}
            setFormDataCrear={setFormDataCrear}
            initialFormDataCrear={initialFormDataCrear} consultarSeguimiento={consultarSeguimiento}          />
        </>
      )}
    </>
  );
};
