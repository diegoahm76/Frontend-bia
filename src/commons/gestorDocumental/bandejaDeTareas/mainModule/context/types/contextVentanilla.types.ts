export interface PanelVentanillaContextProps {
  radicado: string;
  setRadicado: React.Dispatch<React.SetStateAction<string>>;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
  expanded: string | boolean;
  setExpanded: React.Dispatch<React.SetStateAction<string | boolean>>;
  anexos: any;
  setAnexos: React.Dispatch<React.SetStateAction<any>>;
  archivoAnexos: any;
  setArchivoAnexos: React.Dispatch<React.SetStateAction<any>>;
  metadatos: any;
  setMetadatos: React.Dispatch<React.SetStateAction<any>>;
  skipped: Set<number>;
  setSkipped: React.Dispatch<React.SetStateAction<Set<number>>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
