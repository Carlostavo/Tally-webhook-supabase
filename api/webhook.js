// api/webhook.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Conectar a Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { data } = req.body; // Datos que envía Tally

    // Extraer respuestas del formulario
    const record = {
      "Nombre del encuestador": data['Nombre del encuestador'] || null,
      "Nombre del encuestado": data['Nombre del encuestado'] || null,
      "Fecha": data['Fecha'] || null,
      "Hora": data['Hora'] || null,
      "Sexo": data['Sexo'] || null,
      "Edad": data['Edad'] ? parseInt(data['Edad']) : null,
      "Estado civil": data['Estado civil'] || null,
      "Grupo": data['Grupo'] || null,
      "Subgrupo": data['Subgrupo'] || null,
      "Número de integrantes en la familia": data['Número de integrantes en la familia'] ? parseInt(data['Número de integrantes en la familia']) : null,
      "0 - 10 años": data['0 - 10 años'] ? parseInt(data['0 - 10 años']) : null,
      "11 - 25 años": data['11 - 25 años'] ? parseInt(data['11 - 25 años']) : null,
      "26 - 50 años": data['26 - 50 años'] ? parseInt(data['26 - 50 años']) : null,
      "51 - 90 años": data['51 - 90 años'] ? parseInt(data['51 - 90 años']) : null,
      "Nivel de educación del jefe del hogar": data['Nivel de educación del jefe del hogar'] || null,
      "Situación laboral del jefe del hogar": data['Situación laboral del jefe del hogar'] || null,
      "Ingreso estimado mensual del jefe del hogar": data['Ingreso estimado mensual del jefe del hogar'] || null,
      "Tipo de hogar": data['Tipo de hogar'] || null,
      "¿Conoce lo que son los desechos sólidos domiciliarios?": data['¿Conoce lo que son los desechos sólidos domiciliarios?'] || null,
      "¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?": data['¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?'] || null,
      "¿Se debe separar los desechos sólidos según su origen?": data['¿Se debe separar los desechos sólidos según su origen?'] || null,
      "¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?": data['¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?'] || null,
      "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?": data['¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?'] || null,
      "¿Dedica tiempo para reducir, reutilizar o reciclar?": data['¿Dedica tiempo para reducir, reutilizar o reciclar?'] || null,
      "¿Los desechos sólidos son un gran problema para su comunidad?": data['¿Los desechos sólidos son un gran problema para su comunidad?'] || null,
      "¿Le preocupa el exceso de desechos sólidos domiciliarios?": data['¿Le preocupa el exceso de desechos sólidos domiciliarios?'] || null,
      "¿Considera que los desechos contaminan el ambiente?": data['¿Considera que los desechos contaminan el ambiente?'] || null,
      "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?": data['¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?'] || null,
      "¿Siente frustración debido a la falta de acciones ambientales?": data['¿Siente frustración debido a la falta de acciones ambientales?'] || null,
      "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?": data['¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?'] || null,
      "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?": data['¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?'] || null,
      "¿Investiga frecuentemente acerca de temas medio ambientales?": data['¿Investiga frecuentemente acerca de temas medio ambientales?'] || null,
      "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?": data['¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?'] || null,
      "¿Conoce los beneficios de reutilizar un residuo domiciliario?": data['¿Conoce los beneficios de reutilizar un residuo domiciliario?'] || null,
      "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?": data['¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?'] || null,
      "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?": data['¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?'] || null,
      "¿La acumulación de desechos afectan a la salud de la población?": data['¿La acumulación de desechos afectan a la salud de la población?'] || null,
      "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?": data['¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?'] || null,
      "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?": data['¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?'] || null,
      "¿Necesita más información acerca de educación ambiental?": data['¿Necesita más información acerca de educación ambiental?'] || null,
      "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?": data['¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?'] || null,
      "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?": data['¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?'] || null,
      "¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?": data['¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?'] || null,
      "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?": data['¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?'] || null,
      "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?": data['¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?'] || null,
      "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?": data['¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?'] || null,
      "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?": data['¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?'] || null,
      "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?": data['¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?'] || null,
      "¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?": data['¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?'] || null,
      "¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?": data['¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?'] || null
    };

    // Insertar en Supabase
    const { error } = await supabase
      .from('Cuestionario_comportamiento_proambiental_autosustentabilidad')
      .insert([record]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al insertar en Supabase', details: error });
    }

    return res.status(200).json({ message: 'Datos guardados correctamente en Supabase' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error procesando el webhook' });
  }
}
