import { Form, Input } from "rsuite";

interface Props {
  value: string;
  type?: "password" | "email" | "text" | "date" | "number" | "textarea";
  name: string;
  placeholder: string;
  focus?: boolean;
  onChange: (v: string) => void;
  label?: string;
}

export function FormControl({
  value,
  onChange,
  placeholder,
  focus = false,
  name,
  type = "text",
  label,
}: Props) {
  return (
    <Form.Group>
      {label && <Form.ControlLabel>{label}</Form.ControlLabel>}
      {type === "textarea" ? (
        <Input
          className="bg-white text-dark"
          autoComplete="off"
          as="textarea"
          autoFocus={focus}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
      ) : (
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
      )}
    </Form.Group>
  );
}

export default FormControl;
