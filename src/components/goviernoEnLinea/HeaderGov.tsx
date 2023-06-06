// eslint-disable-next-line @typescript-eslint/naming-convention
export const HeaderGov = (): JSX.Element => {
  return (
    <>
      <nav

        style={{
          zIndex: 1000,
        }}
        className="navbar navbar-expand-lg barra-superior-govco"
        aria-label="Barra superior"
      >
        <a
          href="https://www.gov.co/"
          target="_blank"
          aria-label="Portal del Estado Colombiano - GOV.CO"
          rel="noreferrer"
        ></a>
        {/* <button
          className="idioma-icon-barra-superior-govco float-right"
          aria-label="Button to change the language of the page to English"
        ></button> */}
      </nav>
    </>
  );
};
