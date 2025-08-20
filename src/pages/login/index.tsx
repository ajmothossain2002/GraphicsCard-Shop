
// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Link,
//   Divider,
// } from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   Email as EmailIcon,
//   Lock as LockIcon,
// } from "@mui/icons-material";
// import { AxiosError } from "axios";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useMutation } from "@tanstack/react-query";
// import {  useSearchParams } from "next/navigation";

// // Types
// interface LoginFormInputs {
//   email: string;
//   password: string;
// }

// interface LoginResponse {
//   token?: string;
//   message?: string;
//   status?: boolean;
//   data?: {
//     user?: {
//       id: string;
//       email: string;
//       first_name?: string;
//       last_name?: string;
//       name?: string; 
//     };
//     token?: string;
//   };
// }

// interface ApiError {
//   message?: string;
//   errors?: Record<string, string[]>;
//   status?: number;
// }

// // Validation Schema
// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter a valid email address")
//     .required("Email is required")
//     .trim()
//     .lowercase(),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


// const Login: React.FC = () => {

//   const searchParams = useSearchParams();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     setError,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormInputs>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     mode: "onBlur",
//   });

//   const Authtoken = (token: string, userData?:any) => {
//     try {
//       console.log("Storing auth data:", { token, userData }); 
      
     
//       localStorage.setItem("token", token);

//       if (userData) {
//         const userProfile = {
//           name: userData.name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.email?.split('@')[0] || 'User',
//           email: userData.email,
//           id: userData.id,
//           first_name: userData.first_name,
//           last_name: userData.last_name,
//           avatar: userData.avatar || userData.profile_picture,
//         };
//         localStorage.setItem("userData", JSON.stringify(userProfile));
//       }

    
//       const authData = {
//         token,
//         user: userData || {},
//         timestamp: Date.now(),
//         expiresIn: 24 * 60 * 60 * 1000,
//       };
//       localStorage.setItem("authToken", JSON.stringify(authData));
      
//       // Trigger navbar update
//       window.dispatchEvent(new CustomEvent('auth-change'));
      
//       console.log("Successfully stored authentication data"); 
//     } catch (error) {
//       console.error("Failed to store authentication data:", error);
//       toast.error("Failed to save login session");
//     }
//   };

//   // Mutation
//   const mutation = useMutation<
//     LoginResponse,
//     AxiosError<ApiError>,
//     LoginFormInputs
//   >({
//     mutationFn: async (data) => {
//       console.log("Making login request with:", data); 
//       const response = await axios.post<LoginResponse>(
//         `${API_BASE_URL}/user/signin`,
//         {
//           email: data.email.toLowerCase().trim(),
//           password: data.password,
//         },
//         {
//           timeout: 15000,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Login response:", response.data); 
//       return response.data;
//     },

//     onSuccess: (data) => {
//       console.log("Login successful, processing data:", data); 
      
      
//       const token = data.token || data.data?.token;
//       const userData = data.data?.user;

//       console.log("Extracted token:", token);
//       console.log("Extracted userData:", userData); 

//       if (token) {
//         Authtoken(token, userData);
//         toast.success(data.message || "Login successful!");
//         reset();

//         const redirectTo = searchParams.get("redirect") || "/";
        
//         console.log("Redirecting to:", redirectTo); 
        
      
//         setTimeout(() => {
//           window.location.href = redirectTo;
//         }, 500);
//       } else {
//         console.error("No token found in response:", data); 
//         toast.error("Login failed: No authentication token received");
        
   
//         console.log("Full response structure:", JSON.stringify(data, null, 2));
//       }
//     },

//     onError: (error) => {
//       console.error("Login error:", error);
//       console.error("Error response:", error.response?.data); 

//       if (error.response?.data) {
//         const apiError = error.response.data;

//         if (apiError.errors) {
//           Object.entries(apiError.errors).forEach(([field, messages]) => {
//             if (Array.isArray(messages) && messages.length > 0) {
//               setError(field as keyof LoginFormInputs, {
//                 type: "server",
//                 message: messages[0],
//               });
//             }
//           });
//           return;
//         }

