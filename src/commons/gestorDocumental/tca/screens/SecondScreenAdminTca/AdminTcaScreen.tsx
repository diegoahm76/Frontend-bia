/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useContext } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

//* icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  columsCatalogoTCA
  // rowsCatalogoTCA
} from '../utils/columnasCatalogos/CatalogoTCA/CatalogoTCA';
import {
  columsCatalogoTRD
  // rowsCatalogoTRD
} from '../utils/columnasCatalogos/CatalogoTRD/CatalogoTRD';

//* components
import { CatalogoTRDAdministracionScreen } from '../../components/SecondScreenComponentsAdminTca/CatalogoTRDAdministracionScreen/CatalogoTRDAdministracionScreen';
import { CatalogoTCAAdministracionScreen } from '../../components/SecondScreenComponentsAdminTca/CatalogoTCAAdministracionScreen/CatalogoTCAAdministracionScreen';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { ModalContextTCA } from '../../context/ModalContextTca';
import { ItemSeleccionadoCatalogo } from '../../components/SecondScreenComponentsAdminTca/AdministracionTCA/ItemSeleccionadoCatalago/ItemSeleccionadoCatalogo';
import { set_selected_item_from_catalogo_action } from '../../toolkit/TCAResources/slice/TcaSlice';
import { FormularioAdministracionTCA } from '../../components/SecondScreenComponentsAdminTca/AdministracionTCA/FormularioAdministracionTCA/FomularioAdministracionTCA';

export const AdminTcaScreen: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* REDUX ELEMENTS

  const { catalog_trd, catalog_TCA, tca_current } = useAppSelector(

    (state) => state.tca_slice
  );

  //* MODAL CONTEXT ELEMENTS

  const {
    modalAdministracionTca,
    // openModalAdministracionTca,

    closeModalAdministracionTca,
    modalTrdRelacionTcaActual,
    openModalTrdRelacionTcaActual,
    closeModalTrdRelacionTcaActual,

  } = useContext(ModalContextTCA);

  return (
    <>
      <Grid
        item
        sx={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ m: '20px 0' }}
        >
          {/* buttons start */}
          <Link to="/app/gestor_documental/tca/">
            <Button
              color="success"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                dispatch(set_selected_item_from_catalogo_action(null));
                closeModalAdministracionTca();
              }}
            >
              REGRESAR A TCA
            </Button>
          </Link>
        </Stack>
        {/* parte 2. catalogo TRD Administracion screen */}

        {/* poner la condicional de la longitud del array para que tenga un mejor manejo visual */}

        {/* fin parte 3 */}

        {tca_current?.actual ? null : (
          <CatalogoTRDAdministracionScreen
            rows={
              (catalog_TCA.length > 0 &&
                catalog_trd?.filter((item: any) => {
                  if (catalog_TCA.length === 0) {
                    //  console.log('')('catalog_TCA.length === 0');
                    return true;

                  }
                  return !catalog_TCA?.some(
                    (otherItem: any) =>
                      otherItem.id_cat_serie_und_ccd_trd ===
                      item.id_catserie_unidadorg
                  );
                })) ||
              catalog_trd
            }
            columns={columsCatalogoTRD}
            title="Catálogo TRD - ( Administración TCA )"
          />
        )}

        {tca_current?.actual &&
        catalog_trd.filter(
          (item: any) =>
            !catalog_TCA?.some(
              (otherItem: any) =>
                otherItem.id_cat_serie_und_ccd_trd ===
                item.id_catserie_unidadorg
            )
        ).length > 0 &&
        !modalTrdRelacionTcaActual ? (
          <CatalogoTRDAdministracionScreen
            rows={[]}
            columns={[]}
            title="Catálogo TRD - ( Administración TCA )"
            aditionalElement={
              <Button
                sx={{
                  marginTop: '1rem'
                }}
                variant="contained"
                color="warning"
                onClick={() => {
                  // setButton(true);
                  openModalTrdRelacionTcaActual();
                  //  console.log('')('agregar nueva relacion trd');
                }}
              >
                AGREGAR NUEVA RELACION TRD
              </Button>
            }
          />
        ) : null}
        
              {modalTrdRelacionTcaActual &&
              tca_current?.actual &&
              catalog_trd.filter(
                (item: any) =>
                  !catalog_TCA?.some(
                    (otherItem: any) =>
                      otherItem.id_cat_serie_und_ccd_trd ===
                      item.id_catserie_unidadorg
                  )
              ).length > 0 ? (

                <CatalogoTRDAdministracionScreen
                rows={
                  (catalog_TCA?.length > 0 &&
                    catalog_trd?.filter((item: any) => {
                      if (catalog_TCA.length === 0) {
                        //  console.log('')('catalog_TCA.length === 0');
                        return true;
                      }
                      return !catalog_TCA?.some(
                        (otherItem: any) =>
                          otherItem.id_cat_serie_und_ccd_trd ===
                          item.id_catserie_unidadorg
                      );
                    })) ||
                  catalog_trd
                }
                columns={columsCatalogoTRD}
                title="Catálogo TRD - ( Administración TCA )"
                aditionalElement={
                  <Button
                  sx={{
                    marginTop: '1rem'
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    closeModalTrdRelacionTcaActual();
                    //  console.log('')('agregar nueva relacion trd');
                  }}
                >
                  CANCELAR AGREGAR NUEVA RELACION TRD
                </Button>
                }
              />
              ) : null}

        {/* fin parte 2 */}
        {/* parte 3. catalogo TCA Administracion Screen */}

        {/* poner la condicional de la longitud del array para que tenga un mejor manejo visual */}

        <CatalogoTCAAdministracionScreen
          rows={catalog_TCA}
          columns={columsCatalogoTCA}
          title="Catálogo TCA - ( Administración TCA )"
        />


        {/* poner la condicional de administración de TCA */}

        {modalAdministracionTca ? (
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26'
            }}
          >
            {/* item seleccionado del catalogo TRD o TCA */}
            <ItemSeleccionadoCatalogo />
            <FormularioAdministracionTCA />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};
