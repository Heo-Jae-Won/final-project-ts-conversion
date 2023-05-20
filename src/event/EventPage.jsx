import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventList from './EventList'
import EventRead from './EventRead'

/**
 * Event에 관한 routing
 */

const EventPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/list" element={<EventList/>} />
        <Route path="/read/:eventCode" element={<EventRead/>} />
      </Routes>
    </div>
  )
}

export default EventPage