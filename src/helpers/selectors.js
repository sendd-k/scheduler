export function getAppointmentsForDay(state, day) {
  const result = [];
  for (const i of state.days) {
    if (i.name === day) {
      for (const j of i.appointments) {
        if (state.appointments[j]) {
          result.push(state.appointments[j]);
        }
      }
    }
  }
  return result;
}
