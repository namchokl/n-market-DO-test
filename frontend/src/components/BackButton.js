import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({ path }) => {
  return (
    <Link to={path} className='btn btn-light my-1 float-right'>
      Go Back
    </Link>
  )
}

export default BackButton
