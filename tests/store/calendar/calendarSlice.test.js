import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  events,
  initialState,
} from "../../fixtures/calendarState";

describe("pruebas en calendarSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe de cambiar el estado de activeEvent", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe de agregar un evento al state", () => {
    const newEvent = {
      id: "3",
      start: new Date("2022-10-25 13:00:00"),
      end: new Date("2022-10-25 15:00:00"),
      title: "Cumpleaños de pepe",
      notes: "Hay que comprar el pastel",
    };
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toContain(newEvent);
  });

  test("onUpdateEvent debe de actualizar un evento del state", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2022-10-21 13:00:00"),
      end: new Date("2022-10-21 15:00:00"),
      title: "Cumpleaños de melissa",
      notes: "Hay que comprar el pastel de coco",
    };
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onUpdateEvent(updatedEvent)
    );
    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent debe de eliminar un evento del state", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent(events[0])
    );
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents debe de cargar los eventos en el state", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);
  });

  test("onLogoutCalendar debe de limpiar el state", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
