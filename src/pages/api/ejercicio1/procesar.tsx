import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Recibimos los datos que fueron enviados desde la API anterior
  const { name, price, price_iva, total_price } = req.body;
  console.log('Request Body:', req.body);

  // Crear un mensaje con toda la información que hemos recibido
  const mensaje = `Hola ${name}, el monto original es ${price}, con un IVA de ${price_iva}, dando un total de ${total_price}.`;

  // Enviar el mensaje como respuesta en formato JSON
  res.status(200).json({
    statusCode: 200,
    message: mensaje,
  });
}
