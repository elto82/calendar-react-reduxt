import enUS from "date-fns/locale/en-US";
import esEs from "date-fns/locale/es";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  es: esEs,
  "en-US": enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const getMessagesEs = () => {
  return {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total) => `+ Ver más (${total})`,
  };
};
