import React, { useState, useRef } from "react";
import "./register-form.scss";
import { Form, Button, Alert } from "react-bootstrap";
import {
  REGISTER_MUTATION,
  UserResponseData,
  User,
} from "../../Model/UserInput";
import { useMutation } from "@apollo/react-hooks";

interface RegisterFormProps {}

export default function RegisterForm({}: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [retypeMatch, setRetypeMatch] = useState(true);

  const [registerUser, { error, data }] = useMutation<
    { registerUser : UserResponseData },
    { userInput: User }
  >(REGISTER_MUTATION, {
    variables: { userInput: { username, password, email } },
  });

  const handleOutFocus = () => {
      if(retypePassword === password) setRetypeMatch(true);
      if(retypePassword !== password) setRetypeMatch(false);
  } 
  const handleRetypePassword = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRetypePassword(e.target.value);
    if (e.target.value === password) setRetypeMatch(true);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username && password && retypeMatch) {
      registerUser();
      window.location.reload();
    }
  }
  return (
    <div className="registerForm">
      <Form onSubmit={handleSubmit}>
        {error ? <p>Error</p> : null}
        {data && console.log(data)}
        <Form.Group>
          <Form.Label>Email address :</Form.Label>
          <Form.Control
            required
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setEmail(e.target.value)
            }
            type="email"
            placeholder="Enter your email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            required
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Enter your username"
          />
          <Form.Text className="text-muted">
            Username should be at least 6 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password :</Form.Label>
          <Form.Control
            required
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            placeholder="Enter your password"
          />
          <Form.Text className="text-muted">
            Password should be at least 6 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Retype password :</Form.Label>
          <Form.Control
            required
            onBlur={handleOutFocus}
            onChange={handleRetypePassword
            }
            type="password"
            placeholder="Password"
          />
          {!retypeMatch && <Alert className="matchAlert" variant="danger"> Your password doesn't match!</Alert>}
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" label="Remember me!" />
        </Form.Group>

        <Button
          onClick={handleSubmit}
          variant="outline-success"
          className="regSubmitBtn"
          type="submit"
        >
          Start using Liantra
        </Button>
      </Form>
    </div>
  );
}
