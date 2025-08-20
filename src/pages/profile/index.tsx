"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  Avatar,
  Card,
  CardContent,
  Chip,
  IconButton,
  Skeleton,
  Divider,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  CalendarViewDayRounded,
  CameraAltRounded,
  Edit,
  Logout,
  Mail,
  Person,
  Settings,
  Shield,
} from "@mui/icons-material";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const {
    userProfile,
    isLoading,
    error,
    refetch,
    logout,
    formatDate,
    getInitials,
  } = useUserProfile();
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          p: 3,
        }}
      >
        <Box maxWidth={800} mx="auto" pt={4}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Skeleton
              variant="rectangular"
              width="48%"
              height={200}
              sx={{
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="rectangular"
              width="48%"
              height={200}
              sx={{
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            background: "rgba(45, 45, 45, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          <Alert
            severity="error"
            sx={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              mb: 3,
            }}
          >
            Failed to load profile data
          </Alert>
          <Button
            variant="contained"
            onClick={() => refetch()}
            sx={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              mr: 2,
            }}
          >
            Retry
          </Button>
          <Button
            variant="outlined"
            onClick={logout}
            sx={{
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            Logout
          </Button>
        </Card>
      </Box>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        p: 3,
      }}
    >
      <Box maxWidth={800} mx="auto" pt={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            My Profile
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={logout}
            sx={{
              color: "#ef4444",
              borderColor: "rgba(239, 68, 68, 0.3)",
              background: "rgba(239, 68, 68, 0.05)",
              "&:hover": {
                borderColor: "rgba(239, 68, 68, 0.5)",
                background: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Box>

        <Card
          sx={{
            background: "rgba(45, 45, 45, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 4,
                flexWrap: { xs: "wrap", md: "nowrap" },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={userProfile.profilepic}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    fontSize: "2rem",
                    fontWeight: 700,
                  }}
                >
                  {!userProfile.profilepic &&
                    getInitials(userProfile.first_name, userProfile.last_name)}
                </Avatar>
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5855f5 0%, #7c3aed 100%)",
                    },
                  }}
                >
                  <CameraAltRounded
                    sx={{ color: "#ffffff", fontSize: "1.2rem" }}
                  />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {userProfile.first_name} {userProfile.last_name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Mail sx={{ fontSize: "1.1rem" }} />
                  {userProfile.email}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {userProfile.isVerified && (
                    <Chip
                      icon={<Shield sx={{ fontSize: "1rem" }} />}
                      label="Verified"
                      sx={{
                        background: "rgba(34, 197, 94, 0.2)",
                        color: "#22c55e",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                      }}
                    />
                  )}
                  {userProfile.role && (
                    <Chip
                      label={userProfile.role}
                      sx={{
                        background: "rgba(99, 102, 241, 0.2)",
                        color: "#6366f1",
                        border: "1px solid rgba(99, 102, 241, 0.3)",
                      }}
                    />
                  )}
                </Box>
              </Box>

              <Button
                variant="contained"
                startIcon={<Edit />}
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5855f5 0%, #7c3aed 100%)",
                  },
                }}
                onClick={() => router.push("/profile/edit")}
              >
                Edit Profile
              </Button>
            </Box>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  p: 3,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Person />
                  Personal Information
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 0.5 }}
                    >
                      First Name
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontWeight: 500 }}>
                      {userProfile.first_name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 0.5 }}
                    >
                      Last Name
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontWeight: 500 }}>
                      {userProfile.last_name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 0.5 }}
                    >
                      Email Address
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontWeight: 500 }}>
                      {userProfile.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  p: 3,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CalendarViewDayRounded />
                  Account Information
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 0.5 }}
                    >
                      Account ID
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 500,
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                      }}
                    >
                      {userProfile._id}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 0.5 }}
                    >
                      Member Since
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontWeight: 500 }}>
                      {formatDate(userProfile.createdAt)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 0.5 }}
                    >
                      Last Updated
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontWeight: 500 }}>
                      {formatDate(userProfile.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            background: "rgba(45, 45, 45, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Settings />
              Quick Actions
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => router.push("/profile/edit")}
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.05)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={() => router.push("/settings")}
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.05)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Account Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProfilePage;