//         switch (error.response.status) {
//           case 401:
//             toast.error("Invalid email or password");
//             break;
//           case 403:
//             toast.error("Account is suspended. Please contact support.");
//             break;
//           case 429:
//             toast.error("Too many login attempts. Please try again later.");
//             break;
//           case 500:
//             toast.error("Server error. Please try again later.");
//             break;
//           default:
//             toast.error(apiError.message || "Login failed");
//         }
//       } else if (error.request) {
//         toast.error("Network error. Please check your connection.");
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     },
//   });

//   const onSubmit = async (data: LoginFormInputs) => {
//     try {
//       await mutation.mutateAsync(data);
//     } catch (error) {
//       console.error("Submit error:", error);
//     }
//   };

//   return (
//     <Box
//       component="main"
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         bgcolor: "grey.50",
//         py: 24,
//       }}
//     >
//       <Box
//         maxWidth={420}
//         width="100%"
//         mx="auto"
//         p={4}
//         sx={{
//           bgcolor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <Box textAlign="center" mb={4}>
//           <Typography variant="h4" fontWeight="bold">
//             Welcome Back
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Sign in to your account to continue
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           {/* Email */}
//           <Controller
//             name="email"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Email Address"
//                 type="email"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//                 disabled={mutation.isPending}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon
//                         color={errors.email ? "error" : "action"}
//                       />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}
//           />

//           {/* Password */}
//           <Controller
//             name="password"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//                 disabled={mutation.isPending}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon
//                         color={errors.password ? "error" : "action"}
//                       />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() =>
//                           setShowPassword((prev) => !prev)
//                         }
//                         edge="end"
//                         disabled={mutation.isPending}
//                       >
//                         {showPassword ? (
//                           <VisibilityOff />
//                         ) : (
//                           <Visibility />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}
//           />

//           <Box textAlign="right" mb={2}>
//             <Link href="/forgot-password" variant="body2">
//               Forgot your password?
//             </Link>
//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             size="large"
//             disabled={mutation.isPending || isSubmitting}
//             sx={{
//               mt: 2,
//               mb: 2,
//               height: 48,
//               textTransform: "none",
//               fontSize: "1.1rem",
//             }}
//           >
//             {mutation.isPending ? (
//               <>
//                 <CircularProgress size={20} sx={{ mr: 1 }} />
//                 Signing in...
//               </>
//             ) : (
//               "Sign In"
//             )}
//           </Button>

//           {mutation.isError && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               Login failed. Please check your credentials.
//             </Alert>
//           )}
//         </form>

//         <Divider sx={{ my: 3 }}>
//           <Typography variant="body2" color="text.secondary">
//             OR
//           </Typography>
//         </Divider>

//         <Box textAlign="center">
//           <Typography variant="body2">
//             Don&apos;t have an account?{" "}
//             <Link href="/register" color="primary">
//               Create one here
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Login;

"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// Types
interface LoginFormInputs {
  email: string;
  password: string;

}

