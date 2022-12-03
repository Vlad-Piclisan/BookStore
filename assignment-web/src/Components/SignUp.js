import { Link, useNavigate } from "react-router-dom";
import { register as serverRegister } from "../Services/Auth";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [error, setError] = useState(null);

  async function onSubmit(payload) {
    try {
     await serverRegister(payload);
    }
    catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
    navigate("/");
  }

  return (

    <Container component="main" maxWidth="xs">
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
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Last Name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Author"
            {...register("author", {
              required: "Author Pseudonym is required",

            })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />
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
            {...register("confirmEmail", {
              required: "Email confirmation is required ",
              validate: (email) => email === watch("email"),
            })}
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message}
            label="Confirm Email Address"
            autoComplete="confirm-email"
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
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("confirmPassword", {
              required: "Confirming your password is required",
              validate: (password) => password === watch("password"), 
            })}
            label="Confirm Password"
            type="password"
            autoComplete="confirm-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          {error && (
            <Alert sx={{ my: 2 }} severity="error">
              {error.toString()}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/Forgot-Password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/Sign-In">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>





    </Container>
  );
};

export default SignUp;
