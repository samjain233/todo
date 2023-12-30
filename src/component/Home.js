// Importing necessary dependencies from React
import React, { useState, useEffect } from "react";

// Importing components from local files
import Create from "./Create";
import Detail from "./Detail";
import tasks from "../data/data.json";
import Delete from "./Delete";
import Task from "./Task";
import Topbar from "./Topbar";
import BottomTab from "./BottomTab";

// Functional component named Home
export const Home = () => {
  // State to track whether the window width is greater than 768 pixels
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  // State to manage task data
  const [data1,setData1] = React.useState(tasks)
  const [data, setData] = React.useState(
    data1.filter((item) => !item.isCompleted)
  );

  // State for managing visibility of create task modal
  const [showCreate, setShowCreate] = React.useState(false);

  // State for managing visibility of task detail modal
  const [showDetail, setShowDetail] = React.useState(false);

  // State for managing visibility of delete confirmation modal
  const [confirm, setConfirm] = React.useState(false);
  //Heading of mini window
  const [head, setHead] = useState("Pending Task");
  const [tab, setTab] = useState({ a: "#ACA7D5", b: "#F5F4FFE8" });
  // Function to handle window resize and update isDesktop state
  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1024);
  };

  // Effect hook to add and remove resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // State to manage details of a specific task
  const [task1, setTask1] = useState({
    Head: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    isCompleted:"",
  });

  // Function to toggle the visibility of create task modal
  function createTask() {
    setShowCreate(!showCreate);
    console.log(isDesktop);
  }

  // Function to show details of a specific task
  function showDetails(item) {
    if (!isDesktop) setShowDetail(!showDetail);
    console.log(item);

    setTask1(item);
  }

  // Function to add a new task
  const addTask = (newTask) => {
    setData1([...data1, newTask]);
  };


  // Function to handle completion of tasks
  function handleComplete() {
    setData(data1.filter((item) => item.isCompleted));
    setHead("Completed Task");
    setTab({ a: "#F5F4FFE8", b: "#ACA7D5" });
  }

  // Function to handle displaying pending tasks
  function handlePending() {
    setData(data1.filter((item) => !item.isCompleted));
    setHead("Pending Task");
    setTab({ a: "#ACA7D5", b: "#F5F4FFE8" });
  }

  // Function to handle task deletion
  function handleDelete(e,item) {
    setTask1(item);
    setConfirm(!confirm);
    e.stopPropagation();
  }

  // Inside the Home component
const handleDeleteTask = () => {

  // Filter out the task with the specific ID from the data state
  const updatedData = data1.filter((item) => item.id !== task1.id);
  setData1(updatedData);

  // Close the delete popup
  setConfirm(false);
  setTask1({
    Head: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    isCompleted: "",
  })
};

const handleCompleteTask = (e, item) => {
  setTask1(item);
  e.stopPropagation();
  
  // Find the task to mark as complete by its ID
  const updatedData = data1.map(task => {
    if (task.id === item.id) {
      // Set isCompleted to true for the specific task
      return { ...task, isCompleted: true };
    }
    return task;
  });

  // Update the data state to reflect the modified task
  setData1(updatedData);
};

useEffect(() => {
  // Update the 'data' state based on the 'data1' state
  if(head === 'Pending Task'){
  setData(data1.filter((item) => !item.isCompleted));
  }
  else{
    setData(data1.filter((item) => item.isCompleted));
  }
}, [data1]);



  // JSX rendering for the Home component
  return (
    <>
      {/* Header */}
      <div className="text-indigo-800 font-inter text-5xl font-extrabold">
        TO-DO LIST
      </div>

      {/* Sort and create task buttons */}
      <div className="flex justify-center  md:px-16">
      <div className="w-full lg:w-3/4 flex flex-col md:flex-row justify-end">
        <Topbar addTask={addTask}/>
      </div>
      </div>

      {/* Task list and details */}
      <div style={{ height: "50vh" }} className="flex justify-center ">
        <div className=" grid w-full md:w-full md:px-16  lg:w-3/4 sm:w-full grid-cols-1 ">
          {/* Task List */}
          <div
            style={{ height: "70vh" }}
            className="col-span-2 flex rounded-xl w-full  md:col-span-1 bg-purple-200"
          >
            <div className="w-full">
              <div
                style={{
                  height: "70vh",
                  background:
                    "linear-gradient(180deg, rgba(213, 212, 255, 0.65) -1.73%, #F7F7FF 100%)",
                }}
                className="w-full  p-4  rounded-xl   overflow-y-auto"
              >
                <div className="flex justify-between">
                  <div className="flex font-semibold text-2xl">{head}</div>

                  {/* Create New Task button (visible on larger screens) */}
                  <div
                    style={{ background: "#3D00C0" }}
                    onClick={createTask}
                    className="flex-col justify-center p-2 px-8 font-semibold  hidden md:block lg:hidden lg:mx-2  rounded-xl  text-white rounded  "
                  >
                    Create New Task
                  </div>
                </div>

                {/* Task items */}
                {data.map((item) => {
                  return (
                    <>
                      <Task key={item.id} item={item} showDetails={showDetails} handleDelete={handleDelete} handleCompleteTask={handleCompleteTask} />
                    </>
                  );
                })}
              </div>

              {/* Pending and Completed buttons */}
              <BottomTab
                tab={tab}
                handleComplete={handleComplete}
                handlePending={handlePending}
              />
            </div>

            {/* Task details (visible on larger screens) */}
            <div className="border-l-2 rounded-r-xl border-black hidden lg:block h-[80vh] bg-gradient-to-b from-[#D5D4FFA6] to-[#F7F7FF] col-span-2 md:col-span-1 lg:w-1/2   p-4">
              <div className="text-left text-[30px] p-2 font-[700]">
                {task1.head?"Description":"No Task Selected"}
              </div>
              <div className="h-[90%] overflow-auto">
                <div className="text-[20px] p-2 font-[600] text-left">
                  {task1.head}
                </div>
                <div className="text-left text-red-600 p-2 text-[14px] font-[600]">
                  {task1.endTime}
                </div>
                <div className="text-[18px] p-2 font-[400] text-left">
                  {task1.description}
                </div>
                {task1.image && <img
                  src={task1.image}
                  alt="task-preview"
                ></img>}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal components */}
      {showCreate && <Create setShowCreate={setShowCreate} addTask={addTask} />}
      {showDetail && <Detail set={setShowDetail} task={task1} />}
      {confirm && <Delete set={setConfirm} task={task1} handleDeleteTask={handleDeleteTask} />}
    </>
  );
};
