import React, { useState } from "react";
import "./register-form.scss";
import { Form, Button } from "react-bootstrap";
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

  const [registerUser, { error, data }] = useMutation<
    { registerUser: UserResponseData },
    { userInput: User }
  >(REGISTER_MUTATION,{
      variables: { userInput: {username, password, email}}
  });

  return (
    <div className="registerForm">
      <Form>
        {error ? <p>Error</p> : null}
        {data && console.log(data)}
        <Form.Group>
          <Form.Label>Email address :</Form.Label>
          <Form.Control onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUsername(e.target.value)} placeholder="Enter email" />
          <Form.Text className="text-muted">
            Username should be at least 6 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password :</Form.Label>
          <Form.Control onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Retype password :</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            Password should be at least 6 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" label="Remember me!" />
        </Form.Group>

        <Button
        onClick = {(e: any) => {e.preventDefault(); username && password && email && registerUser()}}
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
