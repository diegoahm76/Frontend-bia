// Valida el que el password cumpla con los requerimientos
// Minimo 6 caracteres
// 1 Mayuscula
// 1 Numero
// 1 Caracter extrano

export const validate_password = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (regex.test(password) && password.length >= 8) {
    return true;
  } else {
    return false;
  }
};
