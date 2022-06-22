//useApplicationData. Controls State

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

  //Get Requests For API
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

  //Update Spots For Sidebar
  const updateSpots = function (state, appointments) {
    const dayObj = state.days.find((d) => d.name === state.day);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = { ...dayObj, spots };
    const days = state.days.map((d) => (d.name === state.day ? newDay : d));
    return days;
  };

  //Function For Booking An Interview
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

    //Put Request For Insterting Interview Into API
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      const days = updateSpots(state, appointments);
      setState({ ...state, appointments, days });
    });
  }

  //Function For Cancelling Interview
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

    //Delete Request For API
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      setState({ ...state, appointments, days });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
