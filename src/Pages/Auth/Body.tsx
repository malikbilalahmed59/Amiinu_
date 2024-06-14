import { PropsWithChildren } from "react";
import { Col, Container, FlexboxGrid, Form } from "rsuite";
import "./style.css";

const Body = ({ children }: PropsWithChildren) => {
  return (
    <Container
      className="auth-wrapper"
      style={{
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item
          colspan={24}
          md={12}
          lg={8}
          as={Col}
          className="auth-container"
        >
          {children}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

interface Props {
  value: string;
  type?: "password" | "email" | "text";
  name: string;
  placeholder: string;
  focus?: boolean;
  onChange: (v: string) => void;
}
export function FormControl({
  value,
  onChange,
  placeholder,
  focus = false,
  name,
  type = "text",
}: Props) {
  return (
    <Form.Group>
      <Form.Control
        className="bg-white text-dark"
        autoComplete="off"
        autoFocus={focus}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </Form.Group>
  );
}
export default Body;
