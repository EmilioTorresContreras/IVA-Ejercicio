import type { NextApiRequest, NextApiResponse } from 'next';

const SUPABASE_URL = 'https://comjgqdqngwokxaixxks.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbWpncWRxbmd3b2t4YWl4eGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjQ4MTMsImV4cCI6MjA1OTIwMDgxM30.OUwDvRXdwo2V43qToZvqXY4WdvBb7EcUrz26_KRR6Yc';

type Factura = {
  id: number;
  nombre_cliente: string;
  subtotal: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id ?? '9';

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };

  const url = `${SUPABASE_URL}/rest/v1/facturas?id=eq.${userId}`;

  try {
    const respuesta = await fetch(url, { headers });
    const data: Factura[] = await respuesta.json();

    if (respuesta.status === 200 && data.length > 0) {

      // Llamar a la siguiente API (validar)
      const validar = await fetch('http://localhost:3000/api/ejercicio2/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await validar.json();
      res.status(200).json(result);



    } else {
      res.status(respuesta.status).json({
        statusCode: respuesta.status,
        body: JSON.stringify({ error: 'No se encontró factura' }),
      });
    }
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    });
  }
}
