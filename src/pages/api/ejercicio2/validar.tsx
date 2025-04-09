import { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
    const { nombre_cliente: name = 'Usuario', subtotal: price = 0, id }: RequestBody = req.body[0];


    console.log('Request Body(1):', req.body) 
    console.log(name)// Log para verificar el cuerpo de la solicitud
    // Calcular el IVA
    const price_iva = price * 0.16;
    const total_price = price + price_iva

    // Crear la respuesta con los datos calculados
    const response: ResponseBody = {
        statusCode: 200,
        id,
        name,
        price,
        price_iva,
        total_price
    };
    console.log('Response Body(2):', response)

    // Llamar a la siguiente API (procesar) que procesará los datos y retornará un mensaje
    const procesar = await fetch('http://localhost:3000/api/ejercicio2/procesar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response),
    });

    // Obtener la respuesta de la API procesar
    const result = await procesar.json();

    // Enviar la respuesta obtenida de procesar como resultado final
    res.status(200).json(result);
}
