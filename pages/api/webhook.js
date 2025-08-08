import { createClient } from "@supabase/supabase-js";

// Crear cliente de Supabase usando las variables de entorno de Vercel
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const payload = req.body;

    const datosEncuesta = {
      // Datos iniciales
      "Nombre del encuestador": payload.data?.["Nombre del encuestador"],
      "Nombre del encuestado": payload.data?.["Nombre del encuestado"],
      "Fecha": payload.data?.["Fecha"],
      "Hora": payload.data?.["Hora"],
      "Sexo": payload.data?.["Sexo"],
      "Edad": payload.data?.["Edad"],
      "Estado civil": payload.data?.["Estado civil"],
      "Grupo": payload.data?.["Grupo"],
      "Subgrupo": payload.data?.["Subgrupo"],
      "Número de integrantes en la familia": payload.data?.["Número de integrantes en la familia"],
      "0 - 10 años": payload.data?.["0 - 10 años"],
      "11 - 25 años": payload.data?.["11 - 25 años"],
      "26 - 50 años": payload.data?.["26 - 50 años"],
      "51 - 90 años": payload.data?.["51 - 90 años"],

      // Datos socioeconómicos
      "Nivel de educación del jefe del hogar": payload.data?.["Nivel de educación del jefe del hogar"],
      "Situación laboral del jefe del hogar": payload.data?.["Situación laboral del jefe del hogar"],
      "Ingreso estimado mensual del jefe del hogar": payload.data?.["Ingreso estimado mensual del jefe del hogar"],
      "Tipo de hogar": payload.data?.["Tipo de hogar"],

      // 2.2 Determinantes Socioculturales o Disposicionales
      "¿Conoce usted qué son los desechos sólidos domiciliarios?": payload.data?.["¿Conoce usted qué son los desechos sólidos domiciliarios?"],
      "¿Cree usted que existe un comportamiento adecuado frente a los residuos?": payload.data?.["¿Cree usted que existe un comportamiento adecuado frente a los residuos?"],
      "¿Se deben separar los desechos sólidos según su origen?": payload.data?.["¿Se deben separar los desechos sólidos según su origen?"],
      "¿Es importante la correcta clasificación de los residuos?": payload.data?.["¿Es importante la correcta clasificación de los residuos?"],
      "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?": payload.data?.["¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?"],
      "¿Dedica tiempo para reducir, reutilizar o reciclar?": payload.data?.["¿Dedica tiempo para reducir, reutilizar o reciclar?"],
      "¿Los desechos sólidos son un gran problema para su comunidad?": payload.data?.["¿Los desechos sólidos son un gran problema para su comunidad?"],

      // 2.3 Determinantes Afectivos
      "¿Le preocupa el exceso de desechos sólidos domiciliarios?": payload.data?.["¿Le preocupa el exceso de desechos sólidos domiciliarios?"],
      "¿Considera que los desechos contaminan el ambiente?": payload.data?.["¿Considera que los desechos contaminan el ambiente?"],
      "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?": payload.data?.["¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?"],
      "¿Siente frustración debido a la falta de acciones ambientales?": payload.data?.["¿Siente frustración debido a la falta de acciones ambientales?"],
      "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?": payload.data?.["¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?"],

      // 2.4 Determinantes Cognitivos
      "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?": payload.data?.["¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?"],
      "¿Investiga frecuentemente acerca de temas medio ambientales?": payload.data?.["¿Investiga frecuentemente acerca de temas medio ambientales?"],
      "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?": payload.data?.["¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?"],
      "¿Conoce los beneficios de reutilizar un residuo domiciliario?": payload.data?.["¿Conoce los beneficios de reutilizar un residuo domiciliario?"],
      "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?": payload.data?.["¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?"],

      // 2.5 Sustentabilidad Ambiental
      "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?": payload.data?.["¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?"],
      "¿La acumulación de desechos afectan a la salud de la población?": payload.data?.["¿La acumulación de desechos afectan a la salud de la población?"],
      "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?": payload.data?.["¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?"],
      "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?": payload.data?.["¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?"],
      "¿Necesita más información acerca de educación ambiental?": payload.data?.["¿Necesita más información acerca de educación ambiental?"],

      // 2.6 Sustentabilidad Económica
      "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algun ingreso?": payload.data?.["¿En su hogar practica la separación de los desechos para el reciclaje y le representa algun ingreso?"],
      "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?": payload.data?.["¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?"],
      "¿Cree que el manejo adecuado de los desechos solidos domiciliarios podría aportar al desarrollo económico comunitario?": payload.data?.["¿Cree que el manejo adecuado de los desechos solidos domiciliarios podría aportar al desarrollo económico comunitario?"],
      "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?": payload.data?.["¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?"],
      "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?": payload.data?.["¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?"],

      // 2.7 Desarrollo Comunitario
      "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?": payload.data?.["¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?"],
      "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos solidos domiciliarios?": payload.data?.["¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos solidos domiciliarios?"],
      "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?": payload.data?.["¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?"]
    };

    const { error } = await supabase
      .from("Encuestas_Completas")
      .insert([datosEncuesta]);

    if (error) throw error;

    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error guardando en Supabase" });
  }
}
