import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body?.data?.values || {};
    // Mapea los campos con comillas reemplazando espacios por _
    const row = {
      "Nombre del encuestador": data["Nombre del encuestador"],
      "Nombre del encuestado": data["Nombre del encuestado"],
      Fecha: data["Fecha"],
      Hora: data["Hora"],
      Sexo: data["Sexo"],
      Edad: parseInt(data["Edad"] || 0, 10),
      "Estado civil": data["Estado civil"],
      Grupo: data["Grupo"],
      Subgrupo: data["Subgrupo"],
      "Número de integrantes en la familia": parseInt(data["Número de integrantes en la familia"] || 0, 10),
      "0 - 10 años": parseInt(data["0 - 10 años"] || 0, 10),
      "11 - 25 años": parseInt(data["11 - 25 años"] || 0, 10),
      "26 - 50 años": parseInt(data["26 - 50 años"] || 0, 10),
      "51 - 90 años": parseInt(data["51 - 90 años"] || 0, 10),
      "Nivel de educación del jefe del hogar": data["Nivel de educación del jefe del hogar"],
      "Situación laboral del jefe del hogar": data["Situación laboral del jefe del hogar"],
      "Ingreso estimado mensual del jefe del hogar": data["Ingreso estimado mensual del jefe del hogar"],
      "Tipo de hogar": data["Tipo de hogar"],
      "¿Conoce usted qué son los desechos sólidos domiciliarios?": data["¿Conoce usted qué son los desechos sólidos domiciliarios?"],
      "¿Cree usted que existe un comportamiento adecuado frente a los residuos?": data["¿Cree usted que existe un comportamiento adecuado frente a los residuos?"],
      "¿Se deben separar los desechos sólidos según su origen?": data["¿Se deben separar los desechos sólidos según su origen?"],
      "¿Es importante la correcta clasificación de los residuos?": data["¿Es importante la correcta clasificación de los residuos?"],
      "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?": data["¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?"],
      "¿Dedica tiempo para reducir, reutilizar o reciclar?": data["¿Dedica tiempo para reducir, reutilizar o reciclar?"],
      "¿Los desechos sólidos son un gran problema para su comunidad?": data["¿Los desechos sólidos son un gran problema para su comunidad?"],
      "¿Le preocupa el exceso de desechos sólidos domiciliarios?": data["¿Le preocupa el exceso de desechos sólidos domiciliarios?"],
      "¿Considera que los desechos contaminan el ambiente?": data["¿Considera que los desechos contaminan el ambiente?"],
      "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?": data["¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?"],
      "¿Siente frustración debido a la falta de acciones ambientales?": data["¿Siente frustración debido a la falta de acciones ambientales?"],
      "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?": data["¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?"],
      "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?": data["¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?"],
      "¿Investiga frecuentemente acerca de temas medio ambientales?": data["¿Investiga frecuentemente acerca de temas medio ambientales?"],
      "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?": data["¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?"],
      "¿Conoce los beneficios de reutilizar un residuo domiciliario?": data["¿Conoce los beneficios de reutilizar un residuo domiciliario?"],
      "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?": data["¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?"],
      "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?": data["¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?"],
      "¿La acumulación de desechos afectan a la salud de la población?": data["¿La acumulación de desechos afectan a la salud de la población?"],
      "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?": data["¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?"],
      "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?": data["¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?"],
      "¿Necesita más información acerca de educación ambiental?": data["¿Necesita más información acerca de educación ambiental?"],
      "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algun ingreso?": data["¿En su hogar practica la separación de los desechos para el reciclaje y le representa algun ingreso?"],
      "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?": data["¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?"],
      "¿Cree que el manejo adecuado de los desechos solidos domiciliarios podría aportar al desarrollo económico comunitario?": data["¿Cree que el manejo adecuado de los desechos solidos domiciliarios podría aportar al desarrollo económico comunitario?"],
      "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?": data["¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?"],
      "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?": data["¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?"],
      "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?": data["¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?"],
      "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos solidos domiciliarios?": data["¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos solidos domiciliarios?"],
      "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?": data["¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?"],
    };

    const { error } = await supabase.from('Encuestas_Completas').insert(row);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Error saving data' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
