import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

// bring 'match' for the 'id' params 
//       'location' for the query string e.g. "?qty=1"
//       'history' for redecting
const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    // location.search  ->  "?qty=1"
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    
    return <div>Cart</div>
}

export default CartScreen
