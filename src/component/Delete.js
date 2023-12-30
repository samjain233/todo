import React, { useState } from 'react';

const Delete = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        props.set(false)
    };

    const deleteTheTask = () => {
      // Call the onDelete callback passed from the Home component
      props.handleDeleteTask();
  
      // Close the delete popup
      setIsOpen(false);
      props.set(false);
    };
    
    
    const task = props.task
    return (
        <>
            {isOpen && (
                <div data-aos="flip-right" className="bg-opacity-30 backdrop-blur-md p-4 rounded-lg bg-gray-200 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-80">
                    <div className="bg-white border border-2 border-cyan-800 bg-cyan-100 w-full lg:w-1/4 rounded-lg">


                                 <div className="flex justify-end p-4">
                                <div onClick={handleClose} className='text-2xl'>x</div>
                            </div>
                          
          <div className=" p-4 rounded shadow-md">
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-center">
              <button onClick={deleteTheTask} className="bg-cyan-500 hover:bg-cyan-800 text-white px-4 py-2 rounded mr-2">
                Yes
              </button>
              <button onClick={handleClose} className="bg-gray-300 hover:bg-cyan-800 hover:text-white px-4 py-2 rounded">
                No
              </button>
            </div>
          </div>
        </div> </div>
                    
                
            )
            }
        </>
    );
};

export default Delete;