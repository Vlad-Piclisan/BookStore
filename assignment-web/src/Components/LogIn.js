import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { login } from "../Services/Auth";
import { storeToken } from "../Services/Configs";
import { useAuthContext } from "../Hooks/Contexts/authContext";
const LogIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const {setUser} = useAuthContext();


  const onSubmit = async (payload) => {
    try {
      const result = await login(payload)
      setUser(result.data.user)
      storeToken(result.data.token)
      navigate("/")
    } catch (err) {
      alert(err.response.data.message);
    }
    console.log(payload)

  }


  return (


    <Container component="form" maxWidth="xs" onSubmit={handleSubmit(onSubmit)}>
      <Box

        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </Box>

      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        {...register("password", {
          required: "Password is required",
        })}
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {/* {error && (
        <Alert sx={{ my: 2 }} severity="error">
          {error.toString()}
        </Alert>
      )} */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log In
      </Button>



    </Container>
  );
};




export default LogIn;