export const estilo_radio = (color:string,size:number) => {
  return(
    {'& .MuiSvgIcon-root': {
      color: color,
      '&.Mui-checked': {
        color: size,
      },
      fontSize: 28,
    }}
  )
}