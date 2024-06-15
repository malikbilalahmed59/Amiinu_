import { ReactNode } from "react";
import { Form, SelectPicker } from "rsuite";

interface ISelectPicker {
  value: string;
  label: string;
}
interface Props {
  value: string;
  name?: string;
  placeholder?: string;
  focus?: boolean;
  onChange: (v: string) => void;
  label?: string | ReactNode;
  isLoading?: boolean;
  data: ISelectPicker[];
  error?: string;
}

const CustomSelectPicker = ({
  value,
  name = "",
  data,
  onChange,
  label,
  isLoading = false,
  error,
}: Props) => {
  return (
    <Form.Group>
      <Form.ControlLabel className={name}>{label}</Form.ControlLabel>
      <SelectPicker
        loading={isLoading}
        className="w-100"
        data={data}
        name="packages"
        placeholder="Package"
        value={value}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e) => onChange(e as any)}
      />
      {error && <Form.HelpText className="text-danger">{error}</Form.HelpText>}
    </Form.Group>
  );
};

export default CustomSelectPicker;
