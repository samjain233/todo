// Importing necessary dependencies from React
import React, { useState, useEffect } from 'react';

// Importing components from local files
import Create from './Create';
import Detail from './Detail';
import data1 from '../data/data.json';
import Delete from './Delete';
import Task from './Task';
import Topbar from './Topbar';

// Functional component named Home
export const Home = () => {

    // State to track whether the window width is greater than 768 pixels
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    // State to manage task data
    const [data, setData] = React.useState(data1);

    // State for managing visibility of create task modal
    const [showCeate, setShowCreate] = React.useState(false);

    // State for managing visibility of task detail modal
    const [showDetail, setShowDetail] = React.useState(false);

    // State for managing visibility of delete confirmation modal
    const [confirm, setConfirm] = React.useState(false);
//Heading of mini window
const [head,setHead]=useState("Pending");
    // Function to handle window resize and update isDesktop state
    const handleResize = () => {
        setIsDesktop(window.innerWidth > 1080);
    };

    // Effect hook to add and remove resize event listener
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // State to manage details of a specific task
    const [task1, setTask1] = useState({
        "Head": "",
        "description": "",
        "image": "",
        "startTime": "",
        "endTime": ""
    });

    // Function to toggle the visibility of create task modal
    function createTask() {
        setShowCreate(!showCeate);
        console.log(isDesktop);
    }

    // Function to show details of a specific task
    function showDetails(item) {
        if (!isDesktop)
            setShowDetail(!showDetail);
        console.log(item);

        setTask1(item);
    }

    // Function to handle completion of tasks
    function handleComplete() {
        setData(data1.filter(item => item.isCompleted));
        setHead("Completed");
    }

    // Function to handle displaying pending tasks
    function handlePending() {
        setData(data1);
        setHead("Pending");
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
            <div className='text-indigo-800 font-inter text-5xl font-extrabold'>TO-DO LIST</div>

            {/* Sort and create task buttons */}
            <div className='p-4 md:p-8 w-full flex flex-col md:flex-row justify-center mb-2'>
             <Topbar/>
            </div>

            {/* Task list and details */}
            <div style={{ height: '50vh' }} className='flex justify-center '>
                <div class="md:p-8 grid w-full md:w-full lg:w-3/4 sm:w-full grid-cols-1 ">
                    {/* Task List */}
                    <div style={{ height: '70vh' }} class="col-span-2 flex rounded-xl w-full  md:col-span-1 bg-purple-200">
                        <div className='w-full'>
                            <div style={{ height: '70vh', background: "linear-gradient(180deg, rgba(213, 212, 255, 0.65) -1.73%, #F7F7FF 100%)" }} className="w-full  p-4  rounded-xl   overflow-y-auto">
                                <div className='flex justify-between'>
                                    <div className='flex text-2xl'>
                                       {head}
                                    </div>

                                    {/* Create New Task button (visible on larger screens) */}
                                    <div onClick={createTask} className="flex-col justify-center p-2 bg-blue-900 hidden md:block lg:hidden lg:mx-2  rounded-xl  text-white rounded  ">
                                        Create New
                                    </div>
                                </div>

                                {/* Task items */}
                                {data.map(item => {
                                    return (
                                        <>

                                            <Task task={item} />
                                        </>
                                    );
                                })}
                            </div>

                            {/* Pending and Completed buttons */}
                            <div style={{ height: '10vh' }} className="w-full    bg-purple-400 rounded-bl-2xl rounded-br-2xl flex items-center justify-between">
                                {/* Pending button */}
                                <div onClick={handlePending} className="bg-indigo-200 h-full text-black font-inter font-bold hover:bg-gray-400 delay-100 text-2xl t flex items-center justify-center h-full  w-1/2 rounded-bl-2xl"><div>Pending</div></div>

                                {/* Completed button */}
                                <div onClick={handleComplete} className="bg-purple-50 bg-opacity-90 text-black font-inter hover:bg-gray-400 delay-100 font-bold text-2xl flex items-center justify-center h-full  w-1/2 ounded"><div>Completed</div></div>
                            </div>
                        </div>

                        {/* Task details (visible on larger screens) */}
                        <div style={{ height: '80vh', background: "linear-gradient(180deg, rgba(213, 212, 255, 0.65) -1.73%, #F7F7FF 100%)" }} class="hidden lg:block rounded-tr-xl col-span-2 md:col-span-1 lg:w-1/2   p-4">
                            <Detail task={task1} />
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
