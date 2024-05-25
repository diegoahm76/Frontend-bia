export const cambio_input_radio = (item: string,tipo_inspeccion: string,set_tipo_inspeccion: React.Dispatch<React.SetStateAction<string>>) => ({
  checked: tipo_inspeccion === item,
  onChange: ()=>set_tipo_inspeccion(item),
  value: item,
  name: 'size-radio-button-demo',
  inputProps: { 'aria-label': item },
});