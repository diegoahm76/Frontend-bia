/* eslint-disable @typescript-eslint/naming-convention */
import dayjs from 'dayjs';


function remicion_viso(expediente_2: any, Fecha_2: any ,opcionSiNo2:any ) {
    return `  
                                                   Expediente No ${expediente_2 ? expediente_2 : '__________'} 
        
        En aplicación del artículo 69 CPACA, comedidamente remitimos NOTIFICACIÓN POR AVISO del Auto  (X) de fecha ${Fecha_2 ? Fecha_2 : '__________'}, expedido por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL, anexando a la presente copia informal de un ejemplar de la actuación administrativa, dejando expresa constancia que contra él ${opcionSiNo2 ? opcionSiNo2 : '__________'} procede recurso de reposición dentro de los diez   (--) días siguientes a la fecha de surtida la presente notificación.
        
        La presente notificación se considerará surtida al finalizar el día siguiente al de la entrega del aviso en el lugar de destino. 
        
        Se informa al usuario que cualquier solicitud, petición o descargos, puede ser enviada al correo de la Corporación: info@cormacarena.gov.co.
         
    `};

function constancia_publicacion(Fecha_3: any, Fecha_acto_3: any, expediente_3: any, fijacion_3: any, des_fijacion_3: any, cc_3: any, nombre_3: any, empresa_3: any, nombre_enpresa_3: any, nombre_nit_3: any,) {

    let mensajeEmpresa = empresa_3 ? `señor(a)   ${nombre_3 ? nombre_3 : '__________'}  , identificado (a) con cédula de ciudadanía ${cc_3 ? cc_3 : '__________'} ` : `empresa ${nombre_nit_3 ? nombre_nit_3 : '__________'}   ,   NIT   No. ${nombre_enpresa_3 ? nombre_enpresa_3 : '__________'}`;

    return `

        En Villavicencio, el día  ${Fecha_3 ? Fecha_3 : '__________'}   se procede a realizar citación a ${mensajeEmpresa}, para que en término de cinco (5) días siguientes a la fijación de la presente, comparezca a la Corporación para el Desarrollo Sostenible del Área Especial de la Macarena “CORMACARENA” para diligencia de Notificación personal de:

        Auto (X) o Resolución ( )  
        Fecha del acto administrativo  ${Fecha_acto_3 ? Fecha_acto_3 : '__________'} 
        Emitido (a) por SUBDIRECCION DE AUTORIDAD AMBIENTAL
        
        CONSTANCIA DE FIJACIÓN. ${fijacion_3 ? fijacion_3 : '__________'} 
          
        CONSTANCIA DE DESFIJACIÓN:  ${des_fijacion_3 ? des_fijacion_3 : '__________'} 
        
        Transcurrido dicho término sin realizarse notificación personal de la actuación, se procederá a la Notificación por aviso, en los términos del artículo 69 del CPACA. 
        `};

function plantila_4(Fecha_4: any, nombre_4: any, cc_4: any, constancia_4: any, constancia_des_4: any,opcionSiNo:any, dias_4:any) {
    return `
    
     En Villavicencio, el día ${Fecha_4 ? Fecha_4 : '__________'}  se procede a realizar la Notificación por Aviso al señor(a)  ${nombre_4 ? nombre_4 : '__________'} ,  identificado (a) con cédula de ciudadanía ${cc_4 ? cc_4 : '__________'}  
 
        Dejando  expresa  constancia  que  contra él ${opcionSiNo ? opcionSiNo : '__________'} procede recurso de reposición, dentro de los (${dias_4 ? dias_4 : '__________'}) días siguientes a la fecha de surtida la presente notificación, el cual lo podrá interponer ante 
            
        CONSTANCIA DE FIJACIÓN.${constancia_4 ? constancia_4 : '__________'}, se fija el presente  aviso en la página web de la Corporación y/o en un lugar de acceso al público.
            
        CONSTANCIA DE DESFIJACIÓN:${constancia_des_4 ? constancia_des_4 : '__________'}, se desfija el presente  aviso, después de haber permanecido por el término de cinco (05) días legales.
                
        Se advierte que la notificación se entiende surtida al finalizar el día siguiente de la desfijación del presente Aviso, es decir, se encuentra NOTIFICADO el día  ${dayjs().format('DD/MM/YYYY')}     conforme a lo establecido en el artículo 69 de la Ley 1437 de 2011.
       
            `};  



