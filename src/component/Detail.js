import React, { useState } from "react";

const Detail = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    props.set(false);
  };

  const task = props.task;

  return (
    <>
      {isOpen && (
        <div
          data-aos="flip-right"
          className={`flex
    fixed
    top-0
    left-0
    w-full
    h-full
    justify-center backdrop-blur-sm
    `}
        >
          <div className="max-w-sm md:my-auto mt-20 bg-white p-4 border rounded-xl">
            <button
              className="text-end w-[100%] text-2xl cursor-pointer"
              onClick={handleClose}
            >
              &times;
            </button>
            {task && (
              <>
                <div className="text-left text-[30px] p-2 font-[700]">
                  Description
                </div>
                <div className="lg:h-[325px] md:h-[400px] h-[400px] overflow-auto">
                  <div className="text-[20px] p-2 font-[600] text-left  break-all">
                    {task.head}
                  </div>
                  <div className="text-left text-red-600 p-2 text-[14px] font-[600]">
                    {task.endTime && ('Due : '+props.formatDate(task.endTime))}
                  </div>
                  <div className="text-[18px] p-2 font-[400] text-lef  break-all">
                    {task.description}
                  </div>
                  {task.image && (
                    <img src={task.image} alt="task-preview"></img>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
