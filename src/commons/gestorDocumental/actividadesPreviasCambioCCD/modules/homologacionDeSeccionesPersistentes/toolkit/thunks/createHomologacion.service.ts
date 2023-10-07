/* eslint-disable @typescript-eslint/naming-convention */
export const postPersistenciasConfirmadas = async ({
  setLoading,
  dataToPost,
}: {
  setLoading: Function;
  dataToPost: any;
}): Promise<any> => {
  try {
    setLoading(true);
    console.log(dataToPost);
    /* const url = 'gestor/ccd/persistencia-confirmada-ccd/create/'
    const response = await api.post(url, dataToPost)

    console.log() */
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
