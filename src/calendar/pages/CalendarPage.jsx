import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar";
import { getMessagesEs, localizer } from "../../helpers/calendarLocalizer";
import { CalendarEvent } from "../components/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

// const myEventsList = [
//   {
//     title: "Meeting",
//     notes: "Meeting with the team",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "Fernando",
//     }
//   },
// ];

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);


  };

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor={'end'}
        style={{ height: '80vh' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
