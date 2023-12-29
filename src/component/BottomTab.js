import React from 'react'

const BottomTab = (props) => {
  return (
    <div style={{ height: '10vh' }} className="w-full      rounded-bl-2xl rounded-br-2xl flex items-center justify-between">
    {/* Pending button */}
    <div style={{ background:  `${props.tab.a}` }} onClick={props.handlePending} className=" h-full text-black font-inter font-semibold hover:bg-gray-400 delay-100 text-2xl t flex items-center justify-center h-full  w-1/2 rounded-bl-2xl"><div>Pending</div></div>

    {/* Completed button */}
    <div style={{ background:  `${props.tab.b}` }} onClick={props.handleComplete} className=" text-black font-inter hover:bg-gray-400 delay-100 font-semibold text-2xl flex items-center justify-center h-full  w-1/2 "><div>Completed</div></div>
</div>
  )
}

export default BottomTab