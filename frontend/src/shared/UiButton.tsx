import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {}

export function UiButton({ ...props }: CustomButtonProps) {
  return <Button {...props}></Button>;
}
