import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [minDate] = useState(new Date());

  const saveData = () => {
    if (title && description && date) {
      setData([...data, { title, description, date }]);
      setTitle("");
      setDescription("");
      setDate("");
    } else {
      alert("Please fill all the fields");
    }
  };
  const deleteData = (index) => {
    setData(data.filter((item, i) => i !== index));
  };

  const editData = (index) => {
    const item = data[index];
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date);
    deleteData(index);
  };

  const filterData = (day) => {
    setFilter(day);
  };

  const getDay = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const d = new Date(date);
    return days[d.getDay()];
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (selectedDate < minDate) {
      return;
    }
    setDate(event.target.value);
    const selectedDay = getDay(event.target.value);
    setFilter(selectedDay);
  };

  return (
    <div className="App">
      <h1>React JS UI</h1>
      <div className="inputs">
        <div class="firstSection">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="input1"
            min={minDate.toISOString().slice(0, 10)}
            placeholder="02-02-2024"
          />
        </div>
        <div className="firstSection+">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="save" onClick={saveData}>
            SAVE
          </button>
        </div>
      </div>
      <div className="days">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <button
            className={filter === day ? "active" : ""}
            onClick={() => filterData(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="data">
        {data
          .filter((item) => (filter ? getDay(item.date) === filter : true))
          .map((item, index) => (
            <div className="item" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button onClick={() => deleteData(index)}>DELETE</button>
              <button className="button" onClick={() => editData(index)}>
                EDIT
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
