import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL1;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY1;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data } = req.body;

    if (!data || !data.fields) {
      return res.status(400).json({ error: 'Invalid Tally payload' });
    }

    // Función para obtener valor por etiqueta (label) ignorando mayúsculas/minúsculas
    const getValue = (label) => {
      const field = data.fields.find(f => f.label.trim().toLowerCase() === label.trim().toLowerCase());
      return field ? field.value : null;
    };

    const record = {
      "Nombre del encuestador": getValue("Nombre del encuestador"),
      "Nombre del encuestado": getValue("Nombre del encuestado"),
      "Fecha": getValue("Fecha"),
      "Hora": getValue("Hora"),
      "Sexo": getValue("Sexo"),
      "Edad": getValue("Edad"),
      "Estado civil": getValue("Estado civil"),
      "Grupo": getValue("Grupo"),
      "Subgrupo": getValue("Subgrupo"),
      "Número de integrantes en la familia": getValue("Número de integrantes en la familia"),
      "0 - 10 años": getValue("0 - 10 años"),
      "11 - 25 años": getValue("11 - 25 años"),
      "26 - 50 años": getValue("26 - 50 años"),
      "51 - 90 años": getValue("51 - 90 años"),
      "Nivel de educación del jefe del hogar": getValue("Nivel de educación del jefe del hogar"),
      "Situación laboral del jefe del hogar": getValue("Situación laboral del jefe del hogar"),
      "Ingreso estimado mensual del jefe del hogar": getValue("Ingreso estimado mensual del jefe del hogar"),
      "Tipo de hogar": getValue("Tipo de hogar"),
      "¿Conoce lo que son los desechos sólidos domiciliarios?": getValue("¿Conoce lo que son los desechos sólidos domiciliarios?"),
      "¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?": getValue("¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?"),
      "¿Se debe separar los desechos sólidos según su origen?": getValue("¿Se debe separar los desechos sólidos según su origen?"),
      "¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?": getValue("¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?"),
      "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?": getValue("¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?"),
      "¿Dedica tiempo para reducir, reutilizar o reciclar?": getValue("¿Dedica tiempo para reducir, reutilizar o reciclar?"),
      "¿Los desechos sólidos son un gran problema para su comunidad?": getValue("¿Los desechos sólidos son un gran problema para su comunidad?"),
      "¿Le preocupa el exceso de desechos sólidos domiciliarios?": getValue("¿Le preocupa el exceso de desechos sólidos domiciliarios?"),
      "¿Considera que los desechos contaminan el ambiente?": getValue("¿Considera que los desechos contaminan el ambiente?"),
      "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?": getValue("¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?"),
      "¿Siente frustración debido a la falta de acciones ambientales?": getValue("¿Siente frustración debido a la falta de acciones ambientales?"),
      "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?": getValue("¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?"),
      "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?": getValue("¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?"),
      "¿Investiga frecuentemente acerca de temas medio ambientales?": getValue("¿Investiga frecuentemente acerca de temas medio ambientales?"),
      "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?": getValue("¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?"),
      "¿Conoce los beneficios de reutilizar un residuo domiciliario?": getValue("¿Conoce los beneficios de reutilizar un residuo domiciliario?"),
      "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?": getValue("¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?"),
      "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?": getValue("¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?"),
      "¿La acumulación de desechos afectan a la salud de la población?": getValue("¿La acumulación de desechos afectan a la salud de la población?"),
      "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?": getValue("¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?"),
      "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?": getValue("¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?"),
      "¿Necesita más información acerca de educación ambiental?": getValue("¿Necesita más información acerca de educación ambiental?"),
      "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?": getValue("¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?"),
      "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?": getValue("¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?"),
      "¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?": getValue("¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?"),
      "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?": getValue("¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?"),
      "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?": getValue("¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?"),
      "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?": getValue("¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?"),
      "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?": getValue("¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?"),
      "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?": getValue("¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?"),
      "¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?": getValue("¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?"),
      "¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?": getValue("¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?")
    };

    const { data: inserted, error } = await supabase
      .from("Cuestionario_comportamiento_proambiental_autosustentabilidad")
      .insert([record])
      .select();

    if (error) throw error;

    console.log("Datos insertados:", inserted);

    return res.status(200).json({ message: "Datos guardados", data: inserted });

  } catch (err) {
    console.error("Error al insertar datos:", err);
    return res.status(500).json({ error: err.message });
  }
}

