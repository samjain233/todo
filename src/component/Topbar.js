import React, { useState } from "react";
import Create from "./Create";

const Topbar = ({ addTask, handleSort,formatDate }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);

  // Function to toggle the visibility of create task modal
  const createTask = () => {
    setShowCreate(!showCreate);
  };

  // Function to handle sorting and update selectedSort
  const handleSortClick = (sortType) => {
    handleSort(sortType);
    setSelectedSort(sortType);
  };

  return (
    <div>
      {/* Sort and create task buttons */}
      <div className="mt-4 w-full flex flex-col md:flex-row justify-center">
        {/* Sorting options */}
        <div className="h-12 mb-2 flex rounded-xl border-[#3D00C0] border-2 items-center justify-between">
          {/* Sort by label */}
          <div className="flex-col font-600 text-[18px] bg-[#E5E4FF] hidden font-bold h-full md:block lg:block text-[#3D00C0] w-40 rounded-l-xl pt-2">
            Sort By
          </div>

          {/* Date Created button */}
          <div
            className={`w-full md:w-40 cursor-pointer flex flex-col font-600 text-[20px] md:rounded-none justify-center hover:bg-cyan-600 text-gray-900 font-bold rounded-tl-lg rounded-bl-lg lg:rounded-none  h-full ${
              selectedSort === "dateCreated" ? "bg-[#ACA7D5]" : ""
            }`}
            onClick={() => handleSortClick("dateCreated")}
          >
            Date Created
          </div>

          {/* Due Date button */}
          <div
            className={`w-full md:w-40 cursor-pointer flex-col h-full hover:bg-cyan-600 hover:h-full font-600 text-[20px] flex font-bold justify-center  rounded-br-lg rounded-tr-lg ${
              selectedSort === "dueDate" ? "bg-[#ACA7D5]" : ""
            }`}
            onClick={() => handleSortClick("dueDate")}
          >
            Due date
          </div>
        </div>

        {/* Create New Task button (visible on mobile and hidden on larger screens) */}
        <div
          onClick={createTask}
          style={{ background: "#3D00C0" }}
          className="flex-col hover:bg-blue-500 flex justify-center md:hidden lg:block lg:mx-2 h-12 rounded-xl item-center lg:pt-3 px-3 text-white rounded items-center cursor-pointer w-full mb-2"
        >
          Create new task
        </div>
      </div>

      {/* Conditionally render the Create component based on showCreate state */}
      {showCreate && <Create setShowCreate={setShowCreate} addTask={addTask} formatDate={formatDate}/>}
    </div>
  );
};

export default Topbar;
