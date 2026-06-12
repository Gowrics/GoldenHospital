import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(true);

  // Open and close modal handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [docterApp, setDocterApp] = useState([
    {
      date: "27-12-2024",
      availablity: "Yes",
    },
    {
      date: "28-12-2024",
      availablity: "Yes",
    },
    {
      date: "29-12-2024",
      availablity: "No",
    },
    {
      date: "30-12-2024",
      availablity: "Yes",
    },
  ]);
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log(date);
    // Format the selected date as dd-mm-yyyy
    const formattedDate = `${selectedDate.getDate()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getFullYear()}`;
    console.log(selectedDate.getDate());
    console.log(selectedDate.getMonth() + 1);
    console.log(selectedDate.getFullYear());

    // Check if the selected date exists in the docterApp array
    const appointment = docterApp.find((app) => app.date === formattedDate);
    console.log(appointment);
    if (appointment) {
      if (appointment.availablity === "Yes") {
        alert("Book Your slot for " + formattedDate);
      } else {
        alert("No slots available for " + formattedDate);
      }
    } else {
      alert(
        "please select this week only " +
          "from" +
          docterApp[0].date +
          "to" +
          docterApp[docterApp.length - 1].date
      );
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={date}
              // Optional: Uncomment to restrict dates
              // maxDate={new Date()} // will not allow date later than today
              // minDate={new Date(2015, 6, 1)} // will not allow date before 1st July 2015
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Date
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calender;
