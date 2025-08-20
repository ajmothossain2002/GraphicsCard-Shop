"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// Types
interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_pic?: string;
  createdAt: string;
  updatedAt: string;
  isVerified?: boolean;
  role?: string;
  profilepic:string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: UserProfile;
}

interface ApiError {
  message?: string;
  status?: number;
}

// Constants
const API_BASE_URL = "https://wtsacademy.dedicateddevelopers.us/api";

export const useUserProfile = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const tokenData = localStorage.getItem("authToken");
        if (tokenData) {
          const parsed = JSON.parse(tokenData);
       
          if (parsed.timestamp + parsed.expiresIn > Date.now()) {
            setAuthToken(parsed.token);
          } else {
            localStorage.removeItem("authToken");
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to retrieve token:", error);
        router.push("/login");
      }
    }
  }, [router]);


  const {
    data: userProfile,
    isLoading,
    error,
    refetch
  } = useQuery<UserProfile, AxiosError<ApiError>>({
    queryKey: ["userProfile", authToken],
    queryFn: async () => {
      if (!authToken) {
        throw new Error("No authentication token");
      }

      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/user/profile-details`,
        {
          headers: {
             "x-access-token": authToken,
          },
          timeout: 15000,
        }
      );

      return response.data.data;
    },
    enabled: !!authToken,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const logout = () => {
    try {
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getInitials = (firstName: string, lastName: string,) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return {
    userProfile,
    isLoading,
    error,
    refetch,
    logout,
    formatDate,
    getInitials,
    authToken,
  };
};
