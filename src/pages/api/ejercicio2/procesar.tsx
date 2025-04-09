import { NextApiRequest, NextApiResponse } from 'next';

const SUPABASE_URL = "https://comjgqdqngwokxaixxks.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbWpncWRxbmd3b2t4YWl4eGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjQ4MTMsImV4cCI6MjA1OTIwMDgxM30.OUwDvRXdwo2V43qToZvqXY4WdvBb7EcUrz26_KRR6Yc";

type RequestBody = {
  id: number;
  name: string;
  price: number;
  price_iva: number;
  total_price: number;
};

type ResponseBody = {
  statusCode: number;
  body: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  const { id, name, price, price_iva, total_price }: RequestBody = req.body;
  console.log('Request Body(3):', req.body)

  // Crear el objeto con los datos a actualizar
  const data_update = {
    nombre_cliente: name,
    subtotal: price,
    iva: price_iva,
    total: total_price,
  };

  const headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation",
  };

  const url = `${SUPABASE_URL}/rest/v1/facturas?id=eq.${id}`;

  try {
    // Enviar la solicitud PATCH a Supabase para actualizar la factura
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data_update),
    });
    console.log('Response', response);


    const responseData = await response.json();
    console.log(responseData);

    // Verificar si la respuesta es exitosa
    if (response.status === 204) {
      return res.status(204).json({
        statusCode: 204,
        body: "Actualización exitosa, pero sin contenido en la respuesta.",
      });
    }

    // Verificar si el contenido de la respuesta es un JSON válido
    if (!response.ok) {
      return res.status(response.status).json({
        statusCode: response.status,
        body: `Error: ${responseData}`,
      });
    }

    // Mensaje de éxito
    const salida = `Hola ${name}, el monto original es ${price}, con un IVA de ${price_iva}, dando un total de ${total_price}.`;

    console.log(salida);

    return res.status(200).json({
      statusCode: 200,
      body: responseData,
    });
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
    return res.status(500).json({
      statusCode: 500,
      body: "Error en el servidor al procesar la solicitud.",
    });
  }
}
