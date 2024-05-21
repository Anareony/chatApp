import { Container } from "@mui/material";
import { SignInForm } from "@/features/auth/signin";

export default function SignInPage() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <SignInForm />
      </Container>
    </>
  );
}
