// /* eslint-disable @typescript-eslint/naming-convention */

// import { DataGrid } from "@mui/x-data-grid"
// import { row } from '../../../../../../../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/interfaces/IProps';
// import { RenderDataGrid } from "../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid";

// export const Conponent = () => {

// const data=[{
//     nombre:"juanres",
//     edad:11
// },
// {
//     nombre:"juanres fwd432",
//     edad:11
// },
// {
//     nombre:"juanres  43434432",
//     edad:11
// },
// {
//     nombre:"juanres fdsdfds",
//     edad:11
// }];

// const mensaje_consola=(data:any)=>{

//     // console.log("exitoso",data)

// }

// const columnss = [
//     { field: 'nombre', headerName: 'Nombre', width: 150,flex:1 },
//     { field: 'edad', headerName: 'Edad', width: 150,flex:1 },
//     { field: 'boton', headerName: 'ID', flex:1 ,renderCell:(params:any)=>{
//         return <button style={{color:"red"}} onClick={()=>{mensaje_consola(params.row)}}>Editar</button>
//     }
//     },
//   ];

//   return (
//     <div>
//         {/* <DataGrid
//         rows={data}
//         columns={columnss as any}
//         pageSize={5}
//         autoHeight
//         getRowId={(row) => row.edad}

//         /> */}
//     <RenderDataGrid columns={columnss} title="Lista de personas" rows={data} />

//         </div>
//   )
// }
