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

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return {
      interviewer: interviewer,
      student: interview.student,
    };
  } else {
    return null;
  }
}
