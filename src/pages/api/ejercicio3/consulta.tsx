

type RequestData = {
    id: number;
    nombre_cliente: string;
    subtotal: number;
    iva: number;
    total: number;
  };
  
  // Esta función simula la consulta de datos desde una API o base de datos.
  export async function consulta(id: number): Promise<RequestData | null> {
    // Aquí obtienes los datos de la base de datos o API (por ejemplo, usando Supabase)
    const data = {
      id,
      nombre_cliente: 'Emilio Torres', // Ejemplo
      subtotal: 100, // Ejemplo
      iva: 0, // Aún no calculado
      total: 0, // Aún no calculado
    };
  
    // Si los datos se encuentran, retornamos la respuesta.
    return data;
  }
  