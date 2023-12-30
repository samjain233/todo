import React from "react";

const Task = ({item,handleDelete,showDetails}) => {
  return (
    <>
      {item.isCompleted ? (
        // Completed Task
        <div
          data-aos="flip-down"
          onClick={() => showDetails(item)}
          className="w-full p-4 m-1 bg-green-200  rounded-2xl hover:border hover:bg-gray-200  hover:border-indigo-900  hover:border-2 flex delay-100 items-center justify-between"
        >
          <span className="text-gray-800">{item.head}</span>
          <div className="flex">
            <button
              onClick={handleDelete}
              className="bg-red-200 text-red-900 py-1 px-3 m-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        // Pending Task
        <div
          data-aos="flip-up"
          onClick={() => showDetails(item)}
          className="w-full p-4 m-1 bg-white  rounded-2xl hover:border hover:bg-gray-200  hover:border-indigo-900  hover:border-2 flex delay-100 items-center justify-between"
        >
          <span className="text-gray-800">{item.head}</span>
          <div className="flex">
            <button
              onClick={handleDelete}
              className="bg-red-200 text-red-900 py-1 px-3 m-1 rounded"
            >
              Delete
            </button>
            <button className="bg-lime-200 text-green-800 py-1 px-3 m-1 rounded">
              Complete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
