import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  ButtonToolbar,
  Form,
  Heading,
  Panel,
  Schema,
  Stack,
} from "rsuite";
import { Routes } from "../../constant";
import useRegister from "../../Hooks/Auth/useRegister";
import Body, { FormControl } from "./Body";

const { StringType } = Schema.Types;

const model = Schema.Model({
  firstName: StringType()
    .isRequired("First name is required.")
    .minLength(3, "First name must be at least 3 characters long.")
    .maxLength(8, "First name must be no more than 8 characters long.")
    .pattern(
      /^[A-Za-z]+$/,
      "First name must contain only alphabetic characters."
    ),
  lastName: StringType()
    .isRequired("Last name is required.")
    .minLength(3, "Last name must be at least 3 characters long.")
    .maxLength(8, "Last name must be no more than 8 characters long.")
    .pattern(
      /^[A-Za-z]+$/,
      "First name must contain only alphabetic characters."
    ),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("Email is required."),
  password: StringType()
    .isRequired("Password is required.")
    .minLength(8, "Password must be at least 8 characters long."),
});

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useRegister();

  // State variable to store the selected option, defaulting to the first option

  const handleSubmit = () => {
    if (!firstName) return toast.info("First name is required.");
    if (!/^[A-Za-z]+$/.test(firstName))
      return toast.info("First name must contain only alphabetic characters.");
    if (firstName.length < 3 || firstName.length > 8)
      return toast.info("First name must be between 3 and 8 characters long.");
    if (!lastName) return toast.info("Last name is required.");
    if (!/^[A-Za-z]+$/.test(lastName))
      return toast.info("Last name must contain only alphabetic characters.");
    if (lastName.length < 3 || lastName.length > 8)
      return toast.info("Last name must be between 3 and 8 characters long.");
    if (!email) return toast.info("Email is required.");
    if (!password) return toast.info("Password is required.");
    if (password.length < 8)
      return toast.info("Password must be at least 8 characters long.");

    // Ensure email is in lowercase
    const lowerCaseEmail = email.toLowerCase();

    mutate(
      {
        first_name: firstName,
        last_name: lastName,
        email: lowerCaseEmail,
        password,
      },
      {
        onSuccess: () => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Body>
      <Panel
        header={<Heading className="text-dark p-3 ">Register</Heading>}
        className="bg-white"
        bordered
      >
        <Form model={model} fluid onSubmit={handleSubmit}>
          <FormControl
            name="firstName"
            placeholder="John"
            value={firstName}
            onChange={(e) => {
              setFirstName(e);
            }}
          />
          <FormControl
            name="lastName"
            placeholder="Carter"
            value={lastName}
            onChange={(e) => setLastName(e)}
          />
          <FormControl
            type="email"
            name="email"
            placeholder="mail@example.com"
            value={email}
            onChange={(e) => setEmail(e)}
          />
          <FormControl
            type="password"
            name="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e)}
          />

          <Form.Group>
            <ButtonToolbar>
              <Button
                type="submit"
                block
                loading={isPending}
                appearance="primary"
              >
                Register
              </Button>

              <div className="text-center w-100">
                <Stack
                  className="w-100 text-center text-dark mb-4"
                  justifyContent="center"
                >
                  By registering you accept our{" "}
                  <Button appearance="link" block>
                    terms and privacy policy
                  </Button>
                </Stack>
                <>
                  <Link
                    className="m-2 text-dark text-primary"
                    to={Routes.LOGIN}
                  >
                    Already have an account?
                  </Link>
                </>
              </div>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Panel>
    </Body>
  );
};

export default Register;
