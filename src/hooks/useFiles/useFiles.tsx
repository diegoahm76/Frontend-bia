/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { showAlert } from '../../utils/showAlert/ShowAlert';
import { control_success } from '../../helpers';

interface FileItem {
  nombre: string;
  [key: string]: any;
}

interface AuthState {
  tamagno_archivos?: FileItem[];
  [key: string]: any;
}

interface AppState {
  auth: AuthState;
  [key: string]: any;
}

export const useFiles = () => {
  const { tamagno_archivos } = useAppSelector((state: AppState) => state.auth);
  const [fileDocs, setFileDocs] = useState<any[]>([]);

  useEffect(() => {
    if (!Array.isArray(tamagno_archivos)) {
      throw new Error('tamagno_archivos must be an array');
    }
    const newSize = tamagno_archivos.map((item: FileItem) => {
      if (typeof item.nombre !== 'string') {
        throw new Error(
          'Each item in tamagno_archivos must have a string property named "nombre"'
        );
      }
      return {
        ...item,
        tamagno_max_mb: item.tamagno_max_mb,
        nombre: item.nombre.toLowerCase(),
      };
    });
    setFileDocs(newSize);
  }, [tamagno_archivos]);

  const controlar_tamagno_archivos = (file: any, _onChange: any) => {
    const allowedExtensions = fileDocs.map((item: FileItem) => item.nombre);

    // Extract the file extension from the file name
    const fileExtension = file.name.split('.').pop();

    if (!allowedExtensions.includes(fileExtension)) {
      showAlert(
        'Opps..',
        `El archivo de nombre '${
          file.name
        }', con extensión '${fileExtension}' no está permitido.
        Solo se permiten las siguientes extensiones de  archivos: ${allowedExtensions.join(
          ', '
        )}`,
        'warning'
      );
      return false; // return false if file is not allowed extension
    }
    const tamagno = fileDocs.find(
      (item: FileItem) => fileExtension === item.nombre
    );

    if (tamagno) {
      const tamagno_max_mb = tamagno.tamagno_max_mb;
      const tamagno_max_bytes = tamagno_max_mb * 1024 * 1024;
      if (file.size > tamagno_max_bytes) {
        const fileSizeInMB = (file.size / 1024 / 1024).toFixed(2);

        showAlert(
          'Opps..',
          `El archivo '${file.name}' de tamaño ${fileSizeInMB} MB supera el tamaño máximo permitido de ${tamagno_max_mb} MB para este tipo de archivos.`,
          'warning'
        );
        return false; // return false if the file size exceeds the maximum allowed size
      } else {
        control_success(
          `El archivo con nombre: '${file.name}' es válido y se ha adjuntado correctamente.`
        );
        _onChange(file);
        return true;
      }
    }
  };


  return {
    tamagno_archivos: fileDocs,
    controlar_tamagno_archivos,
  };
};
