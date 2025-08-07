import { createClient } from "@supabase/supabase-js";

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
    // console.log("Payload recibido:", JSON.stringify(payload, null, 2));

    const datosEncuesta = {};

    // Mapeo de las claves de Tally a las columnas de Supabase
    const keyMap = {
      "question_bebVgZ": "Nombre del encuestador",
      "question_Ap1Paz": "Nombre del encuestado",
      "question_BpM46K": "Fecha",
      "question_xDOxor": "Hora",
      "question_ZOq5go": "Sexo",
      "question_kGMage": "Edad",
      "question_vDojgD": "Estado civil",
      "question_LKR1Vp": "Grupo",
      "question_po8x5B": "Subgrupo",
      "question_KxdQOV": "Numero de integrantes en la familia",
      "question_0edMp0": "0 - 10 años",
      "question_z7jza8": "11 - 25 años",
      "question_5ZbkyP": "26 - 50 años",
      "question_d9EA5y": "51 - 90 años",
      "question_MaoKPA": "Nivel de educación del jefe del hogar",
      "question_Jl5KGR": "Situación laboral del jefe del hogar",
      "question_gqKjg4": "Ingreso estimado mensual del jefe del hogar",
      "question_y4VZgx": "Tipo de hogar",
      "question_XoZl9Y": "¿Conoce usted qué son los desechos sólidos domiciliarios?",
      "question_8L7o2P": "¿Cree usted que existe un comportamiento adecuado frente a los residuos?",
      "question_08NrGj": "¿Se deben separar los desechos sólidos según su origen?",
      "question_zMPXg0": "¿Es importante la correcta clasificación de los residuos?",
      "question_59WKrE": "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?",
      "question_d0BqgK": "¿Dedica tiempo para reducir, reutilizar o reciclar?",
      "question_YGNDeJ": "¿Los desechos sólidos son un gran problema para su comunidad?",
      "question_Dpg2bZ": "¿Le preocupa el exceso de desechos sólidos domiciliarios?",
      "question_lOJDgv": "¿Considera que los desechos contaminan el ambiente?",
      "question_RoEK2j": "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?",
      "question_oRX6gx": "¿Siente frustración debido a la falta de acciones ambientales?",
      "question_Gp8vkk": "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?",
      "question_OXO1rg": "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?",
      "question_VP2Eqy": "¿Investiga frecuentemente acerca de temas medio ambientales?",
      "question_P9Vj4e": "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?",
      "question_ElyzAr": "¿Conoce los beneficios de reutilizar un residuo domiciliario?",
      "question_rOzygR": "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?",
      "question_47eXEY": "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?",
      "question_jo1Dg4": "¿La acumulación de desechos afectan a la salud de la población?",
      "question_2AQ8V9": "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?",
      "question_xDOxg5": "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?",
      "question_RoEK29": "¿Necesita más información acerca de educación ambiental?",
      "question_oRX6gP": "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algun ingreso?",
      "question_Gp8vkZ": "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?",
      "question_OXO1rR": "¿Cree que el manejo adecuado de los desechos solidos domiciliarios podría aportar al desarrollo económico comunitario?",
      "question_VP2Eqg": "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?",
      "question_P9Vj4V": "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?",
      "question_ElyzA4": "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?",
      "question_rOzygN": "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos solidos domiciliarios?",
      "question_47eXqX": "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?"
    };

    for (const field of payload.data.fields) {
      const supabaseColumnName = keyMap[field.key];
      if (supabaseColumnName) {
        datosEncuesta[supabaseColumnName] = field.value;
      }
    }

    // Corregir el formato de los valores de las opciones múltiples
    // El payload solo incluye el ID de la opción seleccionada. Para obtener el texto,
    // es mejor mapear el valor o usar el 'label' directamente si lo tienes.

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
