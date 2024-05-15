/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, TextField, Stack, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type TablasAmortizacion, type Obligacion } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

interface RootState {
  plan_pagos: {
    plan_pagos: TablasAmortizacion;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaLiquidacion: React.FC = () => {
  const [capital, set_capital] = useState(0);
  const [intereses, set_intereses] = useState(0);
  const [total, set_total] = useState(0);
  const [lista, set_lista] = useState(Array<Obligacion>);
  console.log("lista", lista, total, intereses, capital)
  const { plan_pagos } = useSelector((state: RootState) => state.plan_pagos);
  const { deudores } = useSelector((state: any) => state.deudores);
  const [saldoCapital, setSaldoCapital] = useState<number | undefined>(0); // Inicializado con 0 o undefined^M
  const valor_abono_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(parseFloat(deudores.valor_abonado))



  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const capital_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(capital)

  const intereses_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(intereses)

  useEffect(() => {
    if (plan_pagos.data_cartera !== undefined) {
      set_lista(plan_pagos.data_cartera.obligaciones)
    }
  }, [plan_pagos])





  interface Abono {
    [key: string]: string;
  }
  const [valoresAbonados, setValoresAbonados] = useState<Abono>({});

  const handleValorAbonadoChange = (event: any, fieldName: string, fieldId: string) => {
    const newValue = event.target.value;
    setValoresAbonados(prevState => ({
      ...prevState,
      [fieldId]: newValue
    }));
    // console.log(valoresAbonados); // Agregar esta línea para imprimir los valores

  };

  const sumarValoresAbonados = (valoresAbonados: Abono) => {
    let suma = 0;
    for (const key in valoresAbonados) {
      if (key !== 'valor_abonado') {
        suma += parseFloat(valoresAbonados[key]);
      }
    }
    return parseFloat(suma.toFixed(2));
  };

  // Uso:
  const sumaTotal = sumarValoresAbonados(valoresAbonados);
  // console.log("La suma total de los valores abonados es:", sumaTotal);
  const SaldoRestante = sumaTotal - deudores.valor_abonado;
  // console.log("total", SaldoRestante)





  const columns: GridColDef[] = [
    // {
    //   field: 'id',
    //   headerName: 'Item',
    //   width: 50,
    //   renderCell: (params) => (
    //     <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //       {params.value}
    //     </div>
    //   ),
    // },
    // {
    //   field: 'nombre',
    //   headerName: 'Resolución',
    //   width: 300,
    //   renderCell: (params) => (
    //     <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //       {params.value}
    //     </div>
    //   ),
    // },
    {
      field: 'monto_inicial',
      headerName: 'Valor Capital',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    // {
    //   field: 'inicio',
    //   headerName: 'Fecha Cons. Mora',
    //   width: 150,
    //   renderCell: (params) => (
    //     <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //       {dayjs(params.value).format('DD/MM/YYYY')}
    //     </div>
    //   ),
    // },
    // {
    //   field: 'dias_mora',
    //   headerName: 'Días Mora',
    //   width: 150,
    //   renderCell: (params) => (
    //     <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //       {params.value}
    //     </div>
    //   ),
    // },
    {
      field: 'valor_intereses',
      headerName: 'Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'valor_capital_intereses',
      headerName: 'Capital + Intereses',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'valor_abonado',
      headerName: 'Valor Abonado',
      width: 250,
      renderCell: (params) => {

        const handleAbonoButtonClick = () => {

          const precio_cop = new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "COP",
          }).format(params.value)
          const valorColumna1 = params.row.valor_capital_intereses * 1000;
          const valor_abonado_inicial = deudores.valor_abonado;

          const valor_capital = params.row.monto_inicial * 1000;
          const respuesta = valor_capital / valorColumna1;

          console.log("valor_capital", valor_capital)
          console.log("valorColumna1", valorColumna1)
          console.log("valor_abonado_inicial", valor_abonado_inicial)
          console.log("respuesta", respuesta);
          const total = Math.round(valor_abonado_inicial * respuesta);
          const totalFormateado = total.toLocaleString('es-ES');



          console.log("11111111111111", valor_abonado_inicial, deudores.valor_abonado)

          handleValorAbonadoChange({ target: { value: total } }, 'valor_abonado', `valor_abonado_${params.id}`);
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              required
              label="Valor Abonado"
              size="small"
              fullWidth
              type='number'
              key={`valor_abonado_${params.id}`}
              id={`valor_abonado_${params.id}`}
              value={valoresAbonados[`valor_abonado_${params.id}`] || ''}
              onChange={(event) => handleValorAbonadoChange(event, 'valor_abonado', `valor_abonado_${params.id}`)}
            />
            <Button variant="outlined"
              disabled={-SaldoRestante <= 0}
              onClick={handleAbonoButtonClick}>
              <MonetizationOnOutlinedIcon />
            </Button>
          </div>
        );
      },
    },

    // {
    //   field: 'valor_abonado',
    //   headerName: 'Valor Abonado',
    //   width: 150,
    //   renderCell: (params: GridRenderCellParams<any, any, any>) => (

    //     <TextField
    //           required
    //           label="Valor Abonado"
    //           size="small"
    //           fullWidth
    //           type='number'
    //           key={`valor_abonado_${params.id}`}
    //           id={`valor_abonado_${params.id}`}
    //           value={valoresAbonados[`valor_abonado_${params.id}`] || ''}
    //           onChange={(event) => handleValorAbonadoChange(event, params.field as string, `valor_abonado_${params.id}`)}
    //         />

    //   ),
    // },
    {
      field: 'porcentaje_abonado',
      headerName: '% del Abono',
      width: 150,
      renderCell: (params: any) => (
        <TextField
          disabled
          label="Porcentaje Abonado"
          size="small"
          fullWidth
          type='number'
          key={`valor_abonado_${params.id}`}
          id={`valor_abonado_${params.id}`}
          value={valoresAbonados[`valor_abonado_${params.id}`] ? (parseFloat(valoresAbonados[`valor_abonado_${params.id}`]) / deudores.valor_abonado * 100).toFixed(2) : ''}
        />
      ),
    },
    {
      field: 'abono_capital',
      headerName: 'Abono Capital',
      width: 150,
      renderCell: (params) => {
        const dato = valoresAbonados[`valor_abonado_${params.id}`];
        const nuevoValor = params.row.valor_intereses;
        const resultado = parseFloat(dato) - parseFloat(nuevoValor);

        const totalFormateado = (valoresAbonados[`valor_abonado_${params.id}`] || 0).toLocaleString('es-ES');
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                   {totalFormateado}
          </div>
        );
      },
    },
    {
      field: 'abono_intereses',
      headerName: 'Abono Intereses',
      width: 150,
      renderCell: (params) => {
        const dato = parseFloat(valoresAbonados[`valor_abonado_${params.id}`]);
        const nuevoValor = params.row.valor_intereses * 1000;
        const nuevoValorFormateado = nuevoValor.toLocaleString('es-ES');
        // Verificar si dato y nuevoValor son números válidos
        if (isNaN(dato) || isNaN(nuevoValor)) {
          return (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              N/A
            </div>
          );
        }

        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            +            {nuevoValorFormateado}
          </div>
        );
      },
    },
    {
      field: 'saldo_capital',
      headerName: 'Saldo Capital',
      width: 150,
      renderCell: (params) => {

        const valor_Abonado = parseFloat(valoresAbonados[`valor_abonado_${params.id}`]);
        //const valor_capital = parseFloat(params.row.monto_inicial);
        const valor_interes = parseFloat(params.row.valor_intereses);
        const valor_capital = params.row.monto_inicial * 1000;

        // Verificar si dato y nuevoValor son números válidos
        if (isNaN(valor_Abonado) || isNaN(valor_capital)) {
          return (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              N/A
            </div>
          );
        }
        console.log("informacion", valor_Abonado, valor_capital.toFixed(2), valor_interes)
        const resultado = valor_capital - valor_Abonado;
        setSaldoCapital(resultado);
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {resultado.toLocaleString('es-ES')}
          </div>
        )
      },

    },
  ];

  useEffect(() => {
    let sub_capital = 0
    let sub_intereses = 0
    for (let i = 0; i < lista.length; i++) {
      sub_capital = sub_capital + parseFloat(lista[i].monto_inicial)
      sub_intereses = sub_intereses + parseFloat(lista[i].valor_intereses)
      set_capital(sub_capital)
      set_intereses(sub_intereses)
    }
    set_total(capital + intereses)
  }, [lista, capital, intereses])

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
        {
          lista.length !== 0 ? (
            <>
              <Grid item xs={6}>
                <TextField
                  label="Total Actual a favor"
                  size="small"
                  style={{ width: "95%" }}
                  fullWidth
                  disabled
                  value={-SaldoRestante}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Total Abono Utilizado"
                  size="small"
                  style={{ width: "95%" }}
                  fullWidth
                  disabled
                  value={sumaTotal}
                />
              </Grid>


              <Grid item xs={12}>
                <Grid item>
                  <Box sx={{ width: '100%' }}>
                    <RenderDataGrid
                      title="Datos de liquidación"
                      rows={lista}
                      columns={columns}
                    />
                  </Box>
                </Grid>
                <Stack
                  direction="row"
                  justifyContent="right"
                  spacing={2}
                  sx={{ mt: '30px' }}
                >
                  <Grid item xs={12} sm={2.5}>
                    <TextField
                      label="Total Capital"
                      size="small"
                      fullWidth
                      value={capital_cop}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2.5}>
                    <TextField
                      label="Total Intereses"
                      size="small"
                      fullWidth
                      value={intereses_cop}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2.5}>
                    <TextField
                      label="Capital + Intereses"
                      size="small"
                      fullWidth
                      value={total_cop}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2.5}>
                    <TextField
                      label="Saldo Capital"
                      size="small"
                      fullWidth
                      value={saldoCapital !== undefined ? saldoCapital.toLocaleString('es-ES') : ''}
                    />
                  </Grid>
                </Stack>
              </Grid>
            </>
          ) : null
        }
      </Grid>
    </>
  );
}
