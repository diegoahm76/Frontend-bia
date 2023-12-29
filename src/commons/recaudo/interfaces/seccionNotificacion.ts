export interface IProps {
    selected_proceso: {
        fecha_facturacion: string;
        numero_factura: string;
        codigo_contable: string;
        monto_inicial: string;
        dias_mora: string;
        valor_intereses: string;
        valor_sancion: string;
        etapa: string;
        data_complement: string
    },
}

export interface primera {
    id_deudor: Segunda;
}


export interface Segunda {
    telefono: string
    nombres: string
    apellidos: string
    email: string
    identificacion: string
}

export interface NombreTipoVaraible {
    id: number;
    categoria: string;
    orden: number;
}


export  const valores_inicial: primera = {
    id_deudor: {
        telefono: "",
        nombres: "",
        apellidos: "",
        email: "",
        identificacion: "",
    }
}