/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import AddIcon from "@mui/icons-material/Add";
import { Grid, Dialog } from '@mui/material';
// import { htmlContent } from '../components/procesoLiquidacion/cons';
import { Button, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Typography, FormHelperText } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { api } from '../../../api/axios';
import PrintIcon from '@mui/icons-material/Print';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention

interface LiquidacionResponse {
    success: boolean;
    detail: string;
    data: {
        rp: number;
        volumenMeses:any;
        limite_pago: string;
        doc_cobro: string;
        ley: string;
        fecha_impresion: string;
        anio: number;
        cedula: string;
        titular: string;
        representante_legal: string;
        direccion: string;
        telefono: string;
        expediente: string;
        exp_resolucion: string;
        nombre_fuente: string;
        predio: string;
        municipio: string;
        caudal_consecionado: number;
        uso: string;
        fr: number;
        tt: number;
        numero_cuota: string;
        montopagarMeses:any;
        valor_cuota: any;
        codigo_barras: string;
        factor_costo_oportunidad: number;
    };
}
interface BuscarProps {
    rows_detalles:any
    is_modal_active: any;
    set_is_modal_active: any;
    form_liquidacion: any,
    expedientes_deudor: any;
    id_liquidacion_pdf: any;
    handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void;

}
export const FacturacionVisor: React.FC<BuscarProps> = ({ rows_detalles, id_liquidacion_pdf, handle_select_form_liquidacion_change, expedientes_deudor, form_liquidacion, is_modal_active, set_is_modal_active }) => {

    const [liquidacion, setLiquidacion] = useState<LiquidacionResponse | null>(null);
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    };
    const [diasEnero, setDiasEnero] = useState(0);
    const [diasFebrero, setDiasFebrero] = useState(0);
    const [diasMarzo, setDiasMarzo] = useState(0);
    const [diasAbril, setDiasAbril] = useState(0);
    const [diasMayo, setDiasMayo] = useState(0);
    const [diasJunio, setDiasJunio] = useState(0);
    const [diasJulio, setDiasJulio] = useState(0);
    const [diasAgosto, setDiasAgosto] = useState(0);
    const [diasSeptiembre, setDiasSeptiembre] = useState(0);
    const [diasOctubre, setDiasOctubre] = useState(0);
    const [diasNoviembre, setDiasNoviembre] = useState(0);
    const [diasDiciembre, setDiasDiciembre] = useState(0);


    const [valorEnero, setValorEnero] = useState<any>('');

    const [valorFebrero, setValorFebrero] = useState<any>('');

    const [valorMarzo, setValorMarzo] = useState<any>('');

    const [valorAbril, setValorAbril] = useState<any>('');

    const [valorMayo, setValorMayo] = useState<any>('');

    const [valorJunio, setValorJunio] = useState<any>('');

    const [valorJulio, setValorJulio] = useState<any>('');

    const [valorAgosto, setValorAgosto] = useState<any>('');

    const [valorSeptiembre, setValorSeptiembre] = useState<any>('');

    const [valorOctubre, setValorOctubre] = useState<any>('');

    const [valorNoviembre, setValorNoviembre] = useState<any>('');

    const [valorDiciembre, setValorDiciembre] = useState<any>('');

    const [sumaResultados, setSumaResultados] = useState<number>(0);

    
    useEffect(() => {
        if (liquidacion?.data.anio) {
            const year = liquidacion.data.anio;
            const enero = getDaysInMonth(1, year);
            const febrero = getDaysInMonth(2, year);
            const marzo = getDaysInMonth(3, year);
            const abril = getDaysInMonth(4, year);
            const mayo = getDaysInMonth(5, year);
            const junio = getDaysInMonth(6, year);
            const julio = getDaysInMonth(7, year);
            const agosto = getDaysInMonth(8, year);
            const septiembre = getDaysInMonth(9, year);
            const octubre = getDaysInMonth(10, year);
            const noviembre = getDaysInMonth(11, year);
            const diciembre = getDaysInMonth(12, year);

            setDiasEnero(enero);
            setDiasFebrero(febrero);
            setDiasMarzo(marzo);
            setDiasAbril(abril);
            setDiasMayo(mayo);
            setDiasJunio(junio);
            setDiasJulio(julio);
            setDiasAgosto(agosto);
            setDiasSeptiembre(septiembre);
            setDiasOctubre(octubre);
            setDiasNoviembre(noviembre);
            setDiasDiciembre(diciembre);
            //         const resultado = ( 226368 * octubre )   ;
            // setvalor_octubre(resultado.toString());


            const resultadoEnero =( (86.4 * liquidacion?.data.caudal_consecionado)* enero ).toFixed(3);;
            setValorEnero(resultadoEnero.toString());

            const resultadoFebrero = ((86.4 * liquidacion?.data.caudal_consecionado)* febrero).toFixed(3);
            setValorFebrero(resultadoFebrero.toString());

            const resultadoMarzo =( (86.4 * liquidacion?.data.caudal_consecionado)* marzo).toFixed(3);;
            setValorMarzo(resultadoMarzo.toString());

            const resultadoAbril = ((86.4 * liquidacion?.data.caudal_consecionado)* abril).toFixed(3);;
            setValorAbril(resultadoAbril.toString());

            const resultadoMayo = ((86.4 * liquidacion?.data.caudal_consecionado)* mayo).toFixed(3);
            setValorMayo(resultadoMayo.toString());

            const resultadoJunio = ((86.4 * liquidacion?.data.caudal_consecionado)* junio).toFixed(3);
            setValorJunio(resultadoJunio.toString());

            const resultadoJulio = ((86.4 * liquidacion?.data.caudal_consecionado)* julio).toFixed(3);
            setValorJulio(resultadoJulio.toString());

            const resultadoAgosto = ((86.4 * liquidacion?.data.caudal_consecionado)* agosto).toFixed(3);
            setValorAgosto(resultadoAgosto.toString());

            const resultadoSeptiembre = ((86.4 * liquidacion?.data.caudal_consecionado)* septiembre).toFixed(3);
            setValorSeptiembre(resultadoSeptiembre.toString());

            const resultadoOctubre = ((86.4 * liquidacion?.data.caudal_consecionado)* octubre).toFixed(3);
            setValorOctubre(resultadoOctubre.toString());

            const resultadoNoviembre = ((86.4 * liquidacion?.data.caudal_consecionado)* noviembre).toFixed(3);
            setValorNoviembre(resultadoNoviembre.toString());

            const resultadoDiciembre = ((86.4 * liquidacion?.data.caudal_consecionado)* diciembre).toFixed(3);
            setValorDiciembre(resultadoDiciembre.toString());

            const suma = parseFloat(resultadoEnero) + parseFloat(resultadoFebrero)       + parseFloat(resultadoMarzo) + parseFloat(resultadoAbril)       + parseFloat(resultadoMayo)      + parseFloat(resultadoJunio)     + parseFloat(resultadoJulio)    + parseFloat(resultadoAgosto)     + parseFloat(resultadoSeptiembre)    + parseFloat(resultadoOctubre)     + parseFloat(resultadoNoviembre)   + parseFloat(resultadoDiciembre)          ;
            const sumaa = parseFloat(liquidacion?.data?.valor_cuota) / 12 ;

            setSumaResultados(sumaa);

            {}

        }


    }, [liquidacion?.data.anio]); // Dependencia del efecto es el año de la liquidación

  

    const htmlContent = `<!DOCTYPE html>
    <!-- Created by pdf2htmlEX (https://github.com/pdf2htmlEX/pdf2htmlEX) -->
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8"/>
        <meta name="generator" content="pdf2htmlEX"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <style type="text/css">
            /*!
     * Base CSS for pdf2htmlEX
     * Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com>
     * https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE
     */
            #sidebar {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                width: 250px;
                padding: 0;
                margin: 0;
                overflow: auto
            }
    
            #page-container {
                position: absolute;
                top: 0;
                left: 0;
                margin: 0;
                padding: 0;
                border: 0
            }
    
            @media screen{#sidebar.opened + #page-container {
                left: 250px
            }
    
                #page-container {
                    bottom: 0;
                    right: 0;
                    overflow: auto
                }
    
                .loading-indicator {
                    display: none
                }
    
                .loading-indicator.active {
                    display: block;
                    position: absolute;
                    width: 64px;
                    height: 64px;
                    top: 50%;
                    left: 50%;
                    margin-top: -32px;
                    margin-left: -32px
                }
    
                .loading-indicator img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0
                }
            }
    
            @media print {
                @page {
                    margin: 0
                }
    
                html {
                    margin: 0
                }
    
                body {
                    margin: 0;
                    -webkit-print-color-adjust: exact
                }
    
                #sidebar {
                    display: none
                }
    
                #page-container {
                    width: auto;
                    height: auto;
                    overflow: visible;
                    background-color: transparent
                }
    
                .d {
                    display: none
                }
            }
    
            .pf {
                position: relative;
                background-color: white;
                overflow: hidden;
                margin: 0;
                border: 0
            }
    
            .pc {
                position: absolute;
                border: 0;
                padding: 0;
                margin: 0;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                display: block;
                transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                -webkit-transform-origin: 0 0
            }
    
            .pc.opened {
                display: block
            }
    
            .bf {
                position: absolute;
                border: 0;
                margin: 0;
                top: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none
            }
    
            .bi {
                position: absolute;
                border: 0;
                margin: 0;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none
            }
    
            @media print {
                .pf {
                    margin: 0;
                    box-shadow: none;
                    page-break-after: always;
                    page-break-inside: avoid
                }
    
                @-moz-document url-prefix() {
                    .pf {
                        overflow: visible;
                        border: 1px solid #fff
                    }
                    .pc {
                        overflow: visible
                    }
                }
            }
    
            .c {
                position: absolute;
                border: 0;
                padding: 0;
                margin: 0;
                overflow: hidden;
                display: block
            }
    
            .t {
                position: absolute;
                white-space: pre;
                font-size: 1px;
                transform-origin: 0 100%;
                -ms-transform-origin: 0 100%;
                -webkit-transform-origin: 0 100%;
                unicode-bidi: bidi-override;
                -moz-font-feature-settings: "liga" 0
            }
    
            .t:after {
                content: ''
            }
    
            .t:before {
                content: '';
                display: inline-block
            }
    
            .t span {
                position: relative;
                unicode-bidi: bidi-override
            }
    
            ._ {
                display: inline-block;
                color: transparent;
                z-index: -1
            }
    
            ::selection {
                background: rgba(127, 255, 255, 0.4)
            }
    
            ::-moz-selection {
                background: rgba(127, 255, 255, 0.4)
            }
    
            .pi {
                display: none
            }
    
            .d {
                position: absolute;
                transform-origin: 0 100%;
                -ms-transform-origin: 0 100%;
                -webkit-transform-origin: 0 100%
            }
    
            .it {
                border: 0;
                background-color: rgba(255, 255, 255, 0.0)
            }
    
            .ir:hover {
                cursor: pointer
            }</style>
        <style type="text/css">
            /*!
     * Fancy styles for pdf2htmlEX
     * Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com>
     * https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE
     */
            @keyframes fadein {
                from {
                    opacity: 0
                }
                to {
                    opacity: 1
                }
            }
    
            @-webkit-keyframes fadein {
                from {
                    opacity: 0
                }
                to {
                    opacity: 1
                }
            }
    
            @keyframes swing {
    
            0
            {
                transform: rotate(0)
            }
            10
            %
            {
                transform: rotate(0)
            }
            90
            %
            {
                transform: rotate(720deg)
            }
            100
            %
            {
                transform: rotate(720deg)
            }
            }
            @-webkit-keyframes swing {
    
            0
            {
                -webkit-transform: rotate(0)
            }
            10
            %
            {
                -webkit-transform: rotate(0)
            }
            90
            %
            {
                -webkit-transform: rotate(720deg)
            }
            100
            %
            {
                -webkit-transform: rotate(720deg)
            }
            }
            @media screen{#sidebar {
                background-color:#2f3236
    
            ;background-image:
    
            url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjNDAzYzNmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxZTI5MmQiPjwvcGF0aD4KPC9zdmc+")
            }
    
            #outline {
                font-family: Georgia, Times, "Times New Roman", serif;
                font-size: 13px;
                margin: 2em 1em
            }
    
            #outline ul {
                padding: 0
            }
    
            #outline li {
                list-style-type: none;
                margin: 1em 0
            }
    
            #outline li > ul {
                margin-left: 1em
            }
    
            #outline a, #outline a:visited, #outline a:hover, #outline a:active {
                line-height: 1.2;
                color: #e8e8e8;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-decoration: none;
                display: block;
                overflow: hidden;
                outline: 0
            }
    
            #outline a:hover {
                color: #0cf
            }
    
            #page-container {
                background-color: #9e9e9e;
                background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=");
                -webkit-transition: left 500ms;
                transition: left 500ms
            }
    
            .pf {
                margin: 13px auto;
                box-shadow: 1px 1px 3px 1px #333;
                border-collapse: separate
            }
    
            .pc.opened {
                -webkit-animation: fadein 100ms;
                animation: fadein 100ms
            }
    
            .loading-indicator.active {
                -webkit-animation: swing 1.5s ease-in-out .01s infinite alternate none;
                animation: swing 1.5s ease-in-out .01s infinite alternate none
            }
    
            .checked {
                background: no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3goQDSYgDiGofgAAAslJREFUOMvtlM9LFGEYx7/vvOPM6ywuuyPFihWFBUsdNnA6KLIh+QPx4KWExULdHQ/9A9EfUodYmATDYg/iRewQzklFWxcEBcGgEplDkDtI6sw4PzrIbrOuedBb9MALD7zv+3m+z4/3Bf7bZS2bzQIAcrmcMDExcTeXy10DAFVVAQDksgFUVZ1ljD3yfd+0LOuFpmnvVVW9GHhkZAQcxwkNDQ2FSCQyRMgJxnVdy7KstKZpn7nwha6urqqfTqfPBAJAuVymlNLXoigOhfd5nmeiKL5TVTV+lmIKwAOA7u5u6Lped2BsbOwjY6yf4zgQQkAIAcedaPR9H67r3uYBQFEUFItFtLe332lpaVkUBOHK3t5eRtf1DwAwODiIubk5DA8PM8bYW1EU+wEgCIJqsCAIQAiB7/u253k2BQDDMJBKpa4mEon5eDx+UxAESJL0uK2t7XosFlvSdf0QAEmlUnlRFJ9Waho2Qghc1/U9z3uWz+eX+Wr+lL6SZfleEAQIggA8z6OpqSknimIvYyybSCReMsZ6TislhCAIAti2Dc/zejVNWwCAavN8339j27YbTg0AGGM3WltbP4WhlRWq6Q/btrs1TVsYHx+vNgqKoqBUKn2NRqPFxsbGJzzP05puUlpt0ukyOI6z7zjOwNTU1OLo6CgmJyf/gA3DgKIoWF1d/cIY24/FYgOU0pp0z/Ityzo8Pj5OTk9PbwHA+vp6zWghDC+VSiuRSOQgGo32UErJ38CO42wdHR09LBQK3zKZDDY2NupmFmF4R0cHVlZWlmRZ/iVJUn9FeWWcCCE4ODjYtG27Z2Zm5juAOmgdGAB2d3cBADs7O8uSJN2SZfl+WKlpmpumaT6Yn58vn/fs6XmbhmHMNjc3tzDGFI7jYJrm5vb29sDa2trPC/9aiqJUy5pOp4f6+vqeJ5PJBAB0dnZe/t8NBajx/z37Df5OGX8d13xzAAAAAElFTkSuQmCC)
            }
    
            }</style>
        <style type="text/css">
            .ff0 {
                font-family: sans-serif;
                visibility: hidden;
            }
    
            @font-face {
                font-family: ff1;
                src: url('data:application/font-woff;base64,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') format("woff");
            }
    
            .ff1 {
                font-family: ff1;
                line-height: 1.113281;
                font-style: normal;
                font-weight: normal;
                visibility: visible;
            }
    
            @font-face {
                font-family: ff2;
                src: url('data:application/font-woff;base64,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') format("woff");
            }
    
            .ff2 {
                font-family: ff2;
                line-height: 0.666504;
                font-style: normal;
                font-weight: normal;
                visibility: visible;
            }
    
            @font-face {
                font-family: ff3;
                src: url('data:application/font-woff;base64,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') format("woff");
            }
    
            .ff3 {
                font-family: ff3;
                line-height: 0.938477;
                font-style: normal;
                font-weight: normal;
                visibility: visible;
            }
    
            @font-face {
                font-family: ff4;
                src: url('data:application/font-woff;base64,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') format("woff");
            }
    
            .ff4 {
                font-family: ff4;
                line-height: 1.013184;
                font-style: normal;
                font-weight: normal;
                visibility: visible;
            }
    
            .m6 {
                transform: matrix(0.190476, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.190476, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.190476, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m2 {
                transform: matrix(0.196429, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.196429, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.196429, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m9 {
                transform: matrix(0.200000, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.200000, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.200000, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m3 {
                transform: matrix(0.205882, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.205882, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.205882, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m1 {
                transform: matrix(0.208333, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.208333, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.208333, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m8 {
                transform: matrix(0.220588, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.220588, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.220588, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .ma {
                transform: matrix(0.225000, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.225000, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.225000, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m7 {
                transform: matrix(0.227273, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.227273, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.227273, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m5 {
                transform: matrix(0.235294, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.235294, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.235294, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m4 {
                transform: matrix(0.236111, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.236111, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.236111, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .m0 {
                transform: matrix(0.250000, 0.000000, 0.000000, 0.250000, 0, 0);
                -ms-transform: matrix(0.250000, 0.000000, 0.000000, 0.250000, 0, 0);
                -webkit-transform: matrix(0.250000, 0.000000, 0.000000, 0.250000, 0, 0);
            }
    
            .v0 {
                vertical-align: 0.000000px;
            }
    
            .v1 {
                vertical-align: 34.560000px;
            }
    
            .ls2f {
                letter-spacing: -0.844800px;
            }
    
            .ls47 {
                letter-spacing: -0.706464px;
            }
    
            .ls30 {
                letter-spacing: -0.652800px;
            }
    
            .ls60 {
                letter-spacing: -0.646272px;
            }
    
            .ls32 {
                letter-spacing: -0.422400px;
            }
    
            .ls38 {
                letter-spacing: -0.396000px;
            }
    
            .ls4e {
                letter-spacing: -0.383328px;
            }
    
            .ls4b {
                letter-spacing: -0.380160px;
            }
    
            .ls62 {
                letter-spacing: -0.348480px;
            }
    
            .ls36 {
                letter-spacing: -0.345600px;
            }
    
            .ls4f {
                letter-spacing: -0.332640px;
            }
    
            .ls4c {
                letter-spacing: -0.331968px;
            }
    
            .ls31 {
                letter-spacing: -0.307200px;
            }
    
            .ls55 {
                letter-spacing: -0.275616px;
            }
    
            .ls33 {
                letter-spacing: -0.230400px;
            }
    
            .ls57 {
                letter-spacing: -0.205920px;
            }
    
            .ls50 {
                letter-spacing: -0.180576px;
            }
    
            .ls67 {
                letter-spacing: -0.167904px;
            }
    
            .ls52 {
                letter-spacing: -0.155232px;
            }
    
            .ls40 {
                letter-spacing: -0.148896px;
            }
    
            .ls3d {
                letter-spacing: -0.129888px;
            }
    
            .ls46 {
                letter-spacing: -0.126720px;
            }
    
            .ls51 {
                letter-spacing: -0.115200px;
            }
    
            .ls49 {
                letter-spacing: -0.088704px;
            }
    
            .ls54 {
                letter-spacing: -0.044352px;
            }
    
            .ls5c {
                letter-spacing: -0.025344px;
            }
    
            .ls3a {
                letter-spacing: -0.018144px;
            }
    
            .ls5b {
                letter-spacing: -0.010368px;
            }
    
            .ls66 {
                letter-spacing: -0.009504px;
            }
    
            .ls69 {
                letter-spacing: -0.007776px;
            }
    
            .ls35 {
                letter-spacing: -0.004800px;
            }
    
            .ls2e {
                letter-spacing: 0.000000px;
            }
    
            .ls6a {
                letter-spacing: 0.005184px;
            }
    
            .ls6d {
                letter-spacing: 0.011520px;
            }
    
            .ls4d {
                letter-spacing: 0.038016px;
            }
    
            .ls7 {
                letter-spacing: 0.095928px;
            }
    
            .ls53 {
                letter-spacing: 0.107712px;
            }
    
            .ls3 {
                letter-spacing: 0.115200px;
            }
    
            .ls2 {
                letter-spacing: 0.116928px;
            }
    
            .ls21 {
                letter-spacing: 0.167904px;
            }
    
            .ls20 {
                letter-spacing: 0.192000px;
            }
    
            .ls12 {
                letter-spacing: 0.215424px;
            }
    
            .ls34 {
                letter-spacing: 0.228096px;
            }
    
            .ls1c {
                letter-spacing: 0.277109px;
            }
    
            .ls2d {
                letter-spacing: 0.307200px;
            }
    
            .ls64 {
                letter-spacing: 0.373824px;
            }
    
            .ls6 {
                letter-spacing: 0.408864px;
            }
    
            .ls11 {
                letter-spacing: 0.408960px;
            }
    
            .ls4 {
                letter-spacing: 0.409008px;
            }
    
            .ls45 {
                letter-spacing: 0.421344px;
            }
    
            .ls3b {
                letter-spacing: 0.440352px;
            }
    
            .ls43 {
                letter-spacing: 0.459360px;
            }
    
            .ls2a {
                letter-spacing: 0.474240px;
            }
    
            .ls5f {
                letter-spacing: 0.481536px;
            }
    
            .ls10 {
                letter-spacing: 0.506880px;
            }
    
            .ls18 {
                letter-spacing: 0.510048px;
            }
    
            .ls41 {
                letter-spacing: 0.519552px;
            }
    
            .ls19 {
                letter-spacing: 0.627264px;
            }
    
            .ls1d {
                letter-spacing: 0.630432px;
            }
    
            .ls5e {
                letter-spacing: 0.696960px;
            }
    
            .ls58 {
                letter-spacing: 0.710208px;
            }
    
            .ls65 {
                letter-spacing: 0.744480px;
            }
    
            .ls5a {
                letter-spacing: 0.757152px;
            }
    
            .ls56 {
                letter-spacing: 0.763488px;
            }
    
            .ls22 {
                letter-spacing: 0.792960px;
            }
    
            .ls0 {
                letter-spacing: 0.844800px;
            }
    
            .ls37 {
                letter-spacing: 0.878400px;
            }
    
            .ls1e {
                letter-spacing: 0.880704px;
            }
    
            .lse {
                letter-spacing: 0.898720px;
            }
    
            .lsa {
                letter-spacing: 0.898768px;
            }
    
            .ls8 {
                letter-spacing: 0.898817px;
            }
    
            .ls9 {
                letter-spacing: 0.898865px;
            }
    
            .ls25 {
                letter-spacing: 0.898963px;
            }
    
            .lsd {
                letter-spacing: 0.899205px;
            }
    
            .ls13 {
                letter-spacing: 0.902400px;
            }
    
            .ls3f {
                letter-spacing: 0.937728px;
            }
    
            .ls2b {
                letter-spacing: 0.948672px;
            }
    
            .ls6b {
                letter-spacing: 0.966816px;
            }
    
            .ls5d {
                letter-spacing: 0.974400px;
            }
    
            .ls68 {
                letter-spacing: 0.997920px;
            }
    
            .ls28 {
                letter-spacing: 1.016928px;
            }
    
            .ls1a {
                letter-spacing: 1.023264px;
            }
    
            .lsf {
                letter-spacing: 1.035936px;
            }
    
            .ls1b {
                letter-spacing: 1.045440px;
            }
    
            .ls4a {
                letter-spacing: 1.077120px;
            }
    
            .ls29 {
                letter-spacing: 1.107802px;
            }
    
            .ls3e {
                letter-spacing: 1.108800px;
            }
    
            .ls63 {
                letter-spacing: 1.149984px;
            }
    
            .ls59 {
                letter-spacing: 1.189728px;
            }
    
            .ls17 {
                letter-spacing: 1.194240px;
            }
    
            .ls16 {
                letter-spacing: 1.317888px;
            }
    
            .ls39 {
                letter-spacing: 1.378080px;
            }
    
            .ls61 {
                letter-spacing: 1.498464px;
            }
    
            .ls5 {
                letter-spacing: 1.560960px;
            }
    
            .ls48 {
                letter-spacing: 1.587168px;
            }
    
            .ls42 {
                letter-spacing: 1.606176px;
            }
    
            .ls3c {
                letter-spacing: 1.644192px;
            }
    
            .ls44 {
                letter-spacing: 1.647360px;
            }
    
            .ls24 {
                letter-spacing: 1.752960px;
            }
    
            .ls1 {
                letter-spacing: 1.804800px;
            }
    
            .ls6c {
                letter-spacing: 1.850112px;
            }
    
            .ls26 {
                letter-spacing: 2.064565px;
            }
    
            .ls23 {
                letter-spacing: 2.712960px;
            }
    
            .ls15 {
                letter-spacing: 3.672960px;
            }
    
            .ls1f {
                letter-spacing: 3.761455px;
            }
    
            .ls14 {
                letter-spacing: 4.632960px;
            }
    
            .lsb {
                letter-spacing: 7.893114px;
            }
    
            .lsc {
                letter-spacing: 9.058911px;
            }
    
            .ls27 {
                letter-spacing: 83.664534px;
            }
    
            .ls2c {
                letter-spacing: 189.333120px;
            }
    
            .sc_ {
                text-shadow: none;
            }
    
            .sc0 {
                text-shadow: -0.015em 0 transparent, 0 0.015em transparent, 0.015em 0 transparent, 0 -0.015em transparent;
            }
    
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
                .sc_ {
                    -webkit-text-stroke: 0px transparent;
                }
    
                .sc0 {
                    -webkit-text-stroke: 0.015em transparent;
                    text-shadow: none;
                }
            }
    
            .ws6 {
                word-spacing: -15.595968px;
            }
    
            .ws3b {
                word-spacing: -14.318400px;
            }
    
            .ws3c {
                word-spacing: -13.536000px;
            }
    
            .ws9 {
                word-spacing: -13.339200px;
            }
    
            .wsa {
                word-spacing: -12.998400px;
            }
    
            .ws29 {
                word-spacing: -11.577600px;
            }
    
            .ws1 {
                word-spacing: -10.982400px;
            }
    
            .ws0 {
                word-spacing: -10.790400px;
            }
    
            .ws2a {
                word-spacing: -10.675200px;
            }
    
            .ws7 {
                word-spacing: -10.444800px;
            }
    
            .ws4 {
                word-spacing: -10.368000px;
            }
    
            .ws5 {
                word-spacing: -10.252800px;
            }
    
            .ws4c {
                word-spacing: -10.225920px;
            }
    
            .wsd {
                word-spacing: -10.185120px;
            }
    
            .wsb {
                word-spacing: -10.124928px;
            }
    
            .ws19 {
                word-spacing: -10.074240px;
            }
    
            .ws10 {
                word-spacing: -10.071072px;
            }
    
            .ws16 {
                word-spacing: -10.033056px;
            }
    
            .ws3 {
                word-spacing: -10.022400px;
            }
    
            .ws1e {
                word-spacing: -10.014048px;
            }
    
            .ws3f {
                word-spacing: -9.925344px;
            }
    
            .ws2 {
                word-spacing: -9.830400px;
            }
    
            .ws41 {
                word-spacing: -9.576864px;
            }
    
            .ws2e {
                word-spacing: -9.570528px;
            }
    
            .ws35 {
                word-spacing: -9.564192px;
            }
    
            .ws12 {
                word-spacing: -9.535680px;
            }
    
            .ws20 {
                word-spacing: -9.504000px;
            }
    
            .ws37 {
                word-spacing: -9.472320px;
            }
    
            .ws13 {
                word-spacing: -9.462816px;
            }
    
            .ws17 {
                word-spacing: -9.443808px;
            }
    
            .ws33 {
                word-spacing: -9.434304px;
            }
    
            .ws4b {
                word-spacing: -9.424800px;
            }
    
            .ws1a {
                word-spacing: -9.364608px;
            }
    
            .ws34 {
                word-spacing: -9.317088px;
            }
    
            .ws21 {
                word-spacing: -9.313920px;
            }
    
            .ws3a {
                word-spacing: -9.307584px;
            }
    
            .ws43 {
                word-spacing: -9.171360px;
            }
    
            .ws39 {
                word-spacing: -9.057312px;
            }
    
            .ws22 {
                word-spacing: -9.035136px;
            }
    
            .ws1f {
                word-spacing: -9.022464px;
            }
    
            .ws8 {
                word-spacing: -8.974944px;
            }
    
            .ws15 {
                word-spacing: -8.946432px;
            }
    
            .ws2f {
                word-spacing: -8.914752px;
            }
    
            .ws3d {
                word-spacing: -8.908416px;
            }
    
            .ws18 {
                word-spacing: -8.886240px;
            }
    
            .wsf {
                word-spacing: -8.867232px;
            }
    
            .ws1b {
                word-spacing: -8.848224px;
            }
    
            .ws25 {
                word-spacing: -8.845056px;
            }
    
            .ws42 {
                word-spacing: -8.800704px;
            }
    
            .ws44 {
                word-spacing: -8.797536px;
            }
    
            .ws2c {
                word-spacing: -8.762688px;
            }
    
            .ws2b {
                word-spacing: -8.651808px;
            }
    
            .ws45 {
                word-spacing: -8.639136px;
            }
    
            .ws28 {
                word-spacing: -8.626464px;
            }
    
            .ws27 {
                word-spacing: -8.474400px;
            }
    
            .ws46 {
                word-spacing: -8.426880px;
            }
    
            .ws26 {
                word-spacing: -8.423712px;
            }
    
            .wsc {
                word-spacing: -8.411040px;
            }
    
            .ws38 {
                word-spacing: -8.401536px;
            }
    
            .ws32 {
                word-spacing: -8.395488px;
            }
    
            .ws24 {
                word-spacing: -8.338176px;
            }
    
            .ws1c {
                word-spacing: -8.300160px;
            }
    
            .ws11 {
                word-spacing: -8.296992px;
            }
    
            .ws14 {
                word-spacing: -8.277984px;
            }
    
            .ws30 {
                word-spacing: -8.220960px;
            }
    
            .ws4a {
                word-spacing: -8.172576px;
            }
    
            .ws48 {
                word-spacing: -8.154432px;
            }
    
            .ws2d {
                word-spacing: -8.151264px;
            }
    
            .ws40 {
                word-spacing: -8.078400px;
            }
    
            .ws23 {
                word-spacing: -8.046720px;
            }
    
            .ws31 {
                word-spacing: -7.915968px;
            }
    
            .ws3e {
                word-spacing: -7.780608px;
            }
    
            .ws1d {
                word-spacing: -7.720416px;
            }
    
            .ws49 {
                word-spacing: -7.210944px;
            }
    
            .ws47 {
                word-spacing: -7.197984px;
            }
    
            .ws36 {
                word-spacing: -7.195392px;
            }
    
            .wse {
                word-spacing: -7.187616px;
            }
    
            .ws4d {
                word-spacing: 0.000000px;
            }
    
            ._5 {
                margin-left: -4.460947px;
            }
    
            ._1 {
                margin-left: -3.379200px;
            }
    
            ._3 {
                margin-left: -2.335344px;
            }
    
            ._0 {
                margin-left: -1.190400px;
            }
    
            ._2 {
                width: 1.574400px;
            }
    
            ._4 {
                width: 2.637694px;
            }
    
            .fc4 {
                color: transparent;
            }
    
            .fc3 {
                color: rgb(0, 0, 255);
            }
    
            .fc2 {
                color: rgb(255, 0, 255);
            }
    
            .fc1 {
                color: rgb(255, 0, 0);
            }
    
            .fc0 {
                color: rgb(0, 0, 0);
            }
    
            .fs5 {
                font-size: 25.920000px;
            }
    
            .fs7 {
                font-size: 27.840000px;
            }
    
            .fs8 {
                font-size: 29.760000px;
            }
    
            .fs3 {
                font-size: 31.680000px;
            }
    
            .fs6 {
                font-size: 36.480000px;
            }
    
            .fs0 {
                font-size: 38.400000px;
            }
    
            .fs9 {
                font-size: 40.320000px;
            }
    
            .fs2 {
                font-size: 44.160000px;
            }
    
            .fs4 {
                font-size: 48.000000px;
            }
    
            .fs1 {
                font-size: 55.680000px;
            }
    
            .fsa {
                font-size: 64.320000px;
            }
    
            .y0 {
                bottom: -0.500000px;
            }
    
            .y3a {
                bottom: 2.680000px;
            }
    
            .y26 {
                bottom: 2.720000px;
            }
    
            .y14 {
                bottom: 3.200000px;
            }
    
            .y18 {
                bottom: 3.760000px;
            }
    
            .y38 {
                bottom: 4.280000px;
            }
    
            .y31 {
                bottom: 4.440000px;
            }
    
            .y67 {
                bottom: 4.560000px;
            }
    
            .yb {
                bottom: 4.960000px;
            }
    
            .y61 {
                bottom: 5.000000px;
            }
    
            .y32 {
                bottom: 5.160000px;
            }
    
            .y66 {
                bottom: 5.280000px;
            }
    
            .y1f {
                bottom: 5.320000px;
            }
    
            .y2d {
                bottom: 5.360000px;
            }
    
            .y49 {
                bottom: 5.480000px;
            }
    
            .y2a {
                bottom: 5.520000px;
            }
    
            .y2c {
                bottom: 5.600000px;
            }
    
            .y51 {
                bottom: 5.640000px;
            }
    
            .y1a {
                bottom: 5.760000px;
            }
    
            .y3d {
                bottom: 5.800000px;
            }
    
            .y57 {
                bottom: 5.880000px;
            }
    
            .ya {
                bottom: 5.920000px;
            }
    
            .y2 {
                bottom: 6.000000px;
            }
    
            .yd {
                bottom: 6.040000px;
            }
    
            .y41 {
                bottom: 6.080000px;
            }
    
            .y44 {
                bottom: 6.360000px;
            }
    
            .y64 {
                bottom: 6.400000px;
            }
    
            .y36 {
                bottom: 6.600000px;
            }
    
            .y28 {
                bottom: 6.640000px;
            }
    
            .y55 {
                bottom: 6.760000px;
            }
    
            .y11 {
                bottom: 6.800000px;
            }
    
            .y63 {
                bottom: 6.880000px;
            }
    
            .y48 {
                bottom: 6.920000px;
            }
    
            .y47 {
                bottom: 7.160000px;
            }
    
            .y34 {
                bottom: 7.320000px;
            }
    
            .y10 {
                bottom: 7.760000px;
            }
    
            .y30 {
                bottom: 8.040000px;
            }
    
            .y35 {
                bottom: 8.280000px;
            }
    
            .y54 {
                bottom: 8.440000px;
            }
    
            .y6a {
                bottom: 8.520000px;
            }
    
            .y6b {
                bottom: 9.240000px;
            }
    
            .y3e {
                bottom: 10.360000px;
            }
    
            .y8 {
                bottom: 10.400000px;
            }
    
            .y52 {
                bottom: 10.920000px;
            }
    
            .y1c {
                bottom: 11.000000px;
            }
    
            .yf {
                bottom: 11.360000px;
            }
    
            .y4e {
                bottom: 11.600000px;
            }
    
            .y13 {
                bottom: 12.320000px;
            }
    
            .y22 {
                bottom: 12.720000px;
            }
    
            .y77 {
                bottom: 12.960000px;
            }
    
            .y45 {
                bottom: 13.080000px;
            }
    
            .y17 {
                bottom: 13.600000px;
            }
    
            .y23 {
                bottom: 13.680000px;
            }
    
            .y1d {
                bottom: 13.880000px;
            }
    
            .y68 {
                bottom: 14.040000px;
            }
    
            .y5f {
                bottom: 15.240000px;
            }
    
            .y4d {
                bottom: 15.920000px;
            }
    
            .y50 {
                bottom: 16.200000px;
            }
    
            .y3c {
                bottom: 16.360000px;
            }
    
            .y40 {
                bottom: 16.640000px;
            }
    
            .y43 {
                bottom: 16.680000px;
            }
    
            .y76 {
                bottom: 16.800000px;
            }
    
            .y2f {
                bottom: 18.600000px;
            }
    
            .y21 {
                bottom: 21.600000px;
            }
    
            .y24 {
                bottom: 21.840000px;
            }
    
            .y7 {
                bottom: 22.400000px;
            }
    
            .y16 {
                bottom: 23.200000px;
            }
    
            .y5e {
                bottom: 26.520000px;
            }
    
            .y75 {
                bottom: 27.360000px;
            }
    
            .y6 {
                bottom: 33.680000px;
            }
    
            .y5d {
                bottom: 37.800000px;
            }
    
            .y74 {
                bottom: 42.480000px;
            }
    
            .y5 {
                bottom: 46.160000px;
            }
    
            .y5c {
                bottom: 49.320000px;
            }
    
            .y73 {
                bottom: 54.720000px;
            }
    
            .y5b {
                bottom: 58.440000px;
            }
    
            .y4 {
                bottom: 59.120000px;
            }
    
            .y72 {
                bottom: 65.520000px;
            }
    
            .y5a {
                bottom: 67.320000px;
            }
    
            .y71 {
                bottom: 74.400000px;
            }
    
            .y59 {
                bottom: 83.880000px;
            }
    
            .y70 {
                bottom: 84.240000px;
            }
    
            .y6f {
                bottom: 93.840000px;
            }
    
            .y6e {
                bottom: 105.360000px;
            }
    
            .y6d {
                bottom: 115.440000px;
            }
    
            .y6c {
                bottom: 125.280000px;
            }
    
            .y69 {
                bottom: 135.000000px;
            }
    
            .y58 {
                bottom: 153.000000px;
            }
    
            .y65 {
                bottom: 186.000000px;
            }
    
            .y62 {
                bottom: 200.000000px;
            }
    
            .y60 {
                bottom: 217.000000px;
            }
    
            .y56 {
                bottom: 231.000000px;
            }
    
            .y53 {
                bottom: 245.000000px;
            }
    
            .y4f {
                bottom: 261.000000px;
            }
    
            .y4c {
                bottom: 286.000000px;
            }
    
            .y4b {
                bottom: 310.000000px;
            }
    
            .y4a {
                bottom: 335.000000px;
            }
    
            .y46 {
                bottom: 349.000000px;
            }
    
            .y42 {
                bottom: 363.000000px;
            }
    
            .y3f {
                bottom: 388.000000px;
            }
    
            .y3b {
                bottom: 413.000000px;
            }
    
            .y39 {
                bottom: 437.000000px;
            }
    
            .y37 {
                bottom: 451.000000px;
            }
    
            .y33 {
                bottom: 465.000000px;
            }
    
            .y2e {
                bottom: 483.000000px;
            }
    
            .y2b {
                bottom: 496.000000px;
            }
    
            .y29 {
                bottom: 510.000000px;
            }
    
            .y27 {
                bottom: 524.000000px;
            }
    
            .y25 {
                bottom: 538.000000px;
            }
    
            .y20 {
                bottom: 552.000000px;
            }
    
            .y1e {
                bottom: 581.000000px;
            }
    
            .y1b {
                bottom: 595.000000px;
            }
    
            .y19 {
                bottom: 618.000000px;
            }
    
            .y15 {
                bottom: 632.000000px;
            }
    
            .y12 {
                bottom: 664.000000px;
            }
    
            .y3 {
                bottom: 682.000000px;
            }
    
            .ye {
                bottom: 700.000000px;
            }
    
            .yc {
                bottom: 725.000000px;
            }
    
            .y9 {
                bottom: 740.000000px;
            }
    
            .y1 {
                bottom: 756.000000px;
            }
    
            .h18 {
                height: 13.000000px;
            }
    
            .h13 {
                height: 14.000000px;
            }
    
            .ha {
                height: 15.000000px;
            }
    
            .h7 {
                height: 16.000000px;
            }
    
            .h2 {
                height: 17.000000px;
            }
    
            .hc {
                height: 18.000000px;
            }
    
            .h15 {
                height: 18.555469px;
            }
    
            .he {
                height: 18.870469px;
            }
    
            .hd {
                height: 19.000000px;
            }
    
            .h16 {
                height: 19.835156px;
            }
    
            .h1a {
                height: 21.114844px;
            }
    
            .h11 {
                height: 23.000000px;
            }
    
            .h1b {
                height: 23.401406px;
            }
    
            .h1d {
                height: 24.314063px;
            }
    
            .h19 {
                height: 25.000000px;
            }
    
            .h10 {
                height: 25.446094px;
            }
    
            .hb {
                height: 26.000000px;
            }
    
            .h17 {
                height: 27.000000px;
            }
    
            .h8 {
                height: 28.601719px;
            }
    
            .h14 {
                height: 29.000000px;
            }
    
            .h1f {
                height: 29.354063px;
            }
    
            .h6 {
                height: 29.432813px;
            }
    
            .h22 {
                height: 30.843750px;
            }
    
            .hf {
                height: 32.000000px;
            }
    
            .h20 {
                height: 32.149688px;
            }
    
            .h12 {
                height: 32.935313px;
            }
    
            .h1e {
                height: 34.000000px;
            }
    
            .h3 {
                height: 34.668750px;
            }
    
            .h9 {
                height: 43.335938px;
            }
    
            .h5 {
                height: 50.269688px;
            }
    
            .h4 {
                height: 74.000000px;
            }
    
            .h21 {
                height: 86.223281px;
            }
    
            .h1c {
                height: 93.000000px;
            }
    
            .h0 {
                height: 792.000000px;
            }
    
            .h1 {
                height: 792.500000px;
            }
    
            .we {
                width: 48.000000px;
            }
    
            .w14 {
                width: 49.000000px;
            }
    
            .w8 {
                width: 55.000000px;
            }
    
            .wb {
                width: 74.000000px;
            }
    
            .w19 {
                width: 75.000000px;
            }
    
            .w1b {
                width: 76.000000px;
            }
    
            .w1a {
                width: 77.000000px;
            }
    
            .w1c {
                width: 79.000000px;
            }
    
            .wa {
                width: 80.000000px;
            }
    
            .w4 {
                width: 87.000000px;
            }
    
            .w9 {
                width: 98.000000px;
            }
    
            .w5 {
                width: 99.000000px;
            }
    
            .w10 {
                width: 100.000000px;
            }
    
            .w11 {
                width: 111.000000px;
            }
    
            .wf {
                width: 138.000000px;
            }
    
            .w17 {
                width: 142.000000px;
            }
    
            .w7 {
                width: 148.000000px;
            }
    
            .w1f {
                width: 153.000000px;
            }
    
            .w20 {
                width: 154.000000px;
            }
    
            .w6 {
                width: 185.000000px;
            }
    
            .w18 {
                width: 236.000000px;
            }
    
            .w12 {
                width: 242.000000px;
            }
    
            .w1e {
                width: 247.000000px;
            }
    
            .wd {
                width: 269.000000px;
            }
    
            .w16 {
                width: 330.000000px;
            }
    
            .w3 {
                width: 368.000000px;
            }
    
            .w1d {
                width: 400.000000px;
            }
    
            .wc {
                width: 453.000000px;
            }
    
            .w13 {
                width: 454.000000px;
            }
    
            .w15 {
                width: 504.000000px;
            }
    
            .w2 {
                width: 552.000000px;
            }
    
            .w0 {
                width: 612.000000px;
            }
    
            .w1 {
                width: 612.500000px;
            }
    
            .x0 {
                left: 0.000000px;
            }
    
            .x14 {
                left: 2.200000px;
            }
    
            .x20 {
                left: 3.959884px;
            }
    
            .x13 {
                left: 5.199987px;
            }
    
            .x48 {
                left: 6.920000px;
            }
    
            .x31 {
                left: 10.360010px;
            }
    
            .x4f {
                left: 13.640053px;
            }
    
            .xb {
                left: 14.799943px;
            }
    
            .x11 {
                left: 16.080020px;
            }
    
            .x33 {
                left: 18.160000px;
            }
    
            .x45 {
                left: 19.720000px;
            }
    
            .x4a {
                left: 20.720080px;
            }
    
            .x3f {
                left: 21.759973px;
            }
    
            .x8 {
                left: 23.280020px;
            }
    
            .x40 {
                left: 24.319914px;
            }
    
            .x27 {
                left: 25.359967px;
            }
    
            .x3d {
                left: 26.480053px;
            }
    
            .x1 {
                left: 29.000000px;
            }
    
            .x44 {
                left: 30.079899px;
            }
    
            .x2c {
                left: 31.240000px;
            }
    
            .x2 {
                left: 33.160000px;
            }
    
            .x1b {
                left: 37.000000px;
            }
    
            .x3b {
                left: 38.440048px;
            }
    
            .x21 {
                left: 40.440000px;
            }
    
            .x2e {
                left: 42.280000px;
            }
    
            .x25 {
                left: 43.840000px;
            }
    
            .x24 {
                left: 44.920000px;
            }
    
            .x43 {
                left: 47.080000px;
            }
    
            .x37 {
                left: 48.520000px;
            }
    
            .x1d {
                left: 50.160000px;
            }
    
            .x47 {
                left: 51.439891px;
            }
    
            .xd {
                left: 52.560000px;
            }
    
            .x41 {
                left: 53.840000px;
            }
    
            .x38 {
                left: 55.840000px;
            }
    
            .x49 {
                left: 58.880000px;
            }
    
            .xc {
                left: 60.880000px;
            }
    
            .x9 {
                left: 64.320000px;
            }
    
            .x34 {
                left: 66.640000px;
            }
    
            .x12 {
                left: 71.760000px;
            }
    
            .x46 {
                left: 72.880000px;
            }
    
            .xf {
                left: 74.159918px;
            }
    
            .x2d {
                left: 77.000000px;
            }
    
            .x22 {
                left: 79.000000px;
            }
    
            .x42 {
                left: 80.200000px;
            }
    
            .x2b {
                left: 83.800000px;
            }
    
            .x36 {
                left: 84.840000px;
            }
    
            .x23 {
                left: 87.400000px;
            }
    
            .x17 {
                left: 89.560000px;
            }
    
            .x4d {
                left: 91.000000px;
            }
    
            .x4e {
                left: 95.480000px;
            }
    
            .x54 {
                left: 96.520000px;
            }
    
            .x4b {
                left: 97.960012px;
            }
    
            .x53 {
                left: 100.120000px;
            }
    
            .x2a {
                left: 104.040000px;
            }
    
            .x35 {
                left: 116.680000px;
            }
    
            .x19 {
                left: 126.160000px;
            }
    
            .x18 {
                left: 128.000000px;
            }
    
            .xe {
                left: 133.440000px;
            }
    
            .x10 {
                left: 142.320000px;
            }
    
            .x6 {
                left: 145.480000px;
            }
    
            .x55 {
                left: 146.800000px;
            }
    
            .x4c {
                left: 150.760000px;
            }
    
            .x5b {
                left: 154.560000px;
            }
    
            .x2f {
                left: 166.600000px;
            }
    
            .x5 {
                left: 168.280000px;
            }
    
            .x3 {
                left: 171.640000px;
            }
    
            .x5a {
                left: 180.480000px;
            }
    
            .x50 {
                left: 184.360000px;
            }
    
            .x52 {
                left: 194.920000px;
            }
    
            .x4 {
                left: 199.960000px;
            }
    
            .x3a {
                left: 202.000000px;
            }
    
            .x39 {
                left: 217.960000px;
            }
    
            .x28 {
                left: 228.000000px;
            }
    
            .x5c {
                left: 244.320010px;
            }
    
            .x51 {
                left: 247.000000px;
            }
    
            .x1a {
                left: 275.000000px;
            }
    
            .x16 {
                left: 311.800000px;
            }
    
            .x59 {
                left: 320.160000px;
            }
    
            .x1c {
                left: 330.000000px;
            }
    
            .x29 {
                left: 339.000000px;
            }
    
            .x3c {
                left: 352.000000px;
            }
    
            .x56 {
                left: 353.760000px;
            }
    
            .x7 {
                left: 396.000000px;
            }
    
            .x30 {
                left: 407.000000px;
            }
    
            .x1e {
                left: 427.000000px;
            }
    
            .x58 {
                left: 432.960000px;
            }
    
            .x26 {
                left: 443.000000px;
            }
    
            .x57 {
                left: 476.400000px;
            }
    
            .xa {
                left: 482.000000px;
            }
    
            .x32 {
                left: 494.000000px;
            }
    
            .x3e {
                left: 502.000000px;
            }
    
            .x1f {
                left: 507.000000px;
            }
    
            .x15 {
                left: 523.960000px;
            }
    
            .x5d {
                left: 561.600000px;
            }
    
            @media print {
                .v0 {
                    vertical-align: 0.000000pt;
                }
    
                .v1 {
                    vertical-align: 46.080000pt;
                }
    
                .ls2f {
                    letter-spacing: -1.126400pt;
                }
    
                .ls47 {
                    letter-spacing: -0.941952pt;
                }
    
                .ls30 {
                    letter-spacing: -0.870400pt;
                }
    
                .ls60 {
                    letter-spacing: -0.861696pt;
                }
    
                .ls32 {
                    letter-spacing: -0.563200pt;
                }
    
                .ls38 {
                    letter-spacing: -0.528000pt;
                }
    
                .ls4e {
                    letter-spacing: -0.511104pt;
                }
    
                .ls4b {
                    letter-spacing: -0.506880pt;
                }
    
                .ls62 {
                    letter-spacing: -0.464640pt;
                }
    
                .ls36 {
                    letter-spacing: -0.460800pt;
                }
    
                .ls4f {
                    letter-spacing: -0.443520pt;
                }
    
                .ls4c {
                    letter-spacing: -0.442624pt;
                }
    
                .ls31 {
                    letter-spacing: -0.409600pt;
                }
    
                .ls55 {
                    letter-spacing: -0.367488pt;
                }
    
                .ls33 {
                    letter-spacing: -0.307200pt;
                }
    
                .ls57 {
                    letter-spacing: -0.274560pt;
                }
    
                .ls50 {
                    letter-spacing: -0.240768pt;
                }
    
                .ls67 {
                    letter-spacing: -0.223872pt;
                }
    
                .ls52 {
                    letter-spacing: -0.206976pt;
                }
    
                .ls40 {
                    letter-spacing: -0.198528pt;
                }
    
                .ls3d {
                    letter-spacing: -0.173184pt;
                }
    
                .ls46 {
                    letter-spacing: -0.168960pt;
                }
    
                .ls51 {
                    letter-spacing: -0.153600pt;
                }
    
                .ls49 {
                    letter-spacing: -0.118272pt;
                }
    
                .ls54 {
                    letter-spacing: -0.059136pt;
                }
    
                .ls5c {
                    letter-spacing: -0.033792pt;
                }
    
                .ls3a {
                    letter-spacing: -0.024192pt;
                }
    
                .ls5b {
                    letter-spacing: -0.013824pt;
                }
    
                .ls66 {
                    letter-spacing: -0.012672pt;
                }
    
                .ls69 {
                    letter-spacing: -0.010368pt;
                }
    
                .ls35 {
                    letter-spacing: -0.006400pt;
                }
    
                .ls2e {
                    letter-spacing: 0.000000pt;
                }
    
                .ls6a {
                    letter-spacing: 0.006912pt;
                }
    
                .ls6d {
                    letter-spacing: 0.015360pt;
                }
    
                .ls4d {
                    letter-spacing: 0.050688pt;
                }
    
                .ls7 {
                    letter-spacing: 0.127904pt;
                }
    
                .ls53 {
                    letter-spacing: 0.143616pt;
                }
    
                .ls3 {
                    letter-spacing: 0.153600pt;
                }
    
                .ls2 {
                    letter-spacing: 0.155904pt;
                }
    
                .ls21 {
                    letter-spacing: 0.223872pt;
                }
    
                .ls20 {
                    letter-spacing: 0.256000pt;
                }
    
                .ls12 {
                    letter-spacing: 0.287232pt;
                }
    
                .ls34 {
                    letter-spacing: 0.304128pt;
                }
    
                .ls1c {
                    letter-spacing: 0.369479pt;
                }
    
                .ls2d {
                    letter-spacing: 0.409600pt;
                }
    
                .ls64 {
                    letter-spacing: 0.498432pt;
                }
    
                .ls6 {
                    letter-spacing: 0.545152pt;
                }
    
                .ls11 {
                    letter-spacing: 0.545280pt;
                }
    
                .ls4 {
                    letter-spacing: 0.545344pt;
                }
    
                .ls45 {
                    letter-spacing: 0.561792pt;
                }
    
                .ls3b {
                    letter-spacing: 0.587136pt;
                }
    
                .ls43 {
                    letter-spacing: 0.612480pt;
                }
    
                .ls2a {
                    letter-spacing: 0.632320pt;
                }
    
                .ls5f {
                    letter-spacing: 0.642048pt;
                }
    
                .ls10 {
                    letter-spacing: 0.675840pt;
                }
    
                .ls18 {
                    letter-spacing: 0.680064pt;
                }
    
                .ls41 {
                    letter-spacing: 0.692736pt;
                }
    
                .ls19 {
                    letter-spacing: 0.836352pt;
                }
    
                .ls1d {
                    letter-spacing: 0.840576pt;
                }
    
                .ls5e {
                    letter-spacing: 0.929280pt;
                }
    
                .ls58 {
                    letter-spacing: 0.946944pt;
                }
    
                .ls65 {
                    letter-spacing: 0.992640pt;
                }
    
                .ls5a {
                    letter-spacing: 1.009536pt;
                }
    
                .ls56 {
                    letter-spacing: 1.017984pt;
                }
    
                .ls22 {
                    letter-spacing: 1.057280pt;
                }
    
                .ls0 {
                    letter-spacing: 1.126400pt;
                }
    
                .ls37 {
                    letter-spacing: 1.171200pt;
                }
    
                .ls1e {
                    letter-spacing: 1.174272pt;
                }
    
                .lse {
                    letter-spacing: 1.198293pt;
                }
    
                .lsa {
                    letter-spacing: 1.198358pt;
                }
    
                .ls8 {
                    letter-spacing: 1.198422pt;
                }
    
                .ls9 {
                    letter-spacing: 1.198487pt;
                }
    
                .ls25 {
                    letter-spacing: 1.198617pt;
                }
    
                .lsd {
                    letter-spacing: 1.198940pt;
                }
    
                .ls13 {
                    letter-spacing: 1.203200pt;
                }
    
                .ls3f {
                    letter-spacing: 1.250304pt;
                }
    
                .ls2b {
                    letter-spacing: 1.264896pt;
                }
    
                .ls6b {
                    letter-spacing: 1.289088pt;
                }
    
                .ls5d {
                    letter-spacing: 1.299200pt;
                }
    
                .ls68 {
                    letter-spacing: 1.330560pt;
                }
    
                .ls28 {
                    letter-spacing: 1.355904pt;
                }
    
                .ls1a {
                    letter-spacing: 1.364352pt;
                }
    
                .lsf {
                    letter-spacing: 1.381248pt;
                }
    
                .ls1b {
                    letter-spacing: 1.393920pt;
                }
    
                .ls4a {
                    letter-spacing: 1.436160pt;
                }
    
                .ls29 {
                    letter-spacing: 1.477070pt;
                }
    
                .ls3e {
                    letter-spacing: 1.478400pt;
                }
    
                .ls63 {
                    letter-spacing: 1.533312pt;
                }
    
                .ls59 {
                    letter-spacing: 1.586304pt;
                }
    
                .ls17 {
                    letter-spacing: 1.592320pt;
                }
    
                .ls16 {
                    letter-spacing: 1.757184pt;
                }
    
                .ls39 {
                    letter-spacing: 1.837440pt;
                }
    
                .ls61 {
                    letter-spacing: 1.997952pt;
                }
    
                .ls5 {
                    letter-spacing: 2.081280pt;
                }
    
                .ls48 {
                    letter-spacing: 2.116224pt;
                }
    
                .ls42 {
                    letter-spacing: 2.141568pt;
                }
    
                .ls3c {
                    letter-spacing: 2.192256pt;
                }
    
                .ls44 {
                    letter-spacing: 2.196480pt;
                }
    
                .ls24 {
                    letter-spacing: 2.337280pt;
                }
    
                .ls1 {
                    letter-spacing: 2.406400pt;
                }
    
                .ls6c {
                    letter-spacing: 2.466816pt;
                }
    
                .ls26 {
                    letter-spacing: 2.752754pt;
                }
    
                .ls23 {
                    letter-spacing: 3.617280pt;
                }
    
                .ls15 {
                    letter-spacing: 4.897280pt;
                }
    
                .ls1f {
                    letter-spacing: 5.015273pt;
                }
    
                .ls14 {
                    letter-spacing: 6.177280pt;
                }
    
                .lsb {
                    letter-spacing: 10.524152pt;
                }
    
                .lsc {
                    letter-spacing: 12.078548pt;
                }
    
                .ls27 {
                    letter-spacing: 111.552712pt;
                }
    
                .ls2c {
                    letter-spacing: 252.444160pt;
                }
    
                .ws6 {
                    word-spacing: -20.794624pt;
                }
    
                .ws3b {
                    word-spacing: -19.091200pt;
                }
    
                .ws3c {
                    word-spacing: -18.048000pt;
                }
    
                .ws9 {
                    word-spacing: -17.785600pt;
                }
    
                .wsa {
                    word-spacing: -17.331200pt;
                }
    
                .ws29 {
                    word-spacing: -15.436800pt;
                }
    
                .ws1 {
                    word-spacing: -14.643200pt;
                }
    
                .ws0 {
                    word-spacing: -14.387200pt;
                }
    
                .ws2a {
                    word-spacing: -14.233600pt;
                }
    
                .ws7 {
                    word-spacing: -13.926400pt;
                }
    
                .ws4 {
                    word-spacing: -13.824000pt;
                }
    
                .ws5 {
                    word-spacing: -13.670400pt;
                }
    
                .ws4c {
                    word-spacing: -13.634560pt;
                }
    
                .wsd {
                    word-spacing: -13.580160pt;
                }
    
                .wsb {
                    word-spacing: -13.499904pt;
                }
    
                .ws19 {
                    word-spacing: -13.432320pt;
                }
    
                .ws10 {
                    word-spacing: -13.428096pt;
                }
    
                .ws16 {
                    word-spacing: -13.377408pt;
                }
    
                .ws3 {
                    word-spacing: -13.363200pt;
                }
    
                .ws1e {
                    word-spacing: -13.352064pt;
                }
    
                .ws3f {
                    word-spacing: -13.233792pt;
                }
    
                .ws2 {
                    word-spacing: -13.107200pt;
                }
    
                .ws41 {
                    word-spacing: -12.769152pt;
                }
    
                .ws2e {
                    word-spacing: -12.760704pt;
                }
    
                .ws35 {
                    word-spacing: -12.752256pt;
                }
    
                .ws12 {
                    word-spacing: -12.714240pt;
                }
    
                .ws20 {
                    word-spacing: -12.672000pt;
                }
    
                .ws37 {
                    word-spacing: -12.629760pt;
                }
    
                .ws13 {
                    word-spacing: -12.617088pt;
                }
    
                .ws17 {
                    word-spacing: -12.591744pt;
                }
    
                .ws33 {
                    word-spacing: -12.579072pt;
                }
    
                .ws4b {
                    word-spacing: -12.566400pt;
                }
    
                .ws1a {
                    word-spacing: -12.486144pt;
                }
    
                .ws34 {
                    word-spacing: -12.422784pt;
                }
    
                .ws21 {
                    word-spacing: -12.418560pt;
                }
    
                .ws3a {
                    word-spacing: -12.410112pt;
                }
    
                .ws43 {
                    word-spacing: -12.228480pt;
                }
    
                .ws39 {
                    word-spacing: -12.076416pt;
                }
    
                .ws22 {
                    word-spacing: -12.046848pt;
                }
    
                .ws1f {
                    word-spacing: -12.029952pt;
                }
    
                .ws8 {
                    word-spacing: -11.966592pt;
                }
    
                .ws15 {
                    word-spacing: -11.928576pt;
                }
    
                .ws2f {
                    word-spacing: -11.886336pt;
                }
    
                .ws3d {
                    word-spacing: -11.877888pt;
                }
    
                .ws18 {
                    word-spacing: -11.848320pt;
                }
    
                .wsf {
                    word-spacing: -11.822976pt;
                }
    
                .ws1b {
                    word-spacing: -11.797632pt;
                }
    
                .ws25 {
                    word-spacing: -11.793408pt;
                }
    
                .ws42 {
                    word-spacing: -11.734272pt;
                }
    
                .ws44 {
                    word-spacing: -11.730048pt;
                }
    
                .ws2c {
                    word-spacing: -11.683584pt;
                }
    
                .ws2b {
                    word-spacing: -11.535744pt;
                }
    
                .ws45 {
                    word-spacing: -11.518848pt;
                }
    
                .ws28 {
                    word-spacing: -11.501952pt;
                }
    
                .ws27 {
                    word-spacing: -11.299200pt;
                }
    
                .ws46 {
                    word-spacing: -11.235840pt;
                }
    
                .ws26 {
                    word-spacing: -11.231616pt;
                }
    
                .wsc {
                    word-spacing: -11.214720pt;
                }
    
                .ws38 {
                    word-spacing: -11.202048pt;
                }
    
                .ws32 {
                    word-spacing: -11.193984pt;
                }
    
                .ws24 {
                    word-spacing: -11.117568pt;
                }
    
                .ws1c {
                    word-spacing: -11.066880pt;
                }
    
                .ws11 {
                    word-spacing: -11.062656pt;
                }
    
                .ws14 {
                    word-spacing: -11.037312pt;
                }
    
                .ws30 {
                    word-spacing: -10.961280pt;
                }
    
                .ws4a {
                    word-spacing: -10.896768pt;
                }
    
                .ws48 {
                    word-spacing: -10.872576pt;
                }
    
                .ws2d {
                    word-spacing: -10.868352pt;
                }
    
                .ws40 {
                    word-spacing: -10.771200pt;
                }
    
                .ws23 {
                    word-spacing: -10.728960pt;
                }
    
                .ws31 {
                    word-spacing: -10.554624pt;
                }
    
                .ws3e {
                    word-spacing: -10.374144pt;
                }
    
                .ws1d {
                    word-spacing: -10.293888pt;
                }
    
                .ws49 {
                    word-spacing: -9.614592pt;
                }
    
                .ws47 {
                    word-spacing: -9.597312pt;
                }
    
                .ws36 {
                    word-spacing: -9.593856pt;
                }
    
                .wse {
                    word-spacing: -9.583488pt;
                }
    
                .ws4d {
                    word-spacing: 0.000000pt;
                }
    
                ._5 {
                    margin-left: -5.947929pt;
                }
    
                ._1 {
                    margin-left: -4.505600pt;
                }
    
                ._3 {
                    margin-left: -3.113792pt;
                }
    
                ._0 {
                    margin-left: -1.587200pt;
                }
    
                ._2 {
                    width: 2.099200pt;
                }
    
                ._4 {
                    width: 3.516925pt;
                }
    
                .fs5 {
                    font-size: 34.560000pt;
                }
    
                .fs7 {
                    font-size: 37.120000pt;
                }
    
                .fs8 {
                    font-size: 39.680000pt;
                }
    
                .fs3 {
                    font-size: 42.240000pt;
                }
    
                .fs6 {
                    font-size: 48.640000pt;
                }
    
                .fs0 {
                    font-size: 51.200000pt;
                }
    
                .fs9 {
                    font-size: 53.760000pt;
                }
    
                .fs2 {
                    font-size: 58.880000pt;
                }
    
                .fs4 {
                    font-size: 64.000000pt;
                }
    
                .fs1 {
                    font-size: 74.240000pt;
                }
    
                .fsa {
                    font-size: 85.760000pt;
                }
    
                .y0 {
                    bottom: -0.666667pt;
                }
    
                .y3a {
                    bottom: 3.573333pt;
                }
    
                .y26 {
                    bottom: 3.626667pt;
                }
    
                .y14 {
                    bottom: 4.266667pt;
                }
    
                .y18 {
                    bottom: 5.013333pt;
                }
    
                .y38 {
                    bottom: 5.706667pt;
                }
    
                .y31 {
                    bottom: 5.920000pt;
                }
    
                .y67 {
                    bottom: 6.080000pt;
                }
    
                .yb {
                    bottom: 6.613333pt;
                }
    
                .y61 {
                    bottom: 6.666667pt;
                }
    
                .y32 {
                    bottom: 6.880000pt;
                }
    
                .y66 {
                    bottom: 7.040000pt;
                }
    
                .y1f {
                    bottom: 7.093333pt;
                }
    
                .y2d {
                    bottom: 7.146667pt;
                }
    
                .y49 {
                    bottom: 7.306667pt;
                }
    
                .y2a {
                    bottom: 7.360000pt;
                }
    
                .y2c {
                    bottom: 7.466667pt;
                }
    
                .y51 {
                    bottom: 7.520000pt;
                }
    
                .y1a {
                    bottom: 7.680000pt;
                }
    
                .y3d {
                    bottom: 7.733333pt;
                }
    
                .y57 {
                    bottom: 7.840000pt;
                }
    
                .ya {
                    bottom: 7.893333pt;
                }
    
                .y2 {
                    bottom: 8.000000pt;
                }
    
                .yd {
                    bottom: 8.053333pt;
                }
    
                .y41 {
                    bottom: 8.106667pt;
                }
    
                .y44 {
                    bottom: 8.480000pt;
                }
    
                .y64 {
                    bottom: 8.533333pt;
                }
    
                .y36 {
                    bottom: 8.800000pt;
                }
    
                .y28 {
                    bottom: 8.853333pt;
                }
    
                .y55 {
                    bottom: 9.013333pt;
                }
    
                .y11 {
                    bottom: 9.066667pt;
                }
    
                .y63 {
                    bottom: 9.173333pt;
                }
    
                .y48 {
                    bottom: 9.226667pt;
                }
    
                .y47 {
                    bottom: 9.546667pt;
                }
    
                .y34 {
                    bottom: 9.760000pt;
                }
    
                .y10 {
                    bottom: 10.346667pt;
                }
    
                .y30 {
                    bottom: 10.720000pt;
                }
    
                .y35 {
                    bottom: 11.040000pt;
                }
    
                .y54 {
                    bottom: 11.253333pt;
                }
    
                .y6a {
                    bottom: 11.360000pt;
                }
    
                .y6b {
                    bottom: 12.320000pt;
                }
    
                .y3e {
                    bottom: 13.813333pt;
                }
    
                .y8 {
                    bottom: 13.866667pt;
                }
    
                .y52 {
                    bottom: 14.560000pt;
                }
    
                .y1c {
                    bottom: 14.666667pt;
                }
    
                .yf {
                    bottom: 15.146667pt;
                }
    
                .y4e {
                    bottom: 15.466667pt;
                }
    
                .y13 {
                    bottom: 16.426667pt;
                }
    
                .y22 {
                    bottom: 16.960000pt;
                }
    
                .y77 {
                    bottom: 17.280000pt;
                }
    
                .y45 {
                    bottom: 17.440000pt;
                }
    
                .y17 {
                    bottom: 18.133333pt;
                }
    
                .y23 {
                    bottom: 18.240000pt;
                }
    
                .y1d {
                    bottom: 18.506667pt;
                }
    
                .y68 {
                    bottom: 18.720000pt;
                }
    
                .y5f {
                    bottom: 20.320000pt;
                }
    
                .y4d {
                    bottom: 21.226667pt;
                }
    
                .y50 {
                    bottom: 21.600000pt;
                }
    
                .y3c {
                    bottom: 21.813333pt;
                }
    
                .y40 {
                    bottom: 22.186667pt;
                }
    
                .y43 {
                    bottom: 22.240000pt;
                }
    
                .y76 {
                    bottom: 22.400000pt;
                }
    
                .y2f {
                    bottom: 24.800000pt;
                }
    
                .y21 {
                    bottom: 28.800000pt;
                }
    
                .y24 {
                    bottom: 29.120000pt;
                }
    
                .y7 {
                    bottom: 29.866667pt;
                }
    
                .y16 {
                    bottom: 30.933333pt;
                }
    
                .y5e {
                    bottom: 35.360000pt;
                }
    
                .y75 {
                    bottom: 36.480000pt;
                }
    
                .y6 {
                    bottom: 44.906667pt;
                }
    
                .y5d {
                    bottom: 50.400000pt;
                }
    
                .y74 {
                    bottom: 56.640000pt;
                }
    
                .y5 {
                    bottom: 61.546667pt;
                }
    
                .y5c {
                    bottom: 65.760000pt;
                }
    
                .y73 {
                    bottom: 72.960000pt;
                }
    
                .y5b {
                    bottom: 77.920000pt;
                }
    
                .y4 {
                    bottom: 78.826667pt;
                }
    
                .y72 {
                    bottom: 87.360000pt;
                }
    
                .y5a {
                    bottom: 89.760000pt;
                }
    
                .y71 {
                    bottom: 99.200000pt;
                }
    
                .y59 {
                    bottom: 111.840000pt;
                }
    
                .y70 {
                    bottom: 112.320000pt;
                }
    
                .y6f {
                    bottom: 125.120000pt;
                }
    
                .y6e {
                    bottom: 140.480000pt;
                }
    
                .y6d {
                    bottom: 153.920000pt;
                }
    
                .y6c {
                    bottom: 167.040000pt;
                }
    
                .y69 {
                    bottom: 180.000000pt;
                }
    
                .y58 {
                    bottom: 204.000000pt;
                }
    
                .y65 {
                    bottom: 248.000000pt;
                }
    
                .y62 {
                    bottom: 266.666667pt;
                }
    
                .y60 {
                    bottom: 289.333333pt;
                }
    
                .y56 {
                    bottom: 308.000000pt;
                }
    
                .y53 {
                    bottom: 326.666667pt;
                }
    
                .y4f {
                    bottom: 348.000000pt;
                }
    
                .y4c {
                    bottom: 381.333333pt;
                }
    
                .y4b {
                    bottom: 413.333333pt;
                }
    
                .y4a {
                    bottom: 446.666667pt;
                }
    
                .y46 {
                    bottom: 465.333333pt;
                }
    
                .y42 {
                    bottom: 484.000000pt;
                }
    
                .y3f {
                    bottom: 517.333333pt;
                }
    
                .y3b {
                    bottom: 550.666667pt;
                }
    
                .y39 {
                    bottom: 582.666667pt;
                }
    
                .y37 {
                    bottom: 601.333333pt;
                }
    
                .y33 {
                    bottom: 620.000000pt;
                }
    
                .y2e {
                    bottom: 644.000000pt;
                }
    
                .y2b {
                    bottom: 661.333333pt;
                }
    
                .y29 {
                    bottom: 680.000000pt;
                }
    
                .y27 {
                    bottom: 698.666667pt;
                }
    
                .y25 {
                    bottom: 717.333333pt;
                }
    
                .y20 {
                    bottom: 736.000000pt;
                }
    
                .y1e {
                    bottom: 774.666667pt;
                }
    
                .y1b {
                    bottom: 793.333333pt;
                }
    
                .y19 {
                    bottom: 824.000000pt;
                }
    
                .y15 {
                    bottom: 842.666667pt;
                }
    
                .y12 {
                    bottom: 885.333333pt;
                }
    
                .y3 {
                    bottom: 909.333333pt;
                }
    
                .ye {
                    bottom: 933.333333pt;
                }
    
                .yc {
                    bottom: 966.666667pt;
                }
    
                .y9 {
                    bottom: 986.666667pt;
                }
    
                .y1 {
                    bottom: 1008.000000pt;
                }
    
                .h18 {
                    height: 17.333333pt;
                }
    
                .h13 {
                    height: 18.666667pt;
                }
    
                .ha {
                    height: 20.000000pt;
                }
    
                .h7 {
                    height: 21.333333pt;
                }
    
                .h2 {
                    height: 22.666667pt;
                }
    
                .hc {
                    height: 24.000000pt;
                }
    
                .h15 {
                    height: 24.740625pt;
                }
    
                .he {
                    height: 25.160625pt;
                }
    
                .hd {
                    height: 25.333333pt;
                }
    
                .h16 {
                    height: 26.446875pt;
                }
    
                .h1a {
                    height: 28.153125pt;
                }
    
                .h11 {
                    height: 30.666667pt;
                }
    
                .h1b {
                    height: 31.201875pt;
                }
    
                .h1d {
                    height: 32.418750pt;
                }
    
                .h19 {
                    height: 33.333333pt;
                }
    
                .h10 {
                    height: 33.928125pt;
                }
    
                .hb {
                    height: 34.666667pt;
                }
    
                .h17 {
                    height: 36.000000pt;
                }
    
                .h8 {
                    height: 38.135625pt;
                }
    
                .h14 {
                    height: 38.666667pt;
                }
    
                .h1f {
                    height: 39.138750pt;
                }
    
                .h6 {
                    height: 39.243750pt;
                }
    
                .h22 {
                    height: 41.125000pt;
                }
    
                .hf {
                    height: 42.666667pt;
                }
    
                .h20 {
                    height: 42.866250pt;
                }
    
                .h12 {
                    height: 43.913750pt;
                }
    
                .h1e {
                    height: 45.333333pt;
                }
    
                .h3 {
                    height: 46.225000pt;
                }
    
                .h9 {
                    height: 57.781250pt;
                }
    
                .h5 {
                    height: 67.026250pt;
                }
    
                .h4 {
                    height: 98.666667pt;
                }
    
                .h21 {
                    height: 114.964375pt;
                }
    
                .h1c {
                    height: 124.000000pt;
                }
    
                .h0 {
                    height: 1056.000000pt;
                }
    
                .h1 {
                    height: 1056.666667pt;
                }
    
                .we {
                    width: 64.000000pt;
                }
    
                .w14 {
                    width: 65.333333pt;
                }
    
                .w8 {
                    width: 73.333333pt;
                }
    
                .wb {
                    width: 98.666667pt;
                }
    
                .w19 {
                    width: 100.000000pt;
                }
    
                .w1b {
                    width: 101.333333pt;
                }
    
                .w1a {
                    width: 102.666667pt;
                }
    
                .w1c {
                    width: 105.333333pt;
                }
    
                .wa {
                    width: 106.666667pt;
                }
    
                .w4 {
                    width: 116.000000pt;
                }
    
                .w9 {
                    width: 130.666667pt;
                }
    
                .w5 {
                    width: 132.000000pt;
                }
    
                .w10 {
                    width: 133.333333pt;
                }
    
                .w11 {
                    width: 148.000000pt;
                }
    
                .wf {
                    width: 184.000000pt;
                }
    
                .w17 {
                    width: 189.333333pt;
                }
    
                .w7 {
                    width: 197.333333pt;
                }
    
                .w1f {
                    width: 204.000000pt;
                }
    
                .w20 {
                    width: 205.333333pt;
                }
    
                .w6 {
                    width: 246.666667pt;
                }
    
                .w18 {
                    width: 314.666667pt;
                }
    
                .w12 {
                    width: 322.666667pt;
                }
    
                .w1e {
                    width: 329.333333pt;
                }
    
                .wd {
                    width: 358.666667pt;
                }
    
                .w16 {
                    width: 440.000000pt;
                }
    
                .w3 {
                    width: 490.666667pt;
                }
    
                .w1d {
                    width: 533.333333pt;
                }
    
                .wc {
                    width: 604.000000pt;
                }
    
                .w13 {
                    width: 605.333333pt;
                }
    
                .w15 {
                    width: 672.000000pt;
                }
    
                .w2 {
                    width: 736.000000pt;
                }
    
                .w0 {
                    width: 816.000000pt;
                }
    
                .w1 {
                    width: 816.666667pt;
                }
    
                .x0 {
                    left: 0.000000pt;
                }
    
                .x14 {
                    left: 2.933333pt;
                }
    
                .x20 {
                    left: 5.279846pt;
                }
    
                .x13 {
                    left: 6.933316pt;
                }
    
                .x48 {
                    left: 9.226667pt;
                }
    
                .x31 {
                    left: 13.813347pt;
                }
    
                .x4f {
                    left: 18.186737pt;
                }
    
                .xb {
                    left: 19.733257pt;
                }
    
                .x11 {
                    left: 21.440027pt;
                }
    
                .x33 {
                    left: 24.213333pt;
                }
    
                .x45 {
                    left: 26.293333pt;
                }
    
                .x4a {
                    left: 27.626773pt;
                }
    
                .x3f {
                    left: 29.013297pt;
                }
    
                .x8 {
                    left: 31.040027pt;
                }
    
                .x40 {
                    left: 32.426552pt;
                }
    
                .x27 {
                    left: 33.813290pt;
                }
    
                .x3d {
                    left: 35.306738pt;
                }
    
                .x1 {
                    left: 38.666667pt;
                }
    
                .x44 {
                    left: 40.106532pt;
                }
    
                .x2c {
                    left: 41.653333pt;
                }
    
                .x2 {
                    left: 44.213333pt;
                }
    
                .x1b {
                    left: 49.333333pt;
                }
    
                .x3b {
                    left: 51.253397pt;
                }
    
                .x21 {
                    left: 53.920000pt;
                }
    
                .x2e {
                    left: 56.373333pt;
                }
    
                .x25 {
                    left: 58.453333pt;
                }
    
                .x24 {
                    left: 59.893333pt;
                }
    
                .x43 {
                    left: 62.773333pt;
                }
    
                .x37 {
                    left: 64.693333pt;
                }
    
                .x1d {
                    left: 66.880000pt;
                }
    
                .x47 {
                    left: 68.586522pt;
                }
    
                .xd {
                    left: 70.080000pt;
                }
    
                .x41 {
                    left: 71.786667pt;
                }
    
                .x38 {
                    left: 74.453333pt;
                }
    
                .x49 {
                    left: 78.506667pt;
                }
    
                .xc {
                    left: 81.173333pt;
                }
    
                .x9 {
                    left: 85.760000pt;
                }
    
                .x34 {
                    left: 88.853333pt;
                }
    
                .x12 {
                    left: 95.680000pt;
                }
    
                .x46 {
                    left: 97.173333pt;
                }
    
                .xf {
                    left: 98.879890pt;
                }
    
                .x2d {
                    left: 102.666667pt;
                }
    
                .x22 {
                    left: 105.333333pt;
                }
    
                .x42 {
                    left: 106.933333pt;
                }
    
                .x2b {
                    left: 111.733333pt;
                }
    
                .x36 {
                    left: 113.120000pt;
                }
    
                .x23 {
                    left: 116.533333pt;
                }
    
                .x17 {
                    left: 119.413333pt;
                }
    
                .x4d {
                    left: 121.333333pt;
                }
    
                .x4e {
                    left: 127.306667pt;
                }
    
                .x54 {
                    left: 128.693333pt;
                }
    
                .x4b {
                    left: 130.613349pt;
                }
    
                .x53 {
                    left: 133.493333pt;
                }
    
                .x2a {
                    left: 138.720000pt;
                }
    
                .x35 {
                    left: 155.573333pt;
                }
    
                .x19 {
                    left: 168.213333pt;
                }
    
                .x18 {
                    left: 170.666667pt;
                }
    
                .xe {
                    left: 177.920000pt;
                }
    
                .x10 {
                    left: 189.760000pt;
                }
    
                .x6 {
                    left: 193.973333pt;
                }
    
                .x55 {
                    left: 195.733333pt;
                }
    
                .x4c {
                    left: 201.013333pt;
                }
    
                .x5b {
                    left: 206.080000pt;
                }
    
                .x2f {
                    left: 222.133333pt;
                }
    
                .x5 {
                    left: 224.373333pt;
                }
    
                .x3 {
                    left: 228.853333pt;
                }
    
                .x5a {
                    left: 240.640000pt;
                }
    
                .x50 {
                    left: 245.813333pt;
                }
    
                .x52 {
                    left: 259.893333pt;
                }
    
                .x4 {
                    left: 266.613333pt;
                }
    
                .x3a {
                    left: 269.333333pt;
                }
    
                .x39 {
                    left: 290.613333pt;
                }
    
                .x28 {
                    left: 304.000000pt;
                }
    
                .x5c {
                    left: 325.760013pt;
                }
    
                .x51 {
                    left: 329.333333pt;
                }
    
                .x1a {
                    left: 366.666667pt;
                }
    
                .x16 {
                    left: 415.733333pt;
                }
    
                .x59 {
                    left: 426.880000pt;
                }
    
                .x1c {
                    left: 440.000000pt;
                }
    
                .x29 {
                    left: 452.000000pt;
                }
    
                .x3c {
                    left: 469.333333pt;
                }
    
                .x56 {
                    left: 471.680000pt;
                }
    
                .x7 {
                    left: 528.000000pt;
                }
    
                .x30 {
                    left: 542.666667pt;
                }
    
                .x1e {
                    left: 569.333333pt;
                }
    
                .x58 {
                    left: 577.280000pt;
                }
    
                .x26 {
                    left: 590.666667pt;
                }
    
                .x57 {
                    left: 635.200000pt;
                }
    
                .xa {
                    left: 642.666667pt;
                }
    
                .x32 {
                    left: 658.666667pt;
                }
    
                .x3e {
                    left: 669.333333pt;
                }
    
                .x1f {
                    left: 676.000000pt;
                }
    
                .x15 {
                    left: 698.613333pt;
                }
    
                .x5d {
                    left: 748.800000pt;
                }
            }
        </style>
        <script>
            /*
     Copyright 2012 Mozilla Foundation
     Copyright 2013 Lu Wang <coolwanglu@gmail.com>
     Apachine License Version 2.0
    */
            (function () {
                function b(a, b, e, f) {
                    var c = (a.className || "").split(/\s+/g);
                    "" === c[0] && c.shift();
                    var d = c.indexOf(b);
                    0 > d && e && c.push(b);
                    0 <= d && f && c.splice(d, 1);
                    a.className = c.join(" ");
                    return 0 <= d
                }
    
                if (!("classList" in document.createElement("div"))) {
                    var e = {
                        add: function (a) {
                            b(this.element, a, !0, !1)
                        }, contains: function (a) {
                            return b(this.element, a, !1, !1)
                        }, remove: function (a) {
                            b(this.element, a, !1, !0)
                        }, toggle: function (a) {
                            b(this.element, a, !0, !0)
                        }
                    };
                    Object.defineProperty(HTMLElement.prototype, "classList", {
                        get: function () {
                            if (this._classList) return this._classList;
                            var a = Object.create(e, {element: {value: this, writable: !1, enumerable: !0}});
                            Object.defineProperty(this, "_classList", {value: a, writable: !1, enumerable: !1});
                            return a
                        }, enumerable: !0
                    })
                }
            })();
        </script>
        <script>
            (function () {/*
     pdf2htmlEX.js: Core UI functions for pdf2htmlEX
     Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com> and other contributors
     https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE
    */
                var pdf2htmlEX = window.pdf2htmlEX = window.pdf2htmlEX || {},
                    CSS_CLASS_NAMES = {page_frame: "pf", page_content_box: "pc", page_data: "pi", background_image: "bi", link: "l", input_radio: "ir", __dummy__: "no comma"}, DEFAULT_CONFIG = {
                        container_id: "page-container",
                        sidebar_id: "sidebar",
                        outline_id: "outline",
                        loading_indicator_cls: "loading-indicator",
                        preload_pages: 3,
                        render_timeout: 100,
                        scale_step: 0.9,
                        key_handler: !0,
                        hashchange_handler: !0,
                        view_history_handler: !0,
                        __dummy__: "no comma"
                    }, EPS = 1E-6;
    
                function invert(a) {
                    var b = a[0] * a[3] - a[1] * a[2];
                    return [a[3] / b, -a[1] / b, -a[2] / b, a[0] / b, (a[2] * a[5] - a[3] * a[4]) / b, (a[1] * a[4] - a[0] * a[5]) / b]
                }
    
                function transform(a, b) {
                    return [a[0] * b[0] + a[2] * b[1] + a[4], a[1] * b[0] + a[3] * b[1] + a[5]]
                }
    
                function get_page_number(a) {
                    return parseInt(a.getAttribute("data-page-no"), 16)
                }
    
                function disable_dragstart(a) {
                    for (var b = 0, c = a.length; b < c; ++b) a[b].addEventListener("dragstart", function () {
                        return !1
                    }, !1)
                }
    
                function clone_and_extend_objs(a) {
                    for (var b = {}, c = 0, e = arguments.length; c < e; ++c) {
                        var h = arguments[c], d;
                        for (d in h) h.hasOwnProperty(d) && (b[d] = h[d])
                    }
                    return b
                }
    
                function Page(a) {
                    if (a) {
                        this.shown = this.loaded = !1;
                        this.page = a;
                        this.num = get_page_number(a);
                        this.original_height = a.clientHeight;
                        this.original_width = a.clientWidth;
                        var b = a.getElementsByClassName(CSS_CLASS_NAMES.page_content_box)[0];
                        b && (this.content_box = b, this.original_scale = this.cur_scale = this.original_height / b.clientHeight, this.page_data = JSON.parse(a.getElementsByClassName(CSS_CLASS_NAMES.page_data)[0].getAttribute("data-data")), this.ctm = this.page_data.ctm, this.ictm = invert(this.ctm), this.loaded = !0)
                    }
                }
    
                Page.prototype = {
                    hide: function () {
                        this.loaded && this.shown && (this.content_box.classList.remove("opened"), this.shown = !1)
                    }, show: function () {
                        this.loaded && !this.shown && (this.content_box.classList.add("opened"), this.shown = !0)
                    }, rescale: function (a) {
                        this.cur_scale = 0 === a ? this.original_scale : a;
                        this.loaded && (a = this.content_box.style, a.msTransform = a.webkitTransform = a.transform = "scale(" + this.cur_scale.toFixed(3) + ")");
                        a = this.page.style;
                        a.height = this.original_height * this.cur_scale + "px";
                        a.width = this.original_width * this.cur_scale +
                            "px"
                    }, view_position: function () {
                        var a = this.page, b = a.parentNode;
                        return [b.scrollLeft - a.offsetLeft - a.clientLeft, b.scrollTop - a.offsetTop - a.clientTop]
                    }, height: function () {
                        return this.page.clientHeight
                    }, width: function () {
                        return this.page.clientWidth
                    }
                };
    
                function Viewer(a) {
                    this.config = clone_and_extend_objs(DEFAULT_CONFIG, 0 < arguments.length ? a : {});
                    this.pages_loading = [];
                    this.init_before_loading_content();
                    var b = this;
                    document.addEventListener("DOMContentLoaded", function () {
                        b.init_after_loading_content()
                    }, !1)
                }
    
                Viewer.prototype = {
                    scale: 1, cur_page_idx: 0, first_page_idx: 0, init_before_loading_content: function () {
                        this.pre_hide_pages()
                    }, initialize_radio_button: function () {
                        for (var a = document.getElementsByClassName(CSS_CLASS_NAMES.input_radio), b = 0; b < a.length; b++) a[b].addEventListener("click", function () {
                            this.classList.toggle("checked")
                        })
                    }, init_after_loading_content: function () {
                        this.sidebar = document.getElementById(this.config.sidebar_id);
                        this.outline = document.getElementById(this.config.outline_id);
                        this.container = document.getElementById(this.config.container_id);
                        this.loading_indicator = document.getElementsByClassName(this.config.loading_indicator_cls)[0];
                        for (var a = !0, b = this.outline.childNodes, c = 0, e = b.length; c < e; ++c) if ("ul" === b[c].nodeName.toLowerCase()) {
                            a = !1;
                            break
                        }
                        a || this.sidebar.classList.add("opened");
                        this.find_pages();
                        if (0 != this.pages.length) {
                            disable_dragstart(document.getElementsByClassName(CSS_CLASS_NAMES.background_image));
                            this.config.key_handler && this.register_key_handler();
                            var h = this;
                            this.config.hashchange_handler && window.addEventListener("hashchange",
                                function (a) {
                                    h.navigate_to_dest(document.location.hash.substring(1))
                                }, !1);
                            this.config.view_history_handler && window.addEventListener("popstate", function (a) {
                                a.state && h.navigate_to_dest(a.state)
                            }, !1);
                            this.container.addEventListener("scroll", function () {
                                h.update_page_idx();
                                h.schedule_render(!0)
                            }, !1);
                            [this.container, this.outline].forEach(function (a) {
                                a.addEventListener("click", h.link_handler.bind(h), !1)
                            });
                            this.initialize_radio_button();
                            this.render()
                        }
                    }, find_pages: function () {
                        for (var a = [], b = {}, c = this.container.childNodes,
                                 e = 0, h = c.length; e < h; ++e) {
                            var d = c[e];
                            d.nodeType === Node.ELEMENT_NODE && d.classList.contains(CSS_CLASS_NAMES.page_frame) && (d = new Page(d), a.push(d), b[d.num] = a.length - 1)
                        }
                        this.pages = a;
                        this.page_map = b
                    }, load_page: function (a, b, c) {
                        var e = this.pages;
                        if (!(a >= e.length || (e = e[a], e.loaded || this.pages_loading[a]))) {
                            var e = e.page, h = e.getAttribute("data-page-url");
                            if (h) {
                                this.pages_loading[a] = !0;
                                var d = e.getElementsByClassName(this.config.loading_indicator_cls)[0];
                                "undefined" === typeof d && (d = this.loading_indicator.cloneNode(!0),
                                    d.classList.add("active"), e.appendChild(d));
                                var f = this, g = new XMLHttpRequest;
                                g.open("GET", h, !0);
                                g.onload = function () {
                                    if (200 === g.status || 0 === g.status) {
                                        var b = document.createElement("div");
                                        b.innerHTML = g.responseText;
                                        for (var d = null, b = b.childNodes, e = 0, h = b.length; e < h; ++e) {
                                            var p = b[e];
                                            if (p.nodeType === Node.ELEMENT_NODE && p.classList.contains(CSS_CLASS_NAMES.page_frame)) {
                                                d = p;
                                                break
                                            }
                                        }
                                        b = f.pages[a];
                                        f.container.replaceChild(d, b.page);
                                        b = new Page(d);
                                        f.pages[a] = b;
                                        b.hide();
                                        b.rescale(f.scale);
                                        disable_dragstart(d.getElementsByClassName(CSS_CLASS_NAMES.background_image));
                                        f.schedule_render(!1);
                                        c && c(b)
                                    }
                                    delete f.pages_loading[a]
                                };
                                g.send(null)
                            }
                            void 0 === b && (b = this.config.preload_pages);
                            0 < --b && (f = this, setTimeout(function () {
                                f.load_page(a + 1, b)
                            }, 0))
                        }
                    }, pre_hide_pages: function () {
                        var a = "@media screen{." + CSS_CLASS_NAMES.page_content_box + "{display:none;}}", b = document.createElement("style");
                        b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));
                        document.head.appendChild(b)
                    }, render: function () {
                        for (var a = this.container, b = a.scrollTop, c = a.clientHeight, a = b - c, b =
                            b + c + c, c = this.pages, e = 0, h = c.length; e < h; ++e) {
                            var d = c[e], f = d.page, g = f.offsetTop + f.clientTop, f = g + f.clientHeight;
                            g <= b && f >= a ? d.loaded ? d.show() : this.load_page(e) : d.hide()
                        }
                    }, update_page_idx: function () {
                        var a = this.pages, b = a.length;
                        if (!(2 > b)) {
                            for (var c = this.container, e = c.scrollTop, c = e + c.clientHeight, h = -1, d = b, f = d - h; 1 < f;) {
                                var g = h + Math.floor(f / 2), f = a[g].page;
                                f.offsetTop + f.clientTop + f.clientHeight >= e ? d = g : h = g;
                                f = d - h
                            }
                            this.first_page_idx = d;
                            for (var g = h = this.cur_page_idx, k = 0; d < b; ++d) {
                                var f = a[d].page, l = f.offsetTop + f.clientTop,
                                    f = f.clientHeight;
                                if (l > c) break;
                                f = (Math.min(c, l + f) - Math.max(e, l)) / f;
                                if (d === h && Math.abs(f - 1) <= EPS) {
                                    g = h;
                                    break
                                }
                                f > k && (k = f, g = d)
                            }
                            this.cur_page_idx = g
                        }
                    }, schedule_render: function (a) {
                        if (void 0 !== this.render_timer) {
                            if (!a) return;
                            clearTimeout(this.render_timer)
                        }
                        var b = this;
                        this.render_timer = setTimeout(function () {
                            delete b.render_timer;
                            b.render()
                        }, this.config.render_timeout)
                    }, register_key_handler: function () {
                        var a = this;
                        window.addEventListener("DOMMouseScroll", function (b) {
                            if (b.ctrlKey) {
                                b.preventDefault();
                                var c = a.container,
                                    e = c.getBoundingClientRect(), c = [b.clientX - e.left - c.clientLeft, b.clientY - e.top - c.clientTop];
                                a.rescale(Math.pow(a.config.scale_step, b.detail), !0, c)
                            }
                        }, !1);
                        window.addEventListener("keydown", function (b) {
                            var c = !1, e = b.ctrlKey || b.metaKey, h = b.altKey;
                            switch (b.keyCode) {
                                case 61:
                                case 107:
                                case 187:
                                    e && (a.rescale(1 / a.config.scale_step, !0), c = !0);
                                    break;
                                case 173:
                                case 109:
                                case 189:
                                    e && (a.rescale(a.config.scale_step, !0), c = !0);
                                    break;
                                case 48:
                                    e && (a.rescale(0, !1), c = !0);
                                    break;
                                case 33:
                                    h ? a.scroll_to(a.cur_page_idx - 1) : a.container.scrollTop -=
                                        a.container.clientHeight;
                                    c = !0;
                                    break;
                                case 34:
                                    h ? a.scroll_to(a.cur_page_idx + 1) : a.container.scrollTop += a.container.clientHeight;
                                    c = !0;
                                    break;
                                case 35:
                                    a.container.scrollTop = a.container.scrollHeight;
                                    c = !0;
                                    break;
                                case 36:
                                    a.container.scrollTop = 0, c = !0
                            }
                            c && b.preventDefault()
                        }, !1)
                    }, rescale: function (a, b, c) {
                        var e = this.scale;
                        this.scale = a = 0 === a ? 1 : b ? e * a : a;
                        c || (c = [0, 0]);
                        b = this.container;
                        c[0] += b.scrollLeft;
                        c[1] += b.scrollTop;
                        for (var h = this.pages, d = h.length, f = this.first_page_idx; f < d; ++f) {
                            var g = h[f].page;
                            if (g.offsetTop + g.clientTop >=
                                c[1]) break
                        }
                        g = f - 1;
                        0 > g && (g = 0);
                        var g = h[g].page, k = g.clientWidth, f = g.clientHeight, l = g.offsetLeft + g.clientLeft, m = c[0] - l;
                        0 > m ? m = 0 : m > k && (m = k);
                        k = g.offsetTop + g.clientTop;
                        c = c[1] - k;
                        0 > c ? c = 0 : c > f && (c = f);
                        for (f = 0; f < d; ++f) h[f].rescale(a);
                        b.scrollLeft += m / e * a + g.offsetLeft + g.clientLeft - m - l;
                        b.scrollTop += c / e * a + g.offsetTop + g.clientTop - c - k;
                        this.schedule_render(!0)
                    }, fit_width: function () {
                        var a = this.cur_page_idx;
                        this.rescale(this.container.clientWidth / this.pages[a].width(), !0);
                        this.scroll_to(a)
                    }, fit_height: function () {
                        var a = this.cur_page_idx;
                        this.rescale(this.container.clientHeight / this.pages[a].height(), !0);
                        this.scroll_to(a)
                    }, get_containing_page: function (a) {
                        for (; a;) {
                            if (a.nodeType === Node.ELEMENT_NODE && a.classList.contains(CSS_CLASS_NAMES.page_frame)) {
                                a = get_page_number(a);
                                var b = this.page_map;
                                return a in b ? this.pages[b[a]] : null
                            }
                            a = a.parentNode
                        }
                        return null
                    }, link_handler: function (a) {
                        var b = a.target, c = b.getAttribute("data-dest-detail");
                        if (c) {
                            if (this.config.view_history_handler) try {
                                var e = this.get_current_view_hash();
                                window.history.replaceState(e,
                                    "", "#" + e);
                                window.history.pushState(c, "", "#" + c)
                            } catch (h) {
                            }
                            this.navigate_to_dest(c, this.get_containing_page(b));
                            a.preventDefault()
                        }
                    }, navigate_to_dest: function (a, b) {
                        try {
                            var c = JSON.parse(a)
                        } catch (e) {
                            return
                        }
                        if (c instanceof Array) {
                            var h = c[0], d = this.page_map;
                            if (h in d) {
                                for (var f = d[h], h = this.pages[f], d = 2, g = c.length; d < g; ++d) {
                                    var k = c[d];
                                    if (null !== k && "number" !== typeof k) return
                                }
                                for (; 6 > c.length;) c.push(null);
                                var g = b || this.pages[this.cur_page_idx], d = g.view_position(), d = transform(g.ictm, [d[0], g.height() - d[1]]),
                                    g = this.scale, l = [0, 0], m = !0, k = !1, n = this.scale;
                                switch (c[1]) {
                                    case "XYZ":
                                        l = [null === c[2] ? d[0] : c[2] * n, null === c[3] ? d[1] : c[3] * n];
                                        g = c[4];
                                        if (null === g || 0 === g) g = this.scale;
                                        k = !0;
                                        break;
                                    case "Fit":
                                    case "FitB":
                                        l = [0, 0];
                                        k = !0;
                                        break;
                                    case "FitH":
                                    case "FitBH":
                                        l = [0, null === c[2] ? d[1] : c[2] * n];
                                        k = !0;
                                        break;
                                    case "FitV":
                                    case "FitBV":
                                        l = [null === c[2] ? d[0] : c[2] * n, 0];
                                        k = !0;
                                        break;
                                    case "FitR":
                                        l = [c[2] * n, c[5] * n], m = !1, k = !0
                                }
                                if (k) {
                                    this.rescale(g, !1);
                                    var p = this, c = function (a) {
                                        l = transform(a.ctm, l);
                                        m && (l[1] = a.height() - l[1]);
                                        p.scroll_to(f, l)
                                    };
                                    h.loaded ?
                                        c(h) : (this.load_page(f, void 0, c), this.scroll_to(f))
                                }
                            }
                        }
                    }, scroll_to: function (a, b) {
                        var c = this.pages;
                        if (!(0 > a || a >= c.length)) {
                            c = c[a].view_position();
                            void 0 === b && (b = [0, 0]);
                            var e = this.container;
                            e.scrollLeft += b[0] - c[0];
                            e.scrollTop += b[1] - c[1]
                        }
                    }, get_current_view_hash: function () {
                        var a = [], b = this.pages[this.cur_page_idx];
                        a.push(b.num);
                        a.push("XYZ");
                        var c = b.view_position(), c = transform(b.ictm, [c[0], b.height() - c[1]]);
                        a.push(c[0] / this.scale);
                        a.push(c[1] / this.scale);
                        a.push(this.scale);
                        return JSON.stringify(a)
                    }
                };
                pdf2htmlEX.Viewer = Viewer;
            })();
        </script>
        <script>
            try {
                pdf2htmlEX.defaultViewer = new pdf2htmlEX.Viewer({});
            } catch (e) {
            }
        </script>
        <title></title>
    </head>
    <body>
    <div id="sidebar">
        <div id="outline">
        </div>
    </div>
    <div id="page-container">
        <div id="pf1" class="pf w0 h0" data-page-no="1">
            <div class="pc pc1 w0 h0"><img class="bi x0 y0 w1 h1" alt=""
                                           src="data:image/png;base64,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jB/+8IdTyV//+tdU57bbbss609XVdf78+VThda97Xarw61//OpV87nOfS3VmZmYee+yxdPQVr3hFOjo/P9/d3R1jXLFixczMTAjhL3/5S6rzyle+MoTw2c9+Nr392Mc+lpp85jOfSSW/+93vCiUPPPBACOHOO+9sNBq33357Ojo7O5vuYtWqVRcvXkyFd9xxR7b2HnzwwdT8E5/4RDr6pz/9KZW8+tWvTiWf+tSnUsknP/nJEMJrX/va9PYPf/hDCGFubm716tUxxtWrV1+6dCk1ec1rXpON9po1ay5fvrx///7C3P35z3/+/e9/H2P89Kc/ffHixVWrVjUajQcffDC/FF/1qlfdcccd+ZKPf/zjaT088MADhRPeeeedIYTbb7/9rrvuunz58sqVK7NDd91114ULF1asWBFj7O7unpub++1vf/vSl740f+aPfvSj3d3d8/PzWclvfvObtDgfe+yx8+fPL1++PMa4fv36rM5tt92Wzn/o0KEQQlZnw4YNCwsLv/rVr9LR17/+9an+hz70oVTyhS98IZX88pe/zNZkCOGDH/xgo9HYtGnT4uJiqvCyl70sVfj73/+eSj7wgQ+89a1vTa9/8Ytf5Efg8ccfT+X3339/2sL/+Mc/fv7zn6ej99xzTzo6PT3daDS++MUvZnf66KOPxhifeOKJ9PZ973vfli1bQgg/+9nP0gjEGN/4xjemo1NTU6mkp6cnO8N73/veVJh58sknf/KTn6QXk5OT2VM6xvivf/3r3e9+d29vbwjhxz/+cWEeH3rooey0p06dijG+6U1vCiHceuutqcK///3vEMLZs2djjA8//HCq+aMf/Sh/kq9+9asTExP5Lj311FM//OEP0+t77703hPDOd74z69Jb3vKWEMItt9ySKgwPD6fT3nfffbt27Uqvf/CDH+QPhRDGx8fTgzcbt9R8ZGRkbGws359vfvObhToxxj179qTCY8eOZYVpLf3xj3+MMX77298OIQwMDKRDhw8fzi49Ojqav7sjR46Mjo7GGB955JGjR4+mwr6+Pr88yJYAAADIlgAAACBbAgAAIFsCAAAgWwIAACBbAgAAgGwJAACAbAkAAIBsCQAAgGwJAACAbAkAAACyJQAAALIlAAAAsiUAAACyJQAAAMiWAAAAyJYAAAAsZV2GAOA6FGPM/0wvCq9bNmn5tmWrliU1hfWH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"/>
                <div class="c x1 y1 w2 h2">
                    <div class="t m0 x2 h3 y2 ff1 fs0 fc0 sc0 ls3 ws0">COR<span class="_ _0"></span>PORACI<span class="_ _0"></span>Ó<span class="_ _0"></span>N<span class="ls0 ws4d"> <span
                            class="ls2d ws1">PA<span class="_ _0"></span>RA<span class="ls2e ws4d"> <span class="_ _1"></span><span class="ls2d ws1">EL<span class="ls0 ws4d"> <span
                            class="ls2f ws2">DESA<span class="_ _2"></span>RRO<span class="_ _2"></span>LLO<span class="_ _2"></span></span><span class="ls1"> <span class="ls30 ws3">SOS<span
                            class="_ _2"></span>TEN<span class="_ _2"></span>IBLE</span> <span class="ls2f ws2">DE<span class="_ _2"></span>L</span><span class="ls2e"> <span class="ls3 ws0">AR<span
                            class="_ _0"></span>EA<span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls2f ws2">DE<span class="ls1 ws4d"> <span class="ls31 ws4">MANE<span class="_ _2"></span>J<span
                            class="_ _0"></span>O<span class="ls1 ws4d"> <span class="ls30 ws3">ES<span class="_ _2"></span>PEC<span class="_ _2"></span>IAL</span><span class="ls0"> <span
                            class="ls32 ws5">LA</span><span class="ls2e"> <span class="_ _0"></span><span class="ls31 ws4">MACARENA<span
                            class="ls2e ws4d"> </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></div>
                </div>
                <div class="c x1 y3 w3 h4">
                    <div class="t m0 x3 h5 y4 ff1 fs1 fc0 sc0 ls2 ws6">CORMACARENA<span class="_ _2"></span><span class="ls2e ws4d"> </span></div>
                    <div class="t m0 x4 h3 y5 ff1 fs0 fc0 sc0 ls33 ws7">822000091<span class="ls2e ws4d">-2 </span></div>
                    <div class="t m0 x0 h6 y6 ff2 fs2 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m0 x5 h3 y7 ff1 fs0 fc0 sc0 ls3 ws0">DOCU<span class="_ _0"></span>ME<span class="_ _0"></span>NTO<span class="ls0 ws4d"> <span
                            class="ls2f ws2">DE</span> </span>COBRO<span class="_ _0"></span><span class="ls2e ws4d"> </span></div>
                    <div class="t m0 x6 h3 y8 ff1 fs0 fc0 sc0 ls32 ws5">TAS<span class="_ _2"></span>A<span class="ls2e ws4d"> <span class="_ _1"></span><span class="ls2d ws1">POR<span
                            class="ls0 ws4d"> <span class="ls3 ws0">UT<span class="_ _0"></span>IL<span class="_ _0"></span>IZAC<span class="_ _0"></span>IÓN<span class="ls2e ws4d"> </span>DEL<span
                            class="_ _0"></span><span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls2f ws2">AGU<span class="_ _2"></span>A<span
                            class="ls2e ws4d"> </span></span></span></span></span></span></span></div>
                </div>
                <div class="c x7 y9 w4 h7">
                    <div class="t m1 x8 h8 ya ff1 fs3 fc0 sc0 ls21 ws8">Ref.<span class="ls4 ws4d"> <span class="ls34">de <span class="_ _2"></span>Pago</span></span></div>
                    <div class="t m0 x9 h8 ya ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c xa y9 w5 h7">
                    <div class="t m2 xb h9 yb ff1 fs4 fc1 sc0 ls35 ws9">TUA<span class="ls2e ws4d"> <span class="_ _1"></span><span class="ls36 wsa"><span class="_ _2"></span>${liquidacion?.data.rp}
                    <span
                            class="_ _2"></span><span class="ls37"></span></span></span></div>
                    <div class="t m0 xc h9 yb ff1 fs4 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x7 yc w6 ha">
                    <div class="t m1 xd h8 yd ff1 fs3 fc0 sc0 ls34 ws4d">FECH<span class="_ _2"></span>A LIMIT<span class="_ _2"></span>E<span class="ls5"> <span class="ls16 wsb">DE<span
                            class="_ _1"></span><span class="ls5 ws4d"> <span class="ls38 wsc">PA<span class="_ _2"></span>G<span class="_ _2"></span>O</span></span></span></span></div>
                    <div class="t m0 xe h8 yd ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div> 
                <div class="c x7 ye w6 hb">
                    <div class="t m2 xf h9 yf ff1 fs4 fc2 sc0 ls36 wsa">
                    ${liquidacion?.data.limite_pago}
                    <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x10 h9 yf ff1 fs4 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x7 y3 w4 hc">
                    <div class="t m1 x11 h8 y10 ff1 fs3 fc0 sc0 ls21 ws8">Do<span class="_ _2"></span>c.<span class="ls4 ws4d"> <span class="ls39 wsd">de<span class="_ _3"></span><span
                            class="ls6 ws4d"> <span class="ls21 ws8">Cobr<span class="_ _2"></span>o</span><span class="ls4"> <span class="ls21">Nº</span></span></span></span></span></div>
                    <div class="t m0 x12 h8 y10 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c xa y3 w5 hc">
                    <div class="t m2 x13 h9 y11 ff1 fs4 fc0 sc0 ls7 ws4d"><span
                            class="ls36 wsa"><span class="_ _2"></span>${liquidacion?.data.doc_cobro}
                            <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></span></div><div class="t m0 x12 h9 y11 ff1 fs4 fc0 sc0 ls2e ws4d"> </div></div><div class="c x1 y12 w2 hd"><div class="t m0 x14 he y13 ff3 fs5 fc0 sc0 ls3a wse">$${liquidacion?.data.ley}<span
                            class="ls2e ws4d"> </span></div>
                    <div class="t m0 x14 he y14 ff3 fs5 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y15 w2 hf">
                    <div class="t m3 x14 h10 y16 ff4 fs3 fc0 sc0 ls3b wsf">No<span class="ls2e ws4d"> <span class="ls3c ws10">co<span class="_ _3"></span>nt<span class="_ _3"></span>r<span
                            class="_ _3"></span>ibu<span class="_ _3"></span>yent<span class="_ _1"></span>e<span class="ls2e ws4d"> <span class="lsf">de <span class="_ _3"></span>rent<span
                            class="_ _3"></span>a, e<span class="_ _3"></span>xenta<span class="ls8"> <span class="ls3d ws11">de</span><span class="ls2e"> <span class="ls3e ws12">ret<span
                            class="_ _3"></span>enc<span class="_ _0"></span>ión<span class="ls2e ws4d"> <span class="lsf ws13">en<span class="_ _3"></span><span class="ls2e ws4d"> <span class="ls3f">la fu<span
                            class="_ _0"></span>ente<span class="_ _0"></span><span class="ls2e"> <span class="ls3e ws12">(ET<span class="_ _0"></span>.<span class="ls8 ws4d"> <span
                            class="ls3d ws11">Lib<span class="_ _2"></span>ro</span><span class="ls9"> I <span class="ls40 ws14">Ar<span class="_ _2"></span>t.</span> <span
                            class="ls3d ws11">22</span></span> y <span class="ls3d ws11">Li<span class="_ _2"></span>br<span class="_ _2"></span>o</span> <span class="ls41 ws15">II</span> <span
                            class="ls40 ws14">Art<span class="_ _2"></span>.</span> <span class="lsf ws13">369<span class="_ _3"></span>).<span class="ls8 ws4d"> <span class="ls42 ws16">Do<span
                            class="_ _1"></span>cu<span class="_ _0"></span>men<span class="_ _3"></span>to<span class="_ _1"></span><span class="ls8 ws4d"> <span class="ls28 ws17">Equiva<span
                            class="_ _3"></span>lente<span class="_ _3"></span><span class="ls2e ws4d"> a<span class="_ _2"></span> <span class="ls43 ws18">Fac<span class="_ _2"></span>t<span
                            class="_ _0"></span>ur<span class="_ _2"></span>a<span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls42">De<span class="_ _3"></span>cr<span class="_ _0"></span>et<span
                            class="_ _3"></span>o <span class="_ _3"></span>100<span class="_ _3"></span>1<span class="_ _3"></span><span class="ls8"> <span class="lsf ws13">de</span> <span class="lsf">19<span
                            class="_ _3"></span>97.  <span class="_ _3"></span>De<span class="ls2e"> <span class="ls44 ws19">co<span class="_ _3"></span>nf<span class="_ _3"></span>or<span
                            class="_ _3"></span>mi<span class="_ _3"></span>dad<span class="_ _3"></span><span class="ls2e ws4d"> <span
                            class="_ _2"></span>a </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                    </div>
                    <div class="t m3 x14 h10 y17 ff4 fs3 fc0 sc0 ls3f ws1a">lo<span class="_ _0"></span><span class="ls2e ws4d"> <span class="ls3d ws11">es<span class="_ _2"></span>ta<span
                            class="_ _2"></span>bl<span class="_ _2"></span>eci<span class="_ _2"></span>d<span class="_ _2"></span>o</span> <span class="ls3d">po<span class="_ _2"></span>r l<span
                            class="_ _2"></span>ey<span class="_ _2"></span><span class="ls8"> </span><span class="ws11">106<span class="_ _2"></span>6</span><span class="lsa"> <span
                            class="lsf">de 20<span class="_ _3"></span>06.<span class="_ _3"></span>  Cu<span class="_ _0"></span>lminada<span class="_ _3"></span><span class="ls2e"> <span class="ls3f">la Fe<span
                            class="_ _0"></span>cha<span class="_ _3"></span><span class="ls2e"> <span class="ls3f ws1a">límite<span class="_ _3"></span><span class="ls8 ws4d"> <span
                            class="lsf ws13">de</span> <span class="lsf ws13">pa<span class="_ _3"></span>go<span class="ls8 ws4d"> </span>de<span class="_ _3"></span><span class="ls9 ws4d"> <span
                            class="ls3d">es<span class="_ _4"></span>ta <span class="_ _2"></span>fac<span class="_ _4"></span>tur<span class="_ _2"></span>a<span class="ls2e"> <span
                            class="ls3c ws10">se<span class="_ _3"></span><span class="ls2e ws4d"> <span class="ls3c ws10">ca<span class="_ _3"></span>usa<span class="_ _3"></span>rá<span
                            class="_ _3"></span>n<span class="lsb ws4d"> <span class="ls3f ws1a">inte<span class="_ _0"></span>rese<span class="_ _0"></span>s<span class="ls8 ws4d"> <span
                            class="ls45 ws1b">moratorios<span class="_ _2"></span>,<span class="_ _0"></span><span class="ls2e ws4d"> <span class="ls3f ws1a">los</span> <span class="ls3c ws10">cu<span
                            class="_ _0"></span>a<span class="_ _3"></span>le<span class="_ _3"></span>s<span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls3c ws10">se<span
                            class="_ _3"></span><span class="ls2e ws4d"> <span class="ls3c ws10">cob<span class="_ _3"></span>ra<span class="_ _3"></span>rán<span class="_ _1"></span><span
                            class="lsc ws4d"> <span class="lsf">a la<span class="_ _3"></span><span class="lsd"> <span class="ls41 ws15">tasa</span><span class="lse"> <span class="ls3d">ef<span
                            class="_ _2"></span>ec<span class="_ _2"></span>tiv<span class="_ _2"></span>a <span class="_ _2"></span>d<span class="_ _2"></span>e</span> <span class="ls46 ws1c">us<span
                            class="_ _2"></span>ura<span class="_ _2"></span>,</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                    </div>
                    <div class="t m0 x15 h10 y17 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m3 x14 h10 y18 ff4 fs3 fc0 sc0 ls3d ws11">ex<span class="_ _2"></span>pe<span class="_ _2"></span>did<span class="_ _2"></span>a<span class="ls2e ws4d"> <span
                            class="_ _2"></span>y <span class="_ _0"></span><span class="ls3c ws10">cer<span class="_ _3"></span>t<span class="_ _3"></span>if<span class="_ _3"></span>ic<span
                            class="_ _0"></span>ad<span class="_ _0"></span>a<span class="ls2e ws4d"> <span class="_ _3"></span><span class="lsf ws13">por<span class="ls2e ws4d"> <span
                            class="_ _0"></span><span class="ls3f ws1a">la<span class="_ _0"></span><span class="ls8 ws4d"> <span class="ls28 ws17">Super<span class="_ _3"></span>inte<span
                            class="_ _3"></span>nd<span class="_ _2"></span>en<span class="_ _3"></span>cia<span class="ls2e ws4d"> <span class="ls47 ws1d">Fi<span class="_ _2"></span>n<span
                            class="_ _2"></span>a<span class="_ _2"></span>nc<span class="_ _2"></span>i<span class="_ _2"></span>e<span class="_ _2"></span>r<span class="_ _2"></span>a<span
                            class="_ _2"></span></span> <span class="lsf ws13">de<span class="_ _3"></span><span class="ls2e ws4d"> <span class="ls42 ws16">Co<span class="_ _0"></span>lo<span
                            class="_ _0"></span>mb<span class="_ _3"></span>ia<span class="ls2e ws4d"> <span class="_ _3"></span><span class="lsf ws13">para<span class="ls2e ws4d"> <span
                            class="_ _0"></span><span class="ls3d ws11">el<span class="_ _2"></span><span class="ls2e ws4d"> <span class="ls3e ws12">re<span class="_ _3"></span>spect<span
                            class="_ _3"></span>ivo<span class="_ _3"></span><span class="ls8 ws4d"> <span class="ls45 ws1b">mes<span class="_ _2"></span></span><span class="ls2e"> <span class="lsf ws13">de</span> <span
                            class="_ _3"></span><span class="ls48 ws1e">mo<span
                            class="_ _0"></span>ra.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></div>
                    <div class="t m0 x16 h10 y18 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y19 w5 ha">
                    <div class="t m1 x14 h8 y2 ff1 fs3 fc0 sc0 ls34 ws4d">FECH<span class="_ _2"></span>A D<span class="_ _2"></span>E<span class="_ _0"></span><span class="ls5"> <span class="ls38 wsc">EL<span
                            class="_ _2"></span>AB<span class="_ _2"></span>O<span class="_ _2"></span>R<span class="_ _2"></span>ACI<span class="_ _2"></span>O<span class="_ _2"></span>N</span></span>
                    </div>
                    <div class="t m0 x17 h8 y2 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y19 w7 ha">
                <div class="t m3 x9 h10 y1a ff4 fs3 fc0 sc0 ls49 ws4d" style="position: relative; top: -20px; left: -20px;">
                    ${liquidacion?.data.fecha_impresion}
                    <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span>
                </div>
                <div class="t m0 x19 h10 y1a ff4 fs3 fc0 sc0 ls2e ws4d"></div>
            </div>
            
            
                <div class="c x1a y19 w8 ha">
                    <div class="t m4 x14 h8 y2 ff1 fs3 fc0 sc0 ls12 ws1f">PERIOD<span class="_ _2"></span>O</div>
                    <div class="t m0 x1b h8 y2 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1c y19 w9 ha">
                    <div class="t m3 xb h10 y1a ff4 fs3 fc0 sc0 ls28 ws17">Añ<span class="_ _0"></span>o<span class="ls2e ws4d"> <span class="ls4a ws20"><span class="_ _3"></span>${liquidacion?.data.anio}
                    <span
                            class="_ _3"></span></span></span></div>
                    <div class="t m0 x1d h10 y1a ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y19 wa ha">
                    <div class="t m4 x13 h8 y2 ff1 fs3 fc0 sc0 ls10 ws21">CEDULA/NI<span class="_ _0"></span>T</div>
                    <div class="t m0 x1d h8 y2 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1f y19 wb ha">
                    <div class="t m5 x20 h10 y1a ff4 fs3 fc0 sc0 ls4b ws4d"><span class="_ _2"></span>${liquidacion?.data.cedula}
                    <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x21 h10 y1a ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y1b w5 h11">
                    <div class="t m1 x14 h8 y1c ff1 fs3 fc0 sc0 ls21 ws8">NOM<span class="_ _2"></span>BR<span class="_ _2"></span>E<span class="ls11 ws4d"> <span class="ls16">DE<span class="_ _3"></span>L <span
                            class="_ _0"></span>T<span class="_ _0"></span>IT<span class="_ _3"></span>ULAR</span></span></div>
                    <div class="t m0 x22 h8 y1c ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y1b wc h11">
                    <div class="t m6 x14 h12 y1d ff1 fs6 fc0 sc0 ls4c ws4d"><span class="_ _2"></span> ${liquidacion?.data.titular}
                    <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span
                            class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x1b h12 y1d ff1 fs6 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y1e w5 h13">
                    <div class="t m1 x14 h8 y1f ff1 fs3 fc0 sc0 ls21 ws8">REP<span class="_ _2"></span>RESE<span class="_ _2"></span>NT<span class="_ _2"></span>ANTE<span class="_ _2"></span><span
                            class="ls11 ws4d"> <span class="ls39 wsd">LE<span class="_ _3"></span>GAL</span></span></div>
                    <div class="t m0 x23 h8 y1f ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                
                <div class="c x18 y1e wc h13">
                    <div class="t m3 x14 h10 y1f ff4 fs3 fc0 sc0 ls49 ws4d"style="position: relative; top: -20px; ">
                         <span class="ls3e ws12">${liquidacion?.data.representante_legal}
                         <span class="_ _3"></span><span class="_ _3"></span><span class="_ _0"></span><span class="_ _3"></span><span class="ls2e ws4d"> <span class="ls49"></span></span></span></div>
                    <div class="t m0 xf h10 y1f ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y20 w5 h14">
                    <div class="t m0 x0 h15 y21 ff2 fs7 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m4 x14 h8 y22 ff1 fs3 fc0 sc0 ls10 ws21">DIRECCION</div>
                    <div class="t m0 x24 h8 y22 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y20 wd h14">
                    <div class="t m3 x14 h10 y23 ff4 fs3 fc0 sc0 ls49 ws4d">
                       <span class="_ _2"></span><span class="_ _2"></span>${liquidacion?.data.direccion}
                       <span class="_ _2"></span><span class="_ _2"></span>n<span class="_ _2"></span><span class="ls2e"> </span></div>
                    <div class="t m0 x25 h10 y23 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x7 y20 we h14">
                    <div class="t m0 x0 h15 y21 ff2 fs7 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m1 x14 h8 y22 ff1 fs3 fc0 sc0 ls34 ws22">TELE<span class="_ _2"></span>FONO<span class="_ _2"></span>S</div>
                    <div class="t m0 x25 h8 y22 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x26 y20 wf h14">
                    <div class="t m0 x0 h16 y24 ff2 fs8 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m3 x14 h10 y22 ff4 fs3 fc0 sc0 ls49 ws4d">
                        <span class="_ _2"></span>${liquidacion?.data.telefono}
                        <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div><div class="t m0 x21 h10 y22 ff4 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x1 y25 w5 ha"><div class="t m4 x14 h8 y26 ff1 fs3 fc0 sc0 ls12 ws1f">EXPEDIENTE</div><div class="t m0 x1d h8 y26 ff1 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x18 y25 w10 ha"><div class="t m5 x27 h10 y26 ff4 fs3 fc0 sc0 ls4b ws23"><span class="_ _2"></span>${liquidacion?.data.expediente}
                        <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y26 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x28 y25 w11 ha">
                    <div class="t m1 x20 h8 y26 ff1 fs3 fc0 sc0 ls21 ws8">N°<span class="ls5 ws4d"> </span>RESO<span class="_ _2"></span>LU<span class="_ _2"></span>CION<span class="ls2e ws4d"> <span
                            class="_ _2"></span>Y <span class="_ _4"></span><span class="ls34 ws22">FECH<span class="_ _2"></span>A</span></span></div>
                    <div class="t m0 x17 h8 y26 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x29 y25 w12 ha">
                    <div class="t m3 x24 h10 y26 ff4 fs3 fc0 sc0 ls49 ws4d">
                        <span class="_ _4"></span>p<span class="_ _2"></span><span class="_ _4"></span>${liquidacion?.data.exp_resolucion}
                        <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div><div class="t m0 x2a h10 y26 ff4 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x1 y27 w5 ha"><div class="t m1 x14 h8 y28 ff1 fs3 fc0 sc0 ls21 ws8">NOM<span class="_ _2"></span>BR<span class="_ _2"></span>E<span class="ls11 ws4d"> <span class="ls16 wsb">DE<span class="_ _1"></span><span class="ls5 ws4d"> <span class="ls34">LA F<span class="_ _2"></span>U<span class="_ _2"></span>ENTE</span></span></span></span></div><div class="t m0 x2b h8 y28 ff1 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x19 y27 w13 ha"><div class="t m3 x14 h10 y28 ff4 fs3 fc0 sc0 ls49 ws4d"><span class="_ _2"></span><span class="_ _2"></span>${liquidacion?.data.nombre_fuente}
                        <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 xc h10 y28 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y29 w14 ha">
                    <div class="t m4 x14 h8 y2a ff1 fs3 fc0 sc0 ls12 ws1f">PREDIO</div>
                    <div class="t m0 x2c h8 y2a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x2d y29 w15 ha">
                    <div class="t m3 x14 h10 y2a ff4 fs3 fc0 sc0 ls49 ws24"><span class="_ _2"></span>${liquidacion?.data.predio}
                    <span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x2c h10 y2a ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y2b w14 h13">
                    <div class="t m4 x14 h8 y2c ff1 fs3 fc0 sc0 ls4d ws25">MUNI<span class="_ _2"></span>CIPIO</div>
                    <div class="t m0 x2e h8 y2c ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>

                <div class="c x2d y2b w16 h13">
                    <div class="t m3 x14 h10 y2d ff4 fs3 fc0 sc0 ls49 ws24" style="position: relative; top: -20px;  ">
                        <span class="_ _2"></span>${liquidacion?.data.municipio}
                        <span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="ls2e ws4d"> </span></div><div class="t m0 x2f h10 y2d ff4 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x30 y2e w4 h17"><div class="t m1 x31 h8 y2f ff1 fs3 fc0 sc0 ls34 ws22">FACTOR<span class="ls6 ws4d"> <span class="ls16 wsb">RE<span class="_ _3"></span>GIO<span class="_ _0"></span>N<span class="_ _0"></span>A<span class="_ _0"></span>L<span class="_ _0"></span><span class="ls2e ws4d"> </span></span></span></div><div class="t m4 x1b h8 y30 ff1 fs3 fc0 sc0 ls4e ws26">(Fr<span class="_ _2"></span>)</div><div class="t m0 x1d h8 y30 ff1 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x32 y2e w4 h17"><div class="t m1 x31 h8 y2f ff1 fs3 fc0 sc0 ls34 ws22">TARIF<span class="_ _2"></span>A<span class="ls11 ws4d"> <span class="ls16">DE<span class="_ _3"></span> LA<span class="_ _3"></span><span class="ls11"> <span class="ls39 wsd">TAS<span class="_ _0"></span>A</span></span></span></span></div><div class="t m0 x2d h8 y2f ff1 fs3 fc0 sc0 ls2e ws4d"> </div><div class="t m1 x33 h8 y30 ff1 fs3 fc0 sc0 ls4f ws27">$/<span class="_ _2"></span>m<span class="_ _2"></span>3<span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls50 ws28">:T<span class="_ _2"></span>UA<span class="_ _2"></span>2<span class="_ _2"></span>022</span></span></div><div class="t m0 x34 h8 y30 ff1 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x1 y2e w17 h18"><div class="t m1 x14 h8 y31 ff1 fs3 fc0 sc0 ls21 ws4d">CAU<span class="_ _2"></span>DAL <span class="_ _2"></span>CON<span class="_ _2"></span>CE<span class="_ _2"></span>SIONA<span class="_ _2"></span>DO<span class="ls11"> <span class="ls50">(Q<span class="_ _2"></span>) <span class="_ _2"></span>L/s<span class="_ _2"></span>g</span></span></div><div class="t m0 x35 h8 y31 ff1 fs3 fc0 sc0 ls2e ws4d"> </div></div><div class="c x3 y2e w18 h18"><div class="t m5 x14 h10 y32 ff4 fs3 fc0 sc0 ls4b ws23"><span class="_ _2"></span><span class="_ _2"></span>${liquidacion?.data.caudal_consecionado}
<span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x36 h10 y32 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y33 w14 hd">
                    <div class="t m4 x14 h8 y34 ff1 fs3 fc0 sc0 ls10 ws21">USO</div>
                    <div class="t m0 x33 h8 y34 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x2d y33 w16 hd">
                    <div class="t m5 x14 h10 y35 ff4 fs3 fc0 sc0 ls4b ws23"><span class="_ _2"></span>${liquidacion?.data.uso}<span class="_ _2"></span></div>
                    <div class="t m0 x27 h10 y35 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x30 y33 w4 hd">
                    <div class="t m7 x14 h3 y36 ff1 fs0 fc0 sc0 ls51 ws4d"><span class="_ _2"></span> <span class="_ _2"></span> <span class="_ _2"></span> <span
                            class="ls13 ws29"><span class="_ _3">${liquidacion?.data.fr}</span></span></div>
                    <div class="t m0 x37 h3 y36 ff1 fs0 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x32 y33 w4 hd">
                    <div class="t m7 x2c h3 y36 ff1 fs0 fc0 sc0 ls2e ws2a">$<span class="ls13 ws29"><span class="_ _0"></span>${liquidacion?.data.tt}<span class="_ _0"></span></span></div>
                    <div class="t m0 x38 h3 y36 ff1 fs0 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y37 w2 ha">
                    <div class="t m0 x39 h8 y38 ff1 fs3 fc0 sc0 ls52 ws2b">LIQUID<span class="_ _2"></span>ACION<span class="_ _2"></span><span class="ls14 ws4d"> <span class="ls21 ws8">DEL</span><span
                            class="ls15"> <span class="ls21 ws8">CONSUM<span class="_ _2"></span>O</span><span class="ls2e"> </span></span></span></div>
                </div>
                <div class="c x1 y39 w5 ha">
                    <div class="t m1 x2c h8 y3a ff1 fs3 fc0 sc0 ls53 ws4d">MES<span class="_ _2"></span>ES <span class="_ _2"></span>DEL<span class="ls11"> <span class="ls16 wsb">AÑO</span></span></div>
                    <div class="t m0 x23 h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y39 w19 ha">
                    <div class="t m4 x8 h8 y3a ff1 fs3 fc0 sc0 ls12 ws1f">ENERO</div>
                    <div class="t m0 x1d h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y39 wb ha">
                    <div class="t m4 x1 h8 y3a ff1 fs3 fc0 sc0 ls54 ws2c">FEBR<span class="_ _2"></span>ERO</div>
                    <div class="t m0 x34 h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y39 w1a ha">
                    <div class="t m4 x3b h8 y3a ff1 fs3 fc0 sc0 ls4d ws25">MARZO</div>
                    <div class="t m0 x34 h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y39 w1b ha">
                    <div class="t m4 x3d h8 y3a ff1 fs3 fc0 sc0 ls10 ws21">ABRIL</div>
                    <div class="t m0 x1d h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y39 w19 ha">
                    <div class="t m4 x3d h8 y3a ff1 fs3 fc0 sc0 ls4d ws25">MAYO</div>
                    <div class="t m0 x1d h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y39 w1c ha">
                    <div class="t m4 x1 h8 y3a ff1 fs3 fc0 sc0 ls4f ws27">JUN<span class="_ _2"></span>IO</div>
                    <div class="t m0 xd h8 y3a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y3b w5 h19">
                    <div class="t m1 xb h8 y3c ff1 fs3 fc0 sc0 ls38 ws4d">VO<span class="_ _2"></span>LUM<span class="_ _2"></span>EN<span class="_ _2"></span> D<span class="_ _2"></span>E <span
                            class="_ _2"></span><span class="ls21 ws8">AGU<span class="_ _2"></span>A</span><span class="ls2e"> </span></div>
                    <div class="t m4 x3b h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d">V <span class="ls4e ws26">(m3)</span></div>
                    <div class="t m0 xc h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y3b w19 h19">
                    <div class="t m5 x3f h10 y3e ff4 fs3 fc0 sc0 ls55 ws2d">${liquidacion?.data.volumenMeses[0]}<span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x38 h10 y3e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y3b wb h19">
                    <div class="t m5 x3f h10 y3e ff4 fs3 fc0 sc0 ls55 ws2d">${liquidacion?.data.volumenMeses[1]}<span class="_ _2"></span><span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x38 h10 y3e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y3b w1a h19">
                    <div class="t m5 x3d h10 y3e ff4 fs3 fc0 sc0 ls55 ws2d">${liquidacion?.data.volumenMeses[2]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x38 h10 y3e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y3b w1b h19">
                    <div class="t m5 x40 h10 y3e ff4 fs3 fc0 sc0 ls55 ws2d">${liquidacion?.data.volumenMeses[3]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 y3e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y3b w19 h19">
                    <div class="t m5 x40 h10 y3e ff4 fs3 fc0 sc0 ls55 ws2d">${liquidacion?.data.volumenMeses[4]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 y3e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y3b w1c h19">
                    <div class="t m5 x40 h10 y3e ff4 fs3 fc0 sc0 ls55 ws2d">${liquidacion?.data.volumenMeses[5]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 y3e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y3f w5 h19">
                    <div class="t m1 x31 h8 y40 ff1 fs3 fc0 sc0 ls34 ws4d">FAC<span class="_ _2"></span>TOR D<span class="_ _2"></span>E<span class="_ _0"></span> <span class="_ _2"></span>COSTO<span
                            class="_ _2"></span> DE<span class="ls2e"> </span></div>
                    <div class="t m4 x8 h8 y41 ff1 fs3 fc0 sc0 ls56 ws2e">OPORT<span class="_ _3"></span>UNIDAD</div>
                    <div class="t m0 x42 h8 y41 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y3f w19 h19">
                    <div class="t m5 x1 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x25 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y3f wb h19">
                    <div class="t m5 x2c h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y3f w1a h19">
                    <div class="t m5 x2c h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x43 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y3f w1b h19">
                    <div class="t m5 x44 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y3f w19 h19">
                    <div class="t m5 x44 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y3f w1c h19">
                    <div class="t m5 x44 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y42 w5 hb">
                    <div class="t m1 x45 h8 y43 ff1 fs3 fc0 sc0 ls53 ws2f">MONTO<span class="_ _2"></span><span class="ls5 ws4d"> <span class="ls21">A PAG<span class="_ _2"></span>AR</span></span></div>
                    <div class="t m0 x22 h8 y43 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m4 x1b h8 y44 ff1 fs3 fc0 sc0 ls4e ws26">($/<span class="_ _2"></span>m3)</div>
                    <div class="t m0 xc h8 y44 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y42 w19 hb">
                    <div class="t m8 x43 h10 y45 ff4 fs3 fc0 sc0 ls57 ws30">$${liquidacion?.data.montopagarMeses[0]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x46 h10 y45 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y42 wb hb">
                    <div class="t m3 x43 h10 y45 ff4 fs3 fc0 sc0 lsf ws13">$${liquidacion?.data.montopagarMeses[1]}<span class="_ _0"></span><span class="_ _3"></span></div>
                    <div class="t m0 x12 h10 y45 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y42 w1a hb">
                    <div class="t m5 x1d h10 y45 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[2]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 xf h10 y45 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y42 w1b hb">
                    <div class="t m5 x37 h10 y45 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[3]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y45 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y42 w19 hb">
                    <div class="t m5 x37 h10 y45 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[4]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y45 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y42 w1c hb">
                    <div class="t m5 x47 h10 y45 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[5]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 xf h10 y45 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y46 w1d ha">
                    <div class="t m0 x0 h1a y47 ff2 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                 
              
                <div class="c x1 y4a w5 ha">
                    <div class="t m1 x3f h8 y3d ff1 fs3 fc0 sc0 ls53 ws4d">MES<span class="_ _2"></span>ES <span class="_ _2"></span>DEL<span class="ls11"> <span class="ls16 wsb">AÑO</span></span></div>
                    <div class="t m0 x22 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y4a w19 ha">
                    <div class="t m4 x27 h8 y3d ff1 fs3 fc0 sc0 ls4f ws27">JUL<span class="_ _2"></span>IO</div>
                    <div class="t m0 x37 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y4a wb ha">
                    <div class="t m4 x8 h8 y3d ff1 fs3 fc0 sc0 ls10 ws21">AGOSTO</div>
                    <div class="t m0 x38 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y4a w1a ha">
                    <div class="t m4 x33 h8 y3d ff1 fs3 fc0 sc0 ls12 ws1f">SEPTIEMBRE</div>
                    <div class="t m0 x34 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y4a w1b ha">
                    <div class="t m4 x3f h8 y3d ff1 fs3 fc0 sc0 ls18 ws34">OCTUBRE</div>
                    <div class="t m0 x49 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y4a w19 ha">
                    <div class="t m4 x33 h8 y3d ff1 fs3 fc0 sc0 ls10 ws21">NOVIEMBRE</div>
                    <div class="t m0 x9 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y4a w1c ha">
                    <div class="t m4 x4a h8 y3d ff1 fs3 fc0 sc0 ls10 ws21">DICIEM<span class="_ _0"></span>BRE</div>
                    <div class="t m0 x9 h8 y3d ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y4b w5 h19">
                    <div class="t m1 xb h8 y40 ff1 fs3 fc0 sc0 ls38 ws4d">VO<span class="_ _2"></span>LUM<span class="_ _2"></span>EN<span class="_ _2"></span> D<span class="_ _2"></span>E <span
                            class="_ _2"></span><span class="ls21 ws8">AGU<span class="_ _2"></span>A</span><span class="ls2e"> </span></div>
                    <div class="t m4 x3b h8 y41 ff1 fs3 fc0 sc0 ls2e ws4d">V <span class="ls4e ws26">(m3)</span></div>
                    <div class="t m0 xc h8 y41 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y4b w19 h19">
                    <div class="t m5 x40 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">  ${liquidacion?.data.volumenMeses[6]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y4b wb h19">
                    <div class="t m5 x40 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">  ${liquidacion?.data.volumenMeses[7]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y4b w1a h19">
                    <div class="t m5 x3d h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">  ${liquidacion?.data.volumenMeses[8]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x38 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y4b w1b h19">
                    <div class="t m5 x40 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">  ${liquidacion?.data.volumenMeses[9]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y4b w19 h19">
                    <div class="t m5 x40 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">  ${liquidacion?.data.volumenMeses[10]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y4b w1c h19">
                    <div class="t m5 x40 h10 yf ff4 fs3 fc0 sc0 ls55 ws2d">  ${liquidacion?.data.volumenMeses[11]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x41 h10 yf ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y4c w5 h19">
                    <div class="t m1 x31 h8 y4d ff1 fs3 fc0 sc0 ls34 ws4d">FAC<span class="_ _2"></span>TOR D<span class="_ _2"></span>E<span class="_ _0"></span> <span class="_ _2"></span>COSTO<span
                            class="_ _2"></span> DE<span class="ls2e"> </span></div>
                    <div class="t m4 x8 h8 y2c ff1 fs3 fc0 sc0 ls56 ws2e">OPORT<span class="_ _3"></span>UNIDAD</div>
                    <div class="t m0 x42 h8 y2c ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y4c w19 h19">
                    <div class="t m5 x1 h10 y4e ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x25 h10 y4e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y4c wb h19">
                    <div class="t m5 x44 h10 y4e ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 y4e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y4c w1a h19">
                    <div class="t m5 x2c h10 y4e ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x43 h10 y4e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y4c w1b h19">
                    <div class="t m5 x44 h10 y4e ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 y4e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y4c w19 h19">
                    <div class="t m5 x44 h10 y4e ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 y4e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y4c w1c h19">
                    <div class="t m5 x44 h10 y4e ff4 fs3 fc0 sc0 ls55 ws2d">1,00<span class="_ _2"></span></div>
                    <div class="t m0 x24 h10 y4e ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y4f w5 h19">
                    <div class="t m1 x45 h8 y50 ff1 fs3 fc0 sc0 ls53 ws2f">MONTO<span class="_ _2"></span><span class="ls5 ws4d"> <span class="ls21">A <span class="ls5a ws35">PAGAR</span></span></span>
                    </div>
                    <div class="t m0 x22 h8 y50 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m4 x1b h8 y51 ff1 fs3 fc0 sc0 ls4e ws26">($/<span class="_ _2"></span>m3)</div>
                    <div class="t m0 xc h8 y51 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y4f w19 h19">
                    <div class="t m5 x43 h10 y52 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[6]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y52 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3a y4f wb h19">
                    <div class="t m5 x37 h10 y52 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[7]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y52 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y4f w1a h19">
                    <div class="t m5 x1d h10 y52 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[8]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 xf h10 y52 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3c y4f w1b h19">
                    <div class="t m5 x37 h10 y52 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[9]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y52 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y4f w19 h19">
                    <div class="t m5 x37 h10 y52 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[10]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 x12 h10 y52 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x3e y4f w1c h19">
                    <div class="t m5 x47 h10 y52 ff4 fs3 fc0 sc0 ls55 ws2d">$${liquidacion?.data.montopagarMeses[11]}<span class="_ _2"></span><span class="_ _2"></span></div>
                    <div class="t m0 xf h10 y52 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y53 w1d h7">
                    <div class="t m0 x0 h1a y54 ff2 fs3 fc0 sc0 ls2e ws4d"></div>
                </div> 
                <div class="c x1 y56 w1e ha">
                    <div class="t m4 x4b h8 y57 ff1 fs3 fc0 sc0 ls10 ws21">DESCRIP<span class="_ _0"></span>CION</div>
                    <div class="t m0 x4c h8 y57 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1a y56 w1f ha">
                    <div class="t m4 x9 h8 y57 ff1 fs3 fc0 sc0 ls12 ws1f">VALOR</div>
                    <div class="t m0 x4d h8 y57 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1e y58 w20 h1c">
                    <div class="t m0 x0 h1d y59 ff2 fs6 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m3 x49 h10 y5a ff4 fs3 fc0 sc0 ls28 ws17">Pá<span class="_ _0"></span>gue<span class="_ _0"></span>se<span class="ls2e ws4d"> <span class="lsf">en</span></span></div>
                    <div class="t m0 x4e h10 y5a ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m0 x0 h16 y5b ff2 fs8 fc0 sc0 ls2e ws4d"></div>
                    <div class="t m3 x4f h10 y5c ff4 fs3 fc0 sc0 ls28 ws4d">Ba<span class="_ _0"></span>nco <span class="_ _3"></span>C<span class="_ _2"></span>a<span class="_ _3"></span>ja Soc<span
                            class="_ _0"></span>ia<span class="_ _0"></span>l <span class="_ _0"></span><span class="ls2e">-<span class="_ _2"></span> <span class="ls1a">Ahor<span
                            class="_ _3"></span>ros<span class="_ _0"></span> 265<span class="_ _0"></span>0661<span class="_ _0"></span>9810<span class="_ _0"></span><span
                            class="ls2e"> </span></span></span></div>
                    <div class="t m3 x4f h10 y5d ff4 fs3 fc0 sc0 ls40 ws4d">Ba<span class="_ _2"></span>nco<span class="_ _2"></span> Dav<span class="_ _2"></span>iv<span class="_ _2"></span>iend<span
                            class="_ _2"></span>a <span class="ls2e">-<span class="_ _2"></span> <span class="ls28 ws17">Aho<span class="_ _3"></span>rro<span class="_ _3"></span>s<span class="lse ws4d"> <span
                            class="ls46 ws1c">09<span class="_ _2"></span>60<span class="_ _2"></span>253<span class="_ _2"></span>24<span class="_ _2"></span>62<span class="_ _2"></span>3</span><span
                            class="ls2e"> </span></span></span></span></div>
                    <div class="t m3 x27 h10 y5e ff4 fs3 fc0 sc0 ls28 ws17">Ba<span class="_ _0"></span>nco<span class="ls8 ws4d"> <span class="ls40 ws14">BBV<span class="_ _2"></span>A</span><span
                            class="ls2e"> <span class="_ _2"></span>- <span class="_ _2"></span></span></span>Aho<span class="_ _0"></span>rros<span class="_ _3"></span><span class="lse ws4d"> <span
                            class="ls1b ws37">85400<span class="_ _3"></span>1633<span class="ls2e ws4d"> </span></span></span></div>
                    <div class="t m8 x3b h10 y5f ff4 fs3 fc0 sc0 ls5c ws38">Conv<span class="_ _2"></span>eni<span class="_ _2"></span>o<span class="ls1c ws4d"> <span class="ls1d ws39">BBVA</span><span
                            class="ls2e"> - <span class="_ _0"></span><span class="ls1e ws3a">332<span class="_ _0"></span>80</span></span></span></div>
                    <div class="t m0 x35 h10 y5f ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x1 y60 w1e ha">
                    <div class="t m1 x50 h8 y49 ff1 fs3 fc0 sc0 ls34 ws22">TOTAL<span class="ls5 ws4d"> </span>LIQ<span class="_ _2"></span>UIDADO</div>
                    <div class="t m0 x51 h8 y49 ff1 fs3 fc0 sc0 ls2e ws4d"><span class="fc4 sc0"> </span></div>
                </div>
                <div class="c x1a y60 w1f ha">
                    <div class="t m0 x35 h8 y61 ff1 fs3 fc0 sc0 ls19 ws33">$${liquidacion?.data?.valor_cuota}<span class="_ _2"></span><span class="_ _2"></span><span class="ls2e ws4d"> </span></div>
                </div>
                <div class="c x1 y62 w1e h2">
                    <div class="t m4 x4 h8 y63 ff1 fs3 fc0 sc0 ls10 ws21">DESCUENT<span class="_ _3"></span>O</div>
                    <div class="t m0 x51 h8 y63 ff1 fs3 fc0 sc0 ls2e ws4d"><span class="fc4 sc0"> </span></div>
                </div>
                <div class="c x1a y62 w1f h2">
                    <div class="t m0 x10 h8 y64 ff1 fs3 fc0 sc0 ls19 ws33">$0<span class="ls2e ws4d"> </span></div>
                </div>
                <div class="c x1 y65 w1e h13">
                    <div class="t m1 x52 h8 y66 ff1 fs3 fc0 sc0 ls21 ws8">NETO<span class="_ _2"></span><span class="ls2e ws4d"> A <span class="_ _2"></span><span class="ls38 wsc">PAG<span
                            class="_ _4"></span>AR</span></span></div>
                    <div class="t m0 x51 h8 y66 ff1 fs3 fc0 sc0 ls2e ws4d"><span class="fc4 sc0"> </span></div>
                </div>
                <div class="c x1a y65 w1f h13">
                    <div class="t m0 x35 h8 y67 ff1 fs3 fc0 sc0 ls19 ws33">$${liquidacion?.data?.valor_cuota}<span class="_ _2"></span><span class="_ _2"></span><span class="ls2e ws4d"> </span></div>
                </div>
                <div class="c x1 y58 w1e h1e">
                    <div class="t m2 x2f h9 y68 ff1 fs4 fc0 sc0 ls35 ws9">TOT<span class="_ _2"></span>AL<span class="ls1f ws4d"> A<span class="_ _5"></span> <span class="ls5d ws3b">PA<span
                            class="_ _3"></span>G<span class="_ _2"></span>AR</span></span></div>
                    <div class="t m0 x51 h9 y68 ff1 fs4 fc0 sc0 ls2e ws4d"><span class="fc4 sc0"> </span></div>
                </div>
                <div class="c x1a y58 w1f h1e">
                    <div class="t m0 x53 h9 y68 ff1 fs4 fc1 sc0 ls20 ws3c">$${liquidacion?.data?.valor_cuota}<span class="_ _0"></span><span class="fc0 ls2e ws4d"> </span></div>
                </div>
                <div class="c x1 y69 w5 hd">
                    <div class="t m1 x21 h8 y6a ff1 fs3 fc0 sc0 ls34 ws4d">TOTAL <span class="_ _2"></span>A PAG<span class="_ _2"></span>AR</div>
                    <div class="t m0 x54 h8 y6a ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="c x18 y69 wc hd">
                    <div class="t m1 x14 h8 y6b ff1 fs3 fc1 sc0 ls21 ws4d">CIENTO<span class="_ _2"></span> <span class="_ _2"></span>SETEN<span class="_ _2"></span>TA <span class="_ _2"></span>Y<span
                            class="ls5"> </span>UN MIL<span class="ls4"> <span class="ls5e">QUI<span class="_ _2"></span>NCE<span class="_ _3"></span> <span class="_ _2"></span>PESOS</span></span></div>
                    <div class="t m0 x55 h8 y6b ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                </div>
                <div class="t m3 x2c h10 y6c ff4 fs3 fc0 sc0 ls3b wsf">De<span class="ls2e ws4d"> <span class="ls3c ws10">co<span class="_ _3"></span>nf<span class="_ _3"></span>or<span
                        class="_ _3"></span>mid<span class="_ _3"></span>ad<span class="_ _0"></span><span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls3c ws10">con<span
                        class="_ _0"></span><span class="ls2e ws4d"> <span class="_ _3"></span><span class="ls3f ws1a">lo<span class="ls8 ws4d"> <span class="ls3d ws11">dis<span
                        class="_ _2"></span>pue<span class="_ _2"></span>s<span class="_ _2"></span>to<span class="_ _2"></span></span><span class="ls2e"> <span class="lsf ws13">po<span
                        class="_ _3"></span>r<span class="ls8 ws4d"> <span class="ls3d ws11">el</span><span class="ls2e"> <span class="ls42 ws16">De<span class="_ _0"></span>cr<span class="_ _3"></span>et<span
                        class="_ _0"></span>o<span class="ls2e ws4d"> <span class="ls3d ws11">107<span class="_ _2"></span>6<span class="_ _2"></span></span> <span class="ls3d">de <span
                        class="_ _2"></span>20<span class="_ _2"></span>15<span class="_ _2"></span>,</span> <span class="ls3f ws1a">la</span> <span class="ls3d ws11">pres<span class="_ _2"></span>e<span
                        class="_ _2"></span>nt<span class="_ _2"></span>aci<span class="_ _2"></span>ón<span class="_ _2"></span></span> <span class="lsf ws13">de</span> <span
                        class="ls5f ws3d">cualquier</span><span class="ls9"> <span class="ls3e ws12">re<span class="_ _3"></span>clamo<span class="ls2e ws4d"> <span class="_ _0"></span>o <span
                        class="ls3d ws11">ac<span class="_ _2"></span>la<span class="_ _2"></span>r<span class="_ _2"></span>aci<span class="_ _2"></span>ó<span class="_ _2"></span>n</span> <span
                        class="lsf ws13">de<span class="_ _3"></span><span class="lsa ws4d"> <span class="ls3d ws11">es<span class="_ _2"></span>t<span class="_ _2"></span>a</span><span class="ls8"> <span
                        class="ls41 ws15">factura</span><span class="ls2e"> <span class="lsf ws13">debe<span class="_ _3"></span>rá<span class="ls2e ws4d"> </span>ef<span class="_ _0"></span>e<span
                        class="_ _0"></span>ctu<span class="_ _0"></span>ar<span class="_ _0"></span>se<span class="ls2e ws4d"> </span>por<span class="_ _3"></span><span class="lse ws4d"> <span
                        class="ls3d ws11">es<span class="_ _2"></span>cri<span class="_ _2"></span>t<span class="_ _2"></span>o</span><span class="ls2e"> <span class="lsf ws13">dentr<span
                        class="_ _3"></span>o<span class="ls2e ws4d"> </span>de<span class="lse ws4d"> <span class="ls46 ws1c">un</span><span
                        class="ls2e"> </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                </div>
                <div class="t m5 x2c h10 y6d ff4 fs3 fc0 sc0 ls60 ws3e">té<span class="_ _2"></span>rmi<span class="_ _2"></span>n<span class="_ _2"></span>o<span class="_ _2"></span><span
                        class="ls2e ws4d"> <span class="_ _3"></span><span class="ls55 ws2d">no<span class="_ _2"></span><span class="ls2e ws4d"> <span class="_ _3"></span><span
                        class="ls5f ws3d">super<span class="_ _0"></span>ior<span class="ls2e ws4d"> <span class="_ _0"></span>a <span class="_ _1"></span><span class="ls61 ws3f">se<span
                        class="_ _0"></span>is<span class="_ _3"></span><span class="ls2e ws4d"> <span class="ls62 ws40">(6)</span> <span class="_ _3"></span><span class="ls63 ws41">mes<span
                        class="_ _0"></span>e<span class="_ _3"></span>s<span class="_ _2"></span><span class="ls2e ws4d"> <span class="_ _1"></span><span class="ls5f ws3d">si<span
                        class="_ _2"></span>g<span class="_ _0"></span>uie<span class="_ _0"></span>ntes<span class="ls2e ws4d"> <span class="_ _3"></span>a <span class="_ _0"></span><span
                        class="ls3f ws1a">la<span class="_ _0"></span><span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls64 ws42">fecha<span class="ls2e ws4d"> <span
                        class="_ _1"></span><span class="ls3f ws1a">límit<span class="_ _3"></span>e<span class="ls2e ws4d"> <span class="_ _3"></span><span class="ls55 ws2d">de<span
                        class="ls2e ws4d"> <span class="ls65 ws43">pa<span class="_ _0"></span>go<span class="_ _0"></span><span class="ls2e ws4d"> <span class="_ _0"></span><span
                        class="ls65 ws43">del<span class="ls2e ws4d"> <span class="_ _3"></span><span class="ls55 ws2d">pres<span class="_ _2"></span>en<span class="_ _2"></span>te<span class="ls2e ws4d"> <span
                        class="ls65 ws43">do<span class="_ _3"></span>cume<span
                        class="_ _0"></span>nto.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                </div>
                <div class="t m0 x56 h10 y6d ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                <div class="t m0 xf h8 y6e ff1 fs3 fc0 sc0 ls21 ws8">UNA<span class="ls22 ws4d"> <span class="ls66 ws44">VEZ</span><span class="ls15"> </span></span>REAL<span
                        class="_ _2"></span>IZADO<span class="ls14 ws4d"> <span class="ls66 ws44">EL</span><span class="ls15"> <span class="ls66 ws44">PAGO,</span> <span class="ls66 ws44">ENVIAR<span
                        class="_ _2"></span></span> </span></span>COPIA<span class="ls22 ws4d"> </span>DEL<span class="_ _2"></span><span class="ls23 ws4d"> <span class="ls66 ws44">SOPORT<span
                        class="_ _2"></span>E</span><span class="ls15"> </span></span>RESPECTIVO<span class="ls24 ws4d"> </span>AL<span class="_ _2"></span><span class="ls23 ws4d"> </span>CORREO<span
                        class="ls14 ws4d"> <span class="ls67 ws45">info@c<span class="_ _2"></span>orm<span class="_ _2"></span>acar<span class="_ _2"></span>ena.go<span class="_ _2"></span>v.co<span
                        class="_ _2"></span></span><span class="ls2e"> </span></span></div>
                <div class="t m3 x2c h10 y6f ff4 fs3 fc0 sc0 ls28 ws17">Pa<span class="_ _0"></span>ra<span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls3f ws1a">la<span
                        class="_ _0"></span><span class="ls8 ws4d"> <span class="ls40 ws14">Ex<span class="_ _2"></span>p<span class="_ _2"></span>e<span class="_ _2"></span>dic<span class="_ _2"></span>ión</span><span
                        class="ls9"> <span class="lsf ws13">de</span><span class="ls2e"> <span class="ls3c ws10">su<span class="_ _1"></span><span class="ls8 ws4d"> <span class="ls40 ws14">Paz<span
                        class="_ _4"></span></span><span class="ls2e"> y <span class="_ _2"></span><span class="ls28 ws17">Sa<span class="_ _3"></span>lvo,<span class="_ _3"></span><span class="ls8 ws4d"> <span
                        class="lsf ws13">debe<span class="_ _3"></span><span class="ls8 ws4d"> <span class="lsf ws13">hacer<span class="_ _3"></span><span class="ls2e ws4d"> <span class="ls3f ws1a">llegar<span
                        class="_ _3"></span><span class="ls8 ws4d"> <span class="ls45 ws1b">me<span class="_ _2"></span>diante</span><span class="ls9"> <span class="lsf ws13">of<span class="_ _0"></span>icio<span
                        class="_ _3"></span><span class="ls2e ws4d"> <span class="ls3d">ori<span class="_ _2"></span>gi<span class="_ _2"></span>n<span class="_ _2"></span>al<span
                        class="_ _2"></span> y<span class="_ _2"></span>/o</span> <span class="ls3c ws10">cop<span class="_ _1"></span>ia<span class="ls2e ws4d"> <span class="_ _3"></span><span
                        class="lsf ws13">de<span class="ls8 ws4d"> <span class="ls42 ws16">Re<span class="_ _1"></span>cib<span class="_ _3"></span>o<span class="ls2e ws4d"> <span
                        class="_ _0"></span><span class="lsf ws13">de<span class="_ _0"></span><span class="ls8 ws4d"> <span class="ls3b wsf">Consig<span class="_ _2"></span>nación<span
                        class="_ _2"></span></span><span class="ls2e"> <span class="ls28 ws17">Ba<span class="_ _3"></span>ncaria,<span class="_ _0"></span><span class="ls2e ws4d"> <span class="lsf ws13">dond<span
                        class="_ _3"></span>e<span class="ls2e ws4d"> <span class="ls3d">el<span class="_ _2"></span> s<span class="_ _2"></span>el<span class="_ _2"></span>lo</span> </span>del<span
                        class="ls25 ws4d"> <span class="ls40 ws14">Banc<span class="_ _2"></span>o</span><span class="ls2e"> <span class="ls3c ws10">sea</span> <span class="_ _3"></span><span
                        class="ls3f ws1a">legib<span class="_ _3"></span>le,<span class="_ _0"></span><span class="ls2e ws4d"> a<span class="_ _2"></span> <span class="_ _0"></span><span
                        class="ls3f ws1a">la<span
                        class="ls2e ws4d"> </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                </div>
                <div class="t m3 x2c h10 y70 ff4 fs3 fc0 sc0 ls5f ws4d">siguiente <span class="ls3d ws11">di<span class="_ _2"></span>r<span class="_ _2"></span>ecc<span class="_ _2"></span>ió<span
                        class="_ _2"></span>n<span class="_ _2"></span>:</span><span class="ls8"> <span class="ls68">Of<span class="_ _1"></span>icina T<span class="_ _3"></span>err<span
                        class="_ _0"></span>i<span class="_ _2"></span>t<span class="_ _3"></span>oria<span class="_ _3"></span>l<span class="ls9"> <span class="lsf ws13">del</span><span
                        class="lsa"> <span class="ls48 ws1e">ME<span class="_ _3"></span>TA,<span class="_ _3"></span><span class="ls9 ws4d"> <span class="ls3b">Carr<span class="_ _2"></span>e<span
                        class="_ _0"></span>ra<span class="_ _2"></span> 44C<span class="_ _2"></span><span class="ls2e"> <span class="ls42 ws16">No.<span class="_ _1"></span><span class="ls9 ws4d"> <span
                        class="lsf ws13">33B</span><span class="ls2e"> -<span class="_ _2"></span> <span class="ls3d">24<span class="_ _2"></span> U<span class="_ _2"></span>r<span class="_ _2"></span>ban<span
                        class="_ _2"></span>i<span class="_ _2"></span>zac<span class="_ _2"></span>ión<span class="_ _2"></span> <span class="_ _2"></span>Los<span class="_ _2"></span><span class="ls8"> <span
                        class="ls40 ws14">Pi<span class="_ _2"></span>nos<span class="_ _2"></span>,</span><span class="ls26"> <span class="ls28 ws17">Barz<span class="_ _0"></span>a<span
                        class="_ _0"></span>l<span class="_ _2"></span><span class="ls2e ws4d"> <span class="ls40 ws14">Al<span class="_ _2"></span>to,<span class="_ _2"></span></span><span
                        class="ls8"> <span class="ls28">Sede<span class="_ _3"></span> Prin<span class="_ _3"></span>cipal,<span class="_ _1"></span><span class="ls26"> <span class="ls40">Vi<span
                        class="_ _2"></span>l<span class="_ _2"></span>lav<span class="_ _2"></span>ic<span class="_ _2"></span>e<span class="_ _2"></span>nci<span class="_ _2"></span>o <span
                        class="ls2e">– <span class="_ _2"></span><span class="ls48 ws1e">Met<span class="_ _1"></span>a</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>
                </div>
                <div class="t m0 x57 h10 y70 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                <div class="t m3 x2c h10 y71 ff4 fs3 fc0 sc0 ls3b ws4d">Dirección<span class="_ _0"></span> E<span class="_ _0"></span>lec<span class="_ _2"></span>t<span class="_ _3"></span>r<span
                        class="_ _2"></span>ón<span class="_ _0"></span>ica<span class="_ _2"></span>:<span class="_ _3"></span><span class="ls8"> <span class="ls41 ws15">In<span
                        class="_ _2"></span>f<span class="_ _3"></span>o<span class="_ _2"></span>@corm<span class="_ _2"></span>acare<span class="_ _2"></span>n<span class="_ _0"></span>a.g<span
                        class="_ _2"></span>o<span class="_ _0"></span>v<span class="_ _2"></span>.<span class="_ _3"></span>c<span class="_ _2"></span>o<span class="ls27 ws4d"> <span class="ls28 ws17">PBX</span><span
                        class="ls8"> <span class="ls3d ws11">67<span class="_ _2"></span>3</span> <span class="lsf">042<span class="_ _3"></span>0 <span class="ls2e">- </span><span class="ws13">673<span
                        class="_ _0"></span><span class="ls9 ws4d"> <span class="ls3d ws11">04<span class="_ _2"></span>17</span><span class="ls8"> - <span class="lsf">67<span class="_ _0"></span>3 0<span
                        class="_ _0"></span>417<span class="_ _0"></span><span class="ls8"> <span class="ls40 ws14">Ex<span class="_ _2"></span>t.</span> <span class="lsf ws13">105</span> <span
                        class="ls3d ws11">Líne<span class="_ _2"></span>a</span> <span class="ls68">Gra<span class="_ _0"></span>tu<span class="_ _3"></span>ita: <span class="_ _3"></span>01<span
                        class="ls2e ws46">-<span class="lsf ws13">8000<span class="ls29">-<span class="ls3d ws11">117<span class="_ _2"></span>1<span
                        class="_ _2"></span>77</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></div>
                <div class="t m0 x58 h10 y71 ff4 fs3 fc0 sc0 ls2e ws4d"></div>
                <div class="t m0 x59 he y72 ff3 fs5 fc0 sc0 ls69 ws47">Evit<span class="_ _2"></span>e<span class="ls2e ws4d"> <span class="_ _0"></span><span class="ls2b ws48">el<span class="ls2e ws4d"> <span
                        class="_ _3"></span><span class="ls6a ws49">inic<span class="_ _2"></span>io<span class="ls2a ws4d"> <span class="ls5b ws36">de</span> <span class="ls5b ws36">proc<span
                        class="_ _2"></span>es<span class="_ _2"></span>os</span><span class="ls2e"> <span class="ls6b ws4a">ju<span class="_ _0"></span>r<span class="_ _0"></span>íd<span
                        class="_ _3"></span>icos<span class="ls2a ws4d"> <span class="ls2b ws48">pa<span class="_ _3"></span>gando<span class="ls2e ws4d"> <span class="_ _0"></span><span
                        class="ls2b ws48">opor<span class="_ _3"></span>t<span class="_ _2"></span>una<span class="_ _3"></span>m<span class="_ _2"></span>en<span class="_ _0"></span>te<span
                        class="ls2e ws4d"> </span>di<span class="_ _3"></span>cha<span class="ls2e ws4d"> </span>ob<span class="_ _3"></span>ligación<span
                        class="ls2e ws4d"> </span></span></span></span></span></span></span></span></span></span></span></span></div>
                <div class="t m0 x8 h1f y73 ff3 fs9 fc0 sc0 ls2e ws4d"></div>
                <div class="t m0 x8 h20 y74 ff3 fs2 fc0 sc0 ls2e ws4d"></div>
                <div class="t m1 x49 h8 y75 ff1 fs3 fc0 sc0 ls21 ws8">AND<span class="_ _2"></span>RE<span class="_ _2"></span>S<span class="ls11 ws4d"> <span class="ls39 wsd">FE<span class="_ _1"></span>LIPE<span
                        class="_ _1"></span><span class="ls11 ws4d"> <span class="ls6c">GAR<span class="_ _3"></span>CI<span class="_ _3"></span>A<span class="_ _3"></span> C<span
                        class="_ _0"></span>E<span class="_ _0"></span>S<span class="_ _0"></span>PE<span class="_ _1"></span>DE<span class="_ _3"></span>S</span></span></span></span></div>
                <div class="t m0 x5a h8 y75 ff1 fs3 fc0 sc0 ls2e ws4d"></div>
                <div class="t m3 x2b h10 y76 ff4 fs3 fc0 sc0 ls3b wsf">DIR<span class="_ _2"></span>ECTOR<span class="_ _2"></span><span class="ls8 ws4d"> <span class="ls68 ws4b">GENE<span
                        class="_ _0"></span>RAL</span></span></div>
                <div class="t m0 x5b h21 y76 ff4 fs3 fc0 sc0 ls2c ws4d"><span class="fsa ls2e v1"> </span></div>
                <div class="t ma x5c h22 y77 ff4 fs0 fc0 sc0 ls6d ws4c">(415)77<span class="_ _0"></span>09998<span class="_ _3"></span>443433(802<span class="_ _3"></span>0)0000000<span
                        class="_ _3"></span>0000000604<span class="_ _3"></span>1(3900)000<span class="_ _3"></span>0171015(96<span class="_ _3"></span>)2023<span class="_ _0"></span>0913
                </div>
                <div class="t m0 x5d h22 y77 ff4 fs0 fc0 sc0 ls2e ws4d"></div>
            </div>
            <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
        </div>
    </div>
    <div class="loading-indicator">
        <img alt=""
             src="data:image/png;base64,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"/>
    </div>
    </body>
    </html>
     `;


    const handle_close = (): void => {
        set_is_modal_active(false);
    };



    const encodedHtml = encodeURIComponent(htmlContent);
    const dataUri = 'data:text/html;charset=utf-8,' + encodedHtml;



    const cargarLiquidacion = async (setLiquidacion: React.Dispatch<React.SetStateAction<LiquidacionResponse | null>>) => {
        // try {
        //     const response = await api.get<LiquidacionResponse>(`/recaudo/liquidaciones/liquidacion-pdf_miguel/${id_liquidacion_pdf}/`);

        //     setLiquidacion(response.data);
        //     console.log("Datos de liquidación cargados con éxito");
        // } catch (error: any) {
        //     console.error('Error al cargar los datos de liquidación', error);
        //     // Aquí puedes manejar los errores, por ejemplo, mostrando una alerta
        // }
    };
    useEffect(() => {
        cargarLiquidacion(setLiquidacion);
    }, [id_liquidacion_pdf]);


    return (
        <>

            <Dialog open={is_modal_active} onClose={handle_close}
                //  maxWidth="xl"  
                sx={{
                    '& .MuiDialog-paper': { // Esta clase se aplica al papel de diálogo
                        width: '100%', // Ancho del diálogo
                        maxWidth: 'xl', // Máximo ancho
                        height: '100%', // Altura del diálogo

                        maxHeight: 'xl',
                    },
                }}
            >


                <Grid container
                    item xs={12} marginLeft={2} marginRight={2} marginTop={3}
                    sx={{

                        // width: '3000px', // Cambia '700px' por el ancho que desees
                        // height: '3000px', // Cambia '500px' por el alto que desees
                        position: 'relative',
                        background: '#FAFAFA',
                        borderRadius: '15px',
                        p: '20px', m: '10px 0 20px 0', mb: '20px',
                        boxShadow: '0px 3px 6px #042F4A26',
                    }}
                >
                    <Grid container item xs={12} spacing={2} marginTop={2}>

                    {form_liquidacion.id_expediente}
                        <Grid item xs={12} sm={4}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>Expediente</InputLabel>
                                <Select
                                    label='Expediente'
                                    name="id_expediente"
                                    value={form_liquidacion.id_expediente}
                                    MenuProps={{
                                        style: {
                                            maxHeight: 224,
                                        }
                                    }}
                                    onChange={handle_select_form_liquidacion_change}
                                >
                                    {expedientes_deudor
                                        // .filter((expediente: any) => expediente.estado === 'guardado') // Filtra por "estado_expediente" igual a "guardado"
                                        .map((expediente: any) => (
                                            <MenuItem key={expediente.id} value={expediente.id}>
                                                {expediente.cod_expediente}
                                            </MenuItem>
                                        ))}
                                </Select>
                                <FormHelperText>Seleccione el expediente</FormHelperText>
                            </FormControl>
                        </Grid>


                        {/* <Grid item >
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                startIcon={<PrintIcon />}
                                href={`${api.defaults.baseURL}recaudo/liquidaciones/liquidacion-pdf/${id_liquidacion_pdf}/`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Imprimir recibo
                            </Button>
                        </Grid> */}




                        {/* {form_liquidacion.id_expediente && ( */}
                        <Grid item xs={12} sm={12} marginTop={-33}>
                            <embed src={dataUri} type="text/html"
                                width="100%" height="100%"
                            />
                        </Grid>
                        {/* )} */}

                    </Grid>

                </Grid>


            </Dialog>

           


        </>
    );
};