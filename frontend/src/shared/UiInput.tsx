import { TextField, TextFieldProps } from "@mui/material";

export function UiInput({ ...props }: TextFieldProps) {
  return (
    <div>
      <TextField {...props} />
    </div>
  );
}
