import React from 'react'
import Create from './Create';

const Topbar = ({addTask}) => {
   // State for managing visibility of create task modal
   const [showCreate, setShowCreate] = React.useState(false);

   // Function to toggle the visibility of create task modal
   function createTask() {
    setShowCreate(!showCreate);
  }

  return (
    <div> 
      {/* Sort and create task buttons */}
    <div className='mt-4 w-full flex flex-col md:flex-row justify-center'>
      {/* Sorting options */}
      <div className="h-10 mb-2  bg-indigo-100 flex rounded-xl border border-indigo-900 border-2 items-center justify-between">
        {/* Sort by label */}
        <span className="w-40 flex flex-col justify-center hidden font-bold md:block  lg:block text-purple-800 text-center ">Sort By</span>

        {/* Date Created button */}
        <div className="w-60 flex flex-col md:rounded-none justify-center hover:bg-cyan-600 text-gray-900 font-bold rounded-tl-lg rounded-bl-lg lg:rounded-none bg-indigo-400 text-white h-full">Date Created</div>

        {/* Due Date button */}
        <div className="w-48 flex-col  text-gray-800 hover:bg-cyan-600 hover:h-full font-bold  flex justify-center text-white rounded-br-lg rounded-tr-lg">Due date</div>
      </div>

      {/* Create New Task button (visible on mobile and hidden on larger screens) */}

      <div onClick={createTask} className="bg-blue-900 flex-col hover:bg-blue-500 flex justify-center  md:hidden lg:block lg:mx-2 h-10 rounded-xl item-center p-2 text-white rounded  items-center cursor-pointer w-full px-8">
        Create new task
      </div>
    </div>
    {/* Conditionally render the Create component based on showCreate state */}
    {showCreate && <Create setShowCreate={setShowCreate} addTask={addTask} />}
    </div>
  )
}

export default Topbar