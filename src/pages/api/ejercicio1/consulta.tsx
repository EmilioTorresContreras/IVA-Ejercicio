import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    const data = { id: 9, name: 'Emilio', price: 100 }; // Datos de ejemplo

    // Llamar a la siguiente API (validar)
    // Se puede llamar
    const validar = await fetch('http://localhost:3000/api/ejercicio1/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const result = await validar.json();
    res.status(200).json(result);
}
