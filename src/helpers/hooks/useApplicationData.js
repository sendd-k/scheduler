import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

export default function useApplicationData(props) {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  console.log(state.interviewers);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("appointments", appointments);
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("delete appoint", appointments);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
