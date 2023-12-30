// Importing necessary dependencies from React
import React, { useState, useEffect } from "react";

// Importing components from local files
import Create from "./Create";
import Detail from "./Detail";
import data1 from "../data/data.json";
import Delete from "./Delete";
import Task from "./Task";
import Topbar from "./Topbar";
import BottomTab from "./BottomTab";

// Functional component named Home
export const Home = () => {
  // State to track whether the window width is greater than 768 pixels
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // State to manage task data
  const [data, setData] = React.useState(
    data1.filter((item) => !item.isCompleted)
  );

  // State for managing visibility of create task modal
  const [showCeate, setShowCreate] = React.useState(false);

  // State for managing visibility of task detail modal
  const [showDetail, setShowDetail] = React.useState(false);

  // State for managing visibility of delete confirmation modal
  const [confirm, setConfirm] = React.useState(false);
  //Heading of mini window
  const [head, setHead] = useState("Pending Task");
  const [tab, setTab] = useState({ a: "#ACA7D5", b: "#F5F4FFE8" });
  // Function to handle window resize and update isDesktop state
  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1080);
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
  });

  // Function to toggle the visibility of create task modal
  function createTask() {
    setShowCreate(!showCeate);
    console.log(isDesktop);
  }

  // Function to show details of a specific task
  function showDetails(item) {
    if (!isDesktop) setShowDetail(!showDetail);
    console.log(item);

    setTask1(item);
  }

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
  function handleDelete(e) {
    setConfirm(!confirm);
    e.stopPropagation();
    console.log("raman");
  }

  // JSX rendering for the Home component
  return (
    <>
      {/* Header */}
      <div className="text-indigo-800 font-inter text-5xl font-extrabold">
        TO-DO LIST
      </div>

      {/* Sort and create task buttons */}
      <div className="p-4 md:p-8 w-full flex flex-col md:flex-row justify-center mb-2">
        <Topbar />
      </div>

      {/* Task list and details */}
      <div style={{ height: "50vh" }} className="flex justify-center ">
        <div className="md:p-8 grid w-full md:w-full lg:w-3/4 sm:w-full grid-cols-1 ">
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
                      <Task task={item} />
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
                Description
              </div>
              <div className="h-[90%] overflow-auto">
                <div className="text-[20px] p-2 font-[600] text-left">
                  {task1.Head}
                </div>
                <div className="text-left text-red-600 p-2 text-[14px] font-[600]">
                  {task1.endTime}
                </div>
                <div className="text-[18px] p-2 font-[400] text-left">
                  {task1.description}
                </div>
                <img
                  src="https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="task-preview"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal components */}
      {showCeate && <Create set={setShowCreate} />}
      {showDetail && <Detail set={setShowDetail} task={task1} />}
      {confirm && <Delete set={setConfirm} />}
    </>
  );
};