function constancia_publicaci5(email: any) {
    return `
                
                En Villavicencio, el día 17, del mes OCTUBRE, del año 2023, siendo las 09:30   AM (X) PM ( ) se procede a hacer notificación personal al señor(a) (X) empresa  ( ) JOSE ALEXANDER GONZALES MORILLO, identificado (a) con cédula de ciudadanía (X) o   NIT ( ) No.  13.553.983 de: VENEZUELA 

                Auto (X) o Resolución ( ) 
                No. PS-GJ. 1.2.64.23.1995 
                Fecha del acto administrativo 07 / JUNIO / 2023  
                Expediente No 3.11.022.715 
                Emitido (a) por SUBDIRECCIÓN DE AUTORIDAD AMBIENTAL. 
                
                Dejando  expresa  constancia  que  se  hace  entrega al interesado (a)  de una copia íntegra, auténtica y gratuita de la actuación administrativa, y que contra el acto procede SI ( ) o NO (X) recurso de reposición que deberá interponerse por escrito dentro de la presente diligencia, o dentro de los (-) días siguientes a esta notificación, el cual lo podrá interponer ante el ---.
                
                Para constancia se firma: 
                
                
                
                
                __________________________________          
                EL NOTIFICADOR                                             
                
                
                
                
                ___________________________________
                EL NOTIFICADO
                
                
                OBSERVACIONES: 
                `};


function citacion(opcion_6: any,numero_6:any ) {
    return `      
            REF.: CITACIÓN PARA DILIGENCIA DE NOTIFICACIÓN PERSONAL
                     
             En aplicación el ${opcion_6 ? opcion_6 : '__________'}, comedidamente lo citamos para que en el término de cinco (5) días, contados a partir de la fecha del recibo de esta citación, comparezca a la Corporación para el Desarrollo Sostenible del Área Especial de la Macarena “CORMACARENA” – Sede Barzal, para realizar diligencia de Notificación personal del la Resolución   Nº ${numero_6 ? numero_6 : '__________'}  
                    
            Se advierte que transcurrido dicho término sin realizarse notificación personal de la actuación, se procederá en fijación de Edicto (  ) o Notificación por aviso (X), en los términos del artículo 45 del CCA y artículo 69 del CPACA, respectivamente.
            
            A su vez, solicitamos nos informe si autoriza recibir notificaciones y comunicaciones vía correo electrónico, en caso de ser afirmativo, por favor nos remita la dirección electrónica autorizada al correo notificaciones@cormacarena.gov.co, no obstante lo anterior, excepcionalmente podrá solicitar turno de lunes a viernes en el horario 8:00 a.m. a 12:00 m y 2:00 p.m. a 6:00 p.m. al celular 314 295 9086 , para asistir personalmente a la Entidad.
                    
            En caso de no autorizar la notificación electrónica, debe esperar a que se surta la notificación por aviso, para lo cual la Corporación le remitirá una copia del acto administrativo a su domicilio.
                    
                  
                    `};
function documento8(Fecha_8: any,empresa_8:any,nit_8:any,opcion_8:any,dias_8:any,Fecha_8remi:any) {
    return `                         
En Villavicencio,${Fecha_8 ? Fecha_8 : '__________'} se procede a realizar la Notificación por Aviso al empresa ${empresa_8 ? empresa_8 : '__________'}  ,  identificado (a) cono NIT  No ${nit_8 ? nit_8 : '__________'}
 
                        
Dejando  expresa  constancia  que  contra él ${opcion_8 ? opcion_8 : '__________'}  procede recurso de reposición, dentro de los (${dias_8 ? dias_8 : '__________'}) días siguientes a la fecha de surtida la presente notificación, el cual lo podrá interponer ante SUBDIRECCIÓN DE GESTIÓN AMBIENTAL.
                        
La remisión por aviso se allegó a la dirección que se encuentra en el expediente el del ${Fecha_8remi ? Fecha_8remi : '__________'}, teniendo en cuenta que dicha dirección no se reportó como incompleta, errada, inexistente, entre otras, y que no se presentó en el término establecido para notificación personal o no da acuse de recibido para la notificación por correo electrónico por lo que se entiende NOTIFICADO el ${dayjs().format('DD/MM/YYYY')} conforme a lo establecido en el artículo 69 de la Ley 1437 de 2011.
                       
                        `};




export {
    remicion_viso,
    constancia_publicacion,
    plantila_4,
    constancia_publicaci5,
    citacion,
    documento8

};



