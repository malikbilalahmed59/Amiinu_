import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import {
  Button,
  ButtonToolbar,
  Form,
  Heading,
  Panel,
  Schema,
  Stack,
} from "rsuite";
import useLogin from "../../Hooks/Auth/useLogin";
import { Routes } from "../../constant";
import Body, { FormControl } from "./Body";

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  password: StringType()
    .isRequired("This field is required.")
    .minLength(8, "Password must be at least 8 characters long."),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();

  const handleLogin = () => {
    if (!email) return toast.info("Email is required.");
    if (!password) return toast.info("Password is required.");
    const lowerCaseEmail = email.toLowerCase();
    mutate(
      {
        email: lowerCaseEmail,
        password,
      },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
          console.log("success", email, password);
        },
      }
    );
  };

  return (
    <>
      <Body>
        <Panel
          header={<Heading className="text-dark p-3">Welcome Back!</Heading>}
          bordered
          className="bg-white py-5"
        >
          <Form model={model} fluid onSubmit={handleLogin} className="px-3">
            <FormControl
              name="email"
              focus={true}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e);
              }}
            />
            <FormControl
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e);
              }}
            />

            <Form.Group>
              <ButtonToolbar>
                <Button
                  loading={isPending}
                  type="submit"
                  appearance="ghost"
                  block
                >
                  Sign in
                </Button>

                <div className="text-center w-100">
                  <Stack
                    className="w-100 text-center text-dark termsText"
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
                      to={Routes.REGISTER}
                    >
                      Create account?
                    </Link>
                  </>
                </div>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </Panel>
      </Body>
    </>
  );
};

export default Login;
