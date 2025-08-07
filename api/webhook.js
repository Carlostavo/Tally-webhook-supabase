import { createClient } from "@supabase/supabase-js";

// La URL y la clave de Supabase se cargan desde las variables de entorno de Vercel
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  // Asegurarse de que el método de la solicitud sea POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const payload = req.body;
    console.log("Payload recibido:", JSON.stringify(payload, null, 2)); // <-- Línea activa para depuración

    // Mapeo de los datos del formulario de Tally a los nombres de tus columnas
    // Asegúrate de que las "keys" en el payload de Tally coincidan con estos nombres
    const datosEncuesta = {
      "Nombre del encuestador": payload.data?.["Nombre del encuestador"],
      "Nombre del encuestado": payload.data?.["Nombre del encuestado"],
      "Fecha": payload.data?.["Fecha"],
      "Hora": payload.data?.["Hora"],
      "Sexo": payload.data?.["Sexo"],
      "Edad": payload.data?.["Edad"],
      "Estado civil": payload.data?.["Estado civil"],
      "Numero de integrantes": payload.data?.["Numero de integrantes"],
      "Grupo": payload.data?.["Grupo"],
      "Subgrupo": payload.data?.["Subgrupo"],
      "0 - 10 años": payload.data?.["0 - 10 años"],
      "11 - 25 años": payload.data?.["11 - 25 años"],
      "26 - 50 años": payload.data?.["26 - 50 años"],
      "51 - 90 años": payload.data?.["51 - 90 años"],
      "Nivel de educacion del jefe del hogar": payload.data?.["Nivel de educacion del jefe del hogar"],
      "Tipo de vivienda": payload.data?.["Tipo de vivienda"],
      "Tipo de hogar": payload.data?.["Tipo de hogar"],

      // Mapeo para las preguntas del cuestionario de la sección 2.2
      "Conoce lo que son los desechos solidos domiciliarios?": payload.data?.["Conoce lo que son los desechos solidos domiciliarios?"],
      "Cree usted, que existe un comportamiento adecuado en el manejo de los desechos solidos domiciliarios en la comunidad?": payload.data?.["Cree usted, que existe un comportamiento adecuado en el manejo de los desechos solidos domiciliarios en la comunidad?"],
      "Se debe separar los desechos solidos segun su tipo?": payload.data?.["Se debe separar los desechos solidos segun su tipo?"],
      "Es importante la correcta clasificacion de los desechos solidos organicos e inorganicos en el hogar?": payload.data?.["Es importante la correcta clasificacion de los desechos solidos organicos e inorganicos en el hogar?"],
      "Cree que el comportamiento de la comunidad influye en el deterioro del medio ambiente?": payload.data?.["Cree que el comportamiento de la comunidad influye en el deterioro del medio ambiente?"],
      "Indica tiempo para reducir, reutilizar y/o reciclar los desechos solidos que se generan en el hogar?": payload.data?.["Indica tiempo para reducir, reutilizar y/o reciclar los desechos solidos que se generan en el hogar?"],
      "Los desechos solidos son un gran problema para la comunidad?": payload.data?.["Los desechos solidos son un gran problema para la comunidad?"],
      
      // Mapeo para las preguntas de la sección 2.3
      "Le preocupan el exceso de desechos solidos domiciliarios en las calles?": payload.data?.["Le preocupan el exceso de desechos solidos domiciliarios en las calles?"],
      "Considera que los desechos solidos domiciliarios interactuan en las alteraciones climaticas?": payload.data?.["Considera que los desechos solidos domiciliarios interactuan en las alteraciones climaticas?"],
      "Le afecta emocionalmente cuando suceden noticias acerca de los desastres naturales?": payload.data?.["Le afecta emocionalmente cuando suceden noticias acerca de los desastres naturales?"],
      "Le parece que esto debido a la falta de decisiones significativas para abordar la generacion de los desechos solidos?": payload.data?.["Le parece que esto debido a la falta de decisiones significativas para abordar la generacion de los desechos solidos?"],
      "Considera importante poseer en el tipo de planeta que dejaremos a las futuras generaciones?": payload.data?.["Considera importante poseer en el tipo de planeta que dejaremos a las futuras generaciones?"],
      
      // Mapeo para las preguntas de la sección 2.4
      "Le impacta el uso de los desechos solidos domiciliarios en el medio ambiente?": payload.data?.["Le impacta el uso de los desechos solidos domiciliarios en el medio ambiente?"],
      "Conoce las consecuencias de la acumulacion de los desechos solidos domiciliarios?": payload.data?.["Conoce las consecuencias de la acumulacion de los desechos solidos domiciliarios?"],
      "Conoce los beneficios de reutilizar los residuos domiciliarios?": payload.data?.["Conoce los beneficios de reutilizar los residuos domiciliarios?"],
      "La falta de informacion es un obstaculo para la correcta gestion de los residuos solidos domiciliarios?": payload.data?.["La falta de informacion es un obstaculo para la correcta gestion de los residuos solidos domiciliarios?"],
      
      // Mapeo para las preguntas de la sección 2.5
      "Los desechos organicos generados en el hogar pueden tener otra funcionalidad?": payload.data?.["Los desechos organicos generados en el hogar pueden tener otra funcionalidad?"],
      "La acumulacion de desechos afecta la salud de la poblacion?": payload.data?.["La acumulacion de desechos afecta la salud de la poblacion?"],
      "La reduccion, reciclaje y la reutilizacion de los desechos solidos puede cuidar el medio ambiente y las comunidades?": payload.data?.["La reduccion, reciclaje y la reutilizacion de los desechos solidos puede cuidar el medio ambiente y las comunidades?"],
      "Cree que la transformacion de desechos solidos en nuevos productos puede contribuir significativamente a la reduccion de la generacion de desechos?": payload.data?.["Cree que la transformacion de desechos solidos en nuevos productos puede contribuir significativamente a la reduccion de la generacion de desechos?"],
      "Necesita mas informacion acerca de educacion ambiental?": payload.data?.["Necesita mas informacion acerca de educacion ambiental?"],
      
      // Mapeo para las preguntas de la sección 2.6
      "La en hogar genera la separacion de los desechos para el reciclaje y le representa algun ingreso?": payload.data?.["La en hogar genera la separacion de los desechos para el reciclaje y le representa algun ingreso?"],
      "Usted paga una tarifa por la recoleccion de los desechos solidos?": payload.data?.["Usted paga una tarifa por la recoleccion de los desechos solidos?"],
      "Cree que el manejo adecuado de los desechos solidos domiciliarios podria aportar al desarrollo economico de su familia?": payload.data?.["Cree que el manejo adecuado de los desechos solidos domiciliarios podria aportar al desarrollo economico de su familia?"],
      "Los emprendimientos en base a la reutilizacion de los desechos aporta a su economia?": payload.data?.["Los emprendimientos en base a la reutilizacion de los desechos aporta a su economia?"],
      "El manejo adecuado de los desechos solidos domiciliarios ofrece oportunidades para el autoempleo?": payload.data?.["El manejo adecuado de los desechos solidos domiciliarios ofrece oportunidades para el autoempleo?"],
      
      // Mapeo para las preguntas de la sección 2.7
      "Es posible mejorar la generacion de residuos solidos domiciliarios por medio de eventos de sensibilizacion?": payload.data?.["Es posible mejorar la generacion de residuos solidos domiciliarios por medio de eventos de sensibilizacion?"],
      "Participaria en talleres de buenas practicas y capacitaciones para el correcto manejo de los residuos solidos domiciliarios?": payload.data?.["Participaria en talleres de buenas practicas y capacitaciones para el correcto manejo de los residuos solidos domiciliarios?"],
      "El manejo adecuado de los desechos solidos domiciliarios puede tener un impacto significativo al medio ambiente?": payload.data?.["El manejo adecuado de los desechos solidos domiciliarios puede tener un impacto significativo al medio ambiente?"],
      "Esta dispuesto a participar en un emprendimiento en base al uso de los desechos solidos?": payload.data?.["Esta dispuesto a participar en un emprendimiento en base al uso de los desechos solidos?"],
      "Participaria a una feria de emprendimientos comunitarios en base a desechos domiciliarios?": payload.data?.["Participaria a una feria de emprendimientos comunitarios en base a desechos domiciliarios?"]
    };

    // Usar la tabla 'Encuestas_Completas' y el objeto con todos los datos
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
