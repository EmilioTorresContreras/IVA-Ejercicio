import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils';
import { calcular } from './calculo'; // Importamos la función de validación

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body; // Tomamos el ID de la solicitud

  // Paso 1: Llamamos a la función de validación, que realiza la consulta y los cálculos
  const result = await calcular(id);
  console.log(result)

  if (result.statusCode !== 200) {
    // Si ocurre algún error, retornamos la respuesta de error
    return res.status(result.statusCode).json({ error: result.body });
  }

  // Paso 2: Retornamos la respuesta procesada
  res.status(result.statusCode).json({
    id: result.id,
    name: result.name,
    price: result.price,
    price_iva: result.price_iva,
    total_price: result.total_price,
  });
}
