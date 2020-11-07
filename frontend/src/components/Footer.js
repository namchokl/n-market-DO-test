import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='mt-5'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; neighbor-Market
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
