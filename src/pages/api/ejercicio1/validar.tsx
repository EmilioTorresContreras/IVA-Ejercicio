import { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
    name?: string;
    price?: number;
    id: number;
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
    const { name = 'Usuario', price = 0, id }: RequestBody = req.body;
    console.log('Request Body:', req.body); // Log para verificar el cuerpo de la solicitud
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

    // Llamar a la siguiente API (procesar) que procesará los datos y retornará un mensaje
    const procesar = await fetch('http://localhost:3000/api/ejercicio1/procesar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response),
    });

    // Obtener la respuesta de la API procesar
    const result = await procesar.json();

    // Enviar la respuesta obtenida de procesar como resultado final
    res.status(200).json(result);
}
