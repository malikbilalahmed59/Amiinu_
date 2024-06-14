import { Form, SelectPicker } from "rsuite";

interface ISelectPicker {
  value: string;
  label: string;
}
interface Props {
  value: string;
  name: string;
  placeholder?: string;
  focus?: boolean;
  onChange: (v: string) => void;
  label?: string;
  isLoading?: boolean;
  data: ISelectPicker[];
}

const CustomSelectPicker = ({
  value,
  name,
  data,
  onChange,
  label,
  isLoading = false,
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
    </Form.Group>
  );
};

export default CustomSelectPicker;
