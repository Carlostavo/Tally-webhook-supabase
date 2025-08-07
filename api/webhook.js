import { createClient } from "@supabase/supabase-js";

// La URL y la clave de Supabase se cargan desde las variables de entorno de Vercel
  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Asegurarse de que el método de la solicitud sea POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const payload = req.body;
    // La clave 'data' del payload de Tally contiene la información relevante
    const formData = payload.data;

    // Objeto para almacenar los datos mapeados
    const datosEncuesta = {};

    // Mapeo de las claves (keys) de Tally a los nombres de las columnas de Supabase
    const keyMap = {
      // Datos de la encuesta inicial
      "question_bebVgZ": "Nombre del encuestador",
      "question_Ap1Paz": "Nombre del encuestado",
      "question_BpM46K": "Fecha",
      "question_xDOxor": "Hora",
      "question_ZOq5go": "Sexo",
      "question_kGMage": "Edad",
      "question_vDojgD": "Estado civil",
      "question_LKR1Vp": "Grupo",
      "question_po8x5B": "Subgrupo",
      "question_KxdQOV": "Número de integrantes en la familia",
      "question_0edMp0": "0 - 10 años",
      "question_z7jza8": "11 - 25 años",
      "question_5ZbkyP": "26 - 50 años",
      "question_d9EA5y": "51 - 90 años",

      // Datos socioeconómicos
      "question_MaoKPA": "Nivel de educación del jefe del hogar",
      "question_Jl5KGR": "Situación laboral del jefe del hogar",
      "question_gqKjg4": "Ingreso estimado mensual del jefe del hogar",
      "question_y4VZgx": "Tipo de hogar",

      // 2.2 Determinantes Socioculturales o Disposicionales
      "question_XoZl9Y": "¿Conoce usted qué son los desechos sólidos domiciliarios?",
      "question_8L7o2P": "¿Cree usted que existe un comportamiento adecuado frente a los residuos?",
      "question_08NrGj": "¿Se deben separar los desechos sólidos según su origen?",
      "question_zMPXg0": "¿Es importante la correcta clasificación de los residuos?",
      "question_59WKrE": "¿Cree que el comportamiento de la comunidad influye en la acumulación de desechos?",
      "question_d0BqgK": "¿Dedica tiempo para reducir, reutilizar o reciclar?",
      "question_YGNDeJ": "¿Los desechos sólidos son un gran problema para su comunidad?",

      // 2.3 Determinantes Afectivos
      "question_Dpg2bZ": "¿Le preocupa el exceso de desechos sólidos domiciliarios?",
      "question_lOJDgv": "¿Considera que los desechos contaminan el ambiente?",
      "question_RoEK2j": "¿Le afecta emocionalmente cuando escucha noticias sobre la contaminación?",
      "question_oRX6gx": "¿Siente frustración debido a la falta de acciones ambientales?",
      "question_Gp8vkk": "¿Considera importante pensar en el tipo de planeta que dejamos a futuras generaciones?",

      // 2.4 Determinantes Cognitivos
      "question_OXO1rg": "¿Es consciente del impacto de los desechos sólidos en la salud y el ambiente?",
      "question_VP2Eqy": "¿Investiga frecuentemente acerca de temas medio ambientales?",
      "question_P9Vj4e": "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?",
      "question_ElyzAr": "¿Conoce los beneficios de reutilizar un residuo domiciliario?",
      "question_rOzygR": "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliarios?",

      // 2.5 Sustentabilidad Ambiental
      "question_47eXEY": "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?",
      "question_jo1Dg4": "¿La acumulación de desechos afectan a la salud de la población?",
      "question_2AQ8V9": "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?",
      "question_xDOxg5": "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?",
      "question_RoEK29": "¿Necesita más información acerca de educación ambiental?",

      // 2.6 Sustentabilidad Económica
      "question_oRX6gP": "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algun ingreso?",
      "question_Gp8vkZ": "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?",
      "question_OXO1rR": "¿Cree que el manejo adecuado de los desechos solidos domiciliarios podría aportar al desarrollo económico comunitario?",
      "question_VP2Eqg": "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?",
      "question_P9Vj4V": "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?",

      // 2.7 Desarrollo Comunitario
      "question_ElyzA4": "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?",
      "question_rOzygN": "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos solidos domiciliarios?",
      "question_47eXqX": "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?"
    };

    // Recorre el array de campos y mapea los datos
    for (const field of formData.fields) {
      const supabaseColumnName = keyMap[field.key];
      if (supabaseColumnName) {
        // Para preguntas de opción múltiple, extraemos el texto de la opción
        if (field.type === "MULTIPLE_CHOICE" && field.options) {
          const selectedOptionId = field.value[0];
          const selectedOption = field.options.find(
            (option) => option.id === selectedOptionId
          );
          datosEncuesta[supabaseColumnName] = selectedOption
            ? selectedOption.text
            : null;
        } else {
          datosEncuesta[supabaseColumnName] = field.value;
        }
      }
    }

    // Insertar el objeto mapeado en la tabla de Supabase
    const { error } = await supabase
      .from("Encuestas_Completas")
      .insert([datosEncuesta]);

    if (error) {
      console.error("Error al insertar en Supabase:", error);
      throw error;
    }

    res.status(200).json({ status: "ok", message: "Datos insertados con éxito" });
  } catch (err) {
    console.error("Error en la función del webhook:", err);
    res.status(500).json({ error: "Error guardando en Supabase" });
  }
}

