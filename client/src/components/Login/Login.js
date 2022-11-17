import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './Login.css';

async function authenticateUser(username, password) {
    const body = { 
        username: username,
        password: password
    }
    return fetch('/api/users/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await authenticateUser(username, password);
        if (response.success) {
            setToken(response.token)
        } else {
            // TODO: Display invalid creds warning
        }
      }

    return(
        <>
            <h4>Please login</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" 
                    onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" 
                    onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}