interface UserProfile {
  name: string;
  email?: string;
  id?: string | number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

interface AuthData {
  token: string;
   user: Partial<UserData>;
  timestamp: number;
  expiresIn: number;
}

interface LoginResponse {
  token?: string;
  message?: string;
  status?: boolean;
  data?: {
    user?: {
      id: string;
      email: string;
      first_name?: string;
      last_name?: string;
      name?: string;
      avatar?: string;
      profile_picture?: string;
    };
    token?: string;
  };
}

interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim()
    .lowercase(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Login: React.FC = () => {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

 const Authtoken = (token: string, userData?:UserData) => {
  try {
    console.log("Storing auth data:", { token, userData });

    localStorage.setItem("token", token);

    if (userData) {
      const userProfile: UserProfile = {
        name:
          userData.name ||
          `${userData.first_name || ""} ${userData.last_name || ""}`.trim() ||
          userData.email?.split("@")[0] ||
          "User",
        email: userData.email,
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        avatar: userData.avatar || userData.profile_picture,
      };
      localStorage.setItem("userData", JSON.stringify(userProfile));
    }

    const authData: AuthData = {
  token,
  user: userData || {}, 
  timestamp: Date.now(),
  expiresIn: 24 * 60 * 60 * 1000,
};
    localStorage.setItem("authToken", JSON.stringify(authData));

  
    window.dispatchEvent(new CustomEvent("auth-change"));

    console.log("Successfully stored authentication data");
  } catch (error) {
    console.error("Failed to store authentication data:", error);
    toast.error("Failed to save login session");
  }
};
 
  const mutation = useMutation<LoginResponse, AxiosError<ApiError>, LoginFormInputs>({
    mutationFn: async (data) => {
      console.log("Making login request with:", data);
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/user/signin`,
        {
          email: data.email.toLowerCase().trim(),
          password: data.password,
        },
        {
          timeout: 15000,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Login response:", response.data);
      return response.data;
    },

    onSuccess: (data) => {
      console.log("Login successful, processing data:", data);

      const token = data.token || data.data?.token;
      const userData = data.data?.user;

      console.log("Extracted token:", token);
      console.log("Extracted userData:", userData);

      if (token) {
        Authtoken(token, userData);
        toast.success(data.message || "Login successful!");
        reset();

        const redirectTo = searchParams.get("redirect") || "/";
        console.log("Redirecting to:", redirectTo);

     
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 500);
      } else {
        console.error("No token found in response:", data);
        toast.error("Login failed: No authentication token received");
        console.log("Full response structure:", JSON.stringify(data, null, 2));
      }
    },

    onError: (error) => {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.data) {
        const apiError = error.response.data;

        if (apiError.errors) {
          Object.entries(apiError.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof LoginFormInputs, {
                type: "server",
                message: messages[0],
              });
            }
          });
          return;
        }

        switch (error.response.status) {
          case 401:
            toast.error("Invalid email or password");
            break;
          case 403:
            toast.error("Account is suspended. Please contact support.");
            break;
          case 429:
            toast.error("Too many login attempts. Please try again later.");
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            break;
          default:
            toast.error(apiError.message || "Login failed");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Dark gradient background
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 5,
          borderRadius: 3,
          // Purple glassy card
          background:
            "linear-gradient(135deg, rgba(50,0,80,0.95), rgba(25,25,35,0.97))",
          color: "#fff",
          boxShadow: "0 0 30px rgba(138,43,226,0.35)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 1.5,
              background: "linear-gradient(90deg, #a855f7, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: "#c084fc" }}>
            Sign in to your account to continue
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={mutation.isPending}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{ color: errors.email ? "#f87171" : "#c084fc" }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#9333ea" },
                    "&:hover fieldset": { borderColor: "#a855f7" },
                  },
                  "& .MuiInputLabel-root": { color: "#c084fc" },
                }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={mutation.isPending}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        sx={{ color: errors.password ? "#f87171" : "#c084fc" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        disabled={mutation.isPending}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#c084fc" }} />
                        ) : (
                          <Visibility sx={{ color: "#c084fc" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#9333ea" },
                    "&:hover fieldset": { borderColor: "#a855f7" },
                  },
                  "& .MuiInputLabel-root": { color: "#c084fc" },
                }}
              />
            )}
          />

          <Box textAlign="right" mb={2}>
            <Link href="/forgot-password" variant="body2" sx={{ color: "#a855f7" }}>
              Forgot your password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={mutation.isPending || isSubmitting}
            sx={{
              mt: 2,
              mb: 2,
              height: 48,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 700,
              background: "linear-gradient(90deg, #9333ea, #a855f7)",
              boxShadow: "0 0 15px rgba(168,85,247,0.35)",
              "&:hover": {
                background: "linear-gradient(90deg, #7e22ce, #a855f7)",
                boxShadow: "0 0 25px rgba(168,85,247,0.55)",
              },
            }}
          >
            {mutation.isPending ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: "#fff" }} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {mutation.isError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              Login failed. Please check your credentials.
            </Alert>
          )}
        </form>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.15)" }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            OR
          </Typography>
        </Divider>

        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" sx={{ color: "#a855f7", fontWeight: "bold" }}>
              Create one here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
