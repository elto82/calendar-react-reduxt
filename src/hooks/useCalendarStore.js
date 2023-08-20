import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      // Edit event
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // New event
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    hasEventSelected: !!activeEvent,
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
