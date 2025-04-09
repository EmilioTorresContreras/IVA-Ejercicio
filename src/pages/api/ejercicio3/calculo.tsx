
import { consulta } from './consulta'; // Importamos la función de consulta

type RequestData = {
  id: number;
  nombre_cliente: string;
  subtotal: number;
  iva: number;
  total: number;
};

type ResponseBody = {
  statusCode: number;
  id: number;
  name: string;
  price: number;
  price_iva: number;
  total_price: number;
};

// Esta función se encarga de calcular, es decir, calcular el IVA y total con los datos obtenidos.
export async function calcular(id: number) {
  // Paso 1: Consultar los datos
  const datos = await consulta(id);

  if (!datos) {
    // Si no se encuentran los datos, retornamos un error
    return {
      statusCode: 404,
      body: 'Datos no encontrados',
    };
  }

  // Paso 2: Calcular IVA y total
  const price_iva = datos.subtotal * 0.16;
  const total_price = datos.subtotal + price_iva;

  // Paso 3: Retornar los datos validados con el cálculo
  return {
    statusCode: 200,
    id: datos.id,
    name: datos.nombre_cliente,
    price: datos.subtotal,
    price_iva,
    total_price,
  };
}
