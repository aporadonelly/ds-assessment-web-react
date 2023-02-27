import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { get } from "lodash";

import { useNouns } from "./queries";
import { useConferenceVerification } from "./mutations";
import Form from "./components/form";

const schema = z.object({
  homeRoomName: z.string().min(1),
  studentNumber: z.string().min(1),
  nounIds: z.array(z.number()).min(2),
});

function App() {
  const nouns = useNouns();
  const conferenceVerification = useConferenceVerification();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formMethods = useForm<z.infer<typeof schema>>({
    defaultValues: {
      homeRoomName: "",
      studentNumber: "",
      nounIds: [],
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  const handleSubmit = (values: z.infer<typeof schema>) => {
    conferenceVerification.mutate(values, {
      onSuccess: () => {
        setIsLoggedIn((prevState) => !prevState);
      },
    });
  };

  if (conferenceVerification.isSuccess && isLoggedIn) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography>
          Welcome, Parents of Student {conferenceVerification.data.studentNumber}! Conference will start soon...
        </Typography>
        <Button onClick={() => setIsLoggedIn((prevState) => !prevState)}>
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {conferenceVerification.isError && (
            <Alert variant="filled" severity="error">
              {get(conferenceVerification.error, "response.data.message")}
            </Alert>
          )}
          <Avatar sx={{ m: 1, mt: 2, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Form {...formMethods} onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Form.Input label="Home Room" name="homeRoomName" />
                <Form.Input label="Student Number" name="studentNumber" />
                <Form.ImageSelection
                  name="nounIds"
                  options={nouns.data}
                  optionValueKey="id"
                  optionImgSrcKey="imgSrc"
                />
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  disabled={conferenceVerification.isLoading}
                >
                  Sign In
                </Button>
              </Stack>
            </Form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;