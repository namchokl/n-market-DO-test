import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='searchbox'>
      <div className='input-group'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          // className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <div class='input-group-append'>
          <Button type='submit' variant='outline-success' className='py-2 px-3'>
            <i class='fas fa-search'></i>
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default SearchBox
