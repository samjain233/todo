import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = ({ setShowCreate, addTask }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fileName, setFileName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const adjustFileName = (fileName) => {
    if (fileName.length > 15) {
      const extension = fileName.split(".").pop();
      const truncatedName =
        fileName.substring(0, 4) +
        "......" +
        fileName.substring(
          fileName.length - 5 - extension.length,
          fileName.length - extension.length
        ) +
        extension;
      return truncatedName;
    }
    return fileName;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(adjustFileName(file.name));
      const reader = new FileReader();
      reader.onloadend = () => {
        setTask({ ...task, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setShowCreate(false);
  };

  const handleSave = () => {
    const form = document.getElementById("taskForm");

    if (form.checkValidity()) {
      const newTask = {
        id: Date.now(),
        head: task.title,
        description: task.description,
        image: task.image,
        startTime: new Date().toString(),
        endTime: selectedDate.toString(),
        isCompleted: false,
      };
      addTask(newTask); // This line might be causing the error
      handleClose();
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  return (
    <>
      <div
        data-aos="flip-left"
        className="fixed top-0 left-0 w-full bg-opacity-30 backdrop-blur-md p-4 rounded-lg bg-gray-200 h-full flex items-center justify-center bg-gray-800 bg-opacity-80"
      >
        <div className="bg-white  rounded-lg">
          <div className="w-full max-w-md mx-auto rounded-lg">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl text-left text-blue-800 font-bold mb-3">
                New Task
              </h2>
              <form id="taskForm">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className=" hover:bg-blue-200 hover:border-2 hover:border-solid hover:border-blue-800 hover:text-blue-800 w-full p-2 mb-3 bg-purple1 border rounded border-gray-300 rounded-xl"
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description..."
                  style={{ height: "30vh" }}
                  className=" hover:bg-blue-200 hover:border-2 hover:border-solid hover:border-blue-800 hover:text-blue-800 w-full bg-purple1  p-2 mb-3 border rounded border-gray-300 rounded-xl"
                  onChange={handleInputChange}
                  required
                />
                <div className="flex h-10 bg-purple1 items-center justify-between mb-3 rounded-xl">
                  <span className="p-3">
                    Due on: {selectedDate ? selectedDate.toDateString() : ""}
                  </span>
                  <div
                    className="bg-gray1 w-1/3 text-sm text-white  h-full overflow-hidden rounded-tr-xl flex justify-center items-center hover:bg-blue-200 hover:border-2 hover:border-solid hover:border-blue-500 hover:text-blue-800 rounded-br-xl cursor-pointer"
                    onClick={() => document.getElementById("dueDate").click()}
                  >
                    <DatePicker
                      id="dueDate"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                      className="hidden w-full h-full top-0 left-0"
                    />
                    <label
                      htmlFor="dueDate"
                      className="block text-sm font-medium text-white cursor-pointer"
                    >
                      Change
                    </label>
                  </div>
                </div>

                <div className="flex items-center bg-purple1 h-10 justify-between mb-3 rounded-xl">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                  />
                  <label
                    htmlFor="image-input"
                    className="cursor-pointer flex justify-between items-center h-full w-full"
                  >
                    <span className="p-3">{fileName || "No image..."}</span>
                    <div className="bg-gray1 hover:bg-blue-200 hover:border-2 hover:border-solid hover:border-blue-500 hover:text-blue-800 w-1/3 text-sm text-white px-3 h-full py-1 rounded-tr-xl rounded-br-xl flex items-center justify-center">
                      Add Image
                    </div>
                  </label>
                </div>
                {/* Error message */}
                {errorMessage && (
                  <div className="text-red-600 mb-3">{errorMessage}</div>
                )}
              </form>
              <div className="flex items-center justify-between">
                <div
                  onClick={handleClose}
                  className="h-12 w-full hover:bg-blue-200 hover:border-2 hover:border-solid hover:border-blue-500 px-3 py-1 rounded-lg cursor-pointer flex items-center justify-center"
                >
                  <div className="text-center"> Cancel</div>
                </div>
                <div
                  className="bg-indigo-600 h-12 w-full hover:bg-blue-200 hover:border-2 hover:border-solid hover:border-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer flex items-center justify-center"
                  onClick={handleSave}
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
