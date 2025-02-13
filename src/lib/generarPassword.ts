//import bcrypt from "bcrypt";

export function generarPassword(longitud = 8) {
  const caracteres: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&()_";
  const valoresAleatorios = new Uint32Array(longitud);
  crypto.getRandomValues(valoresAleatorios);

  let password = "";
  for (let i = 0; i < longitud; i++) {
    password += caracteres[valoresAleatorios[i]! % caracteres.length];
  }

  // password = await bcrypt.hash(password, 10);

  return password;
}
