/* eslint-disable @typescript-eslint/naming-convention */
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';



export const TipologiaDocumental: React.FC = () => {



  const { form, set_form } = useContext(FormCreacionContext);

  const HandleCompletarDatos = (e: any) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value

    })
  }

  const [tipologia_documental, set_tipologia_documental] = useState<any>(null);
  const [tipologia_documental_otro, set_tipologia_documental_otro] = useState<any>(null);



  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/tipos_tipologia/get/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipologia_documental(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_data_desplegable_no = async (): Promise<void> => {
    try {
      const url = `/gestor/plantillas/otras_tipologias/get/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipologia_documental_otro(numero_consulta);
      // //  console.log('')(numero_consulta);

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);
  useEffect(() => {
    fetch_data_desplegable_no().catch((error) => {
      console.error(error);
    });
  }, []);


  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Tipologia Documental" />
        </Grid>
        <Grid item container spacing={1} style={{ margin: 1 }}>

          <h5>¿Plantilla asociada a tipologia documental del TRD?</h5>

          <Grid item xs={1} style={{ margin: 7, marginRight: 10 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={form.asociada_a_tipologia_doc_trd === "True"}
                  onChange={(event: any) => {
                    HandleCompletarDatos({
                      target: {
                        name: "asociada_a_tipologia_doc_trd",
                        value: event.target.checked ? "True" : "False"
                      }
                    });
                  }}
                />
              }
              label={form.asociada_a_tipologia_doc_trd === "True" ? "Si" : "No"}
            />
          </Grid>



          {form.asociada_a_tipologia_doc_trd === "True" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                <Select
                  id="demo-simple-select-2"
                  name="id_tipologia_doc_trd"
                  label="Selecciona tipología documentall"
                  value={form.id_tipologia_doc_trd || ""}
                  onChange={HandleCompletarDatos}
                >
                  {tipologia_documental?.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.id_tipologia_documental}>
                      {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

        </Grid>
        {form.asociada_a_tipologia_doc_trd === "False" && (
          <Grid item container spacing={1} style={{ margin: 1 }}>
            <Grid item sm={1} >
              <h5>¿Cual?</h5>
            </Grid>
            <Grid item xs={12} sm={5} >
              <TextField
                style={{}}
                variant="outlined"
                fullWidth
                name="otras_tipologias"
                value={form.otras_tipologias || ""}
                onChange={HandleCompletarDatos}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ marginTop: 5 }} >Sugerecias Creadas Anteriormente</InputLabel>

                <Select
                  labelId="demo-simple-select-label-3"
                  id="demo-simple-select-3"
                  name="otras_tipologias"
                  label="Sugerecias Creadas Anteriormente"
                  value={form.otras_tipologias}
                  onChange={HandleCompletarDatos}
                >
                  {tipologia_documental_otro?.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.otras_tipologias}>
                      {item.otras_tipologias}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
