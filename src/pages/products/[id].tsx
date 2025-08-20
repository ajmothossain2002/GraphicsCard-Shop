"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Badge,
  Grid,
  Stack,
} from "@mui/material";
import { ArrowBack, ShoppingCart, Add, Remove } from "@mui/icons-material";
import { dbService } from "@/lib/appwrite";
import { useCart } from "@/context/cartContext";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { addToCart, getItemQuantity, isInCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await dbService.getProduct(id);
      if (!response.success)
        throw new Error(response.error || "Product not found");
      return response.data;
    },
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        $id: product.$id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    setShowSuccess(true);
    setQuantity(1);
  };

  const currentCartQuantity = product ? getItemQuantity(product.$id) : 0;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background:
            "linear-gradient(to bottom right, #0f172a, #1e293b, #334155)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#06b6d4" }} />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(to bottom right, #0f172a, #1e293b, #334155)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#ef4444", mb: 2, fontWeight: 600 }}
        >
          Product Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: "#94a3b8", mb: 3 }}>
          The product you are looking for does not exist or may have been
          removed.
        </Typography>
        <Link href="/products" passHref>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #0891b2 0%, #1d4ed8 100%)",
              },
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
            }}
          >
            Browse Products
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0f172a, #1e293b, #334155)",
        color: "white",
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
            sx={{
              color: "#cbd5e1",
              "&:hover": {
                color: "#06b6d4",
                background: "rgba(6, 182, 212, 0.1)",
              },
            }}
          >
            Back
          </Button>

          <Badge
            badgeContent={currentCartQuantity}
            sx={{
              "& .MuiBadge-badge": {
                background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                color: "white",
              },
            }}
          >
            <IconButton
              onClick={() => router.push("/cart")}
              sx={{
                color: "#cbd5e1",
                "&:hover": {
                  color: "#06b6d4",
                  background: "rgba(6, 182, 212, 0.1)",
                },
              }}
            >
              <ShoppingCart />
            </IconButton>
          </Badge>
        </Box>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background:
                  "linear-gradient(to bottom right, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7))",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderRadius: "20px",
                p: 3,
                height: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/400/400";
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: "white", fontWeight: 700 }}
            >
              {product.name}
            </Typography>

            <Typography
              variant="h4"
              sx={{ color: "#10b981", mb: 2, fontWeight: 700 }}
            >
              ${product.price.toFixed(2)}
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ mb: 3, color: "#94a3b8", lineHeight: 1.7 }}
            >
              {product.description}
            </Typography>

            {/* Cart Status */}
            {currentCartQuantity > 0 && (
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  background: "rgba(6, 182, 212, 0.1)",
                  color: "#06b6d4",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  "& .MuiAlert-icon": {
                    color: "#06b6d4",
                  },
                }}
              >
                {currentCartQuantity} item(s) in your cart
              </Alert>
            )}

            {/* Quantity Selector */}
            <Box mb={3}>
              <Typography
                variant="body1"
                fontWeight="medium"
                mb={1}
                sx={{ color: "#e2e8f0" }}
              >
                Quantity
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  sx={{
                    color: "#06b6d4",
                    background: "rgba(6, 182, 212, 0.1)",
                    "&:hover": {
                      background: "rgba(6, 182, 212, 0.2)",
                    },
                    "&.Mui-disabled": {
                      color: "#475569",
                      background: "rgba(71, 85, 105, 0.1)",
                    },
                  }}
                >
                  <Remove />
                </IconButton>
                <Typography variant="h6" mx={2} sx={{ color: "white" }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => setQuantity((prev) => prev + 1)}
                  sx={{
                    color: "#06b6d4",
                    background: "rgba(6, 182, 212, 0.1)",
                    "&:hover": {
                      background: "rgba(6, 182, 212, 0.2)",
                    },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              mb={3}
              flexWrap="wrap"
              useFlexGap
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                sx={{
                  flex: 1,
                  minWidth: 200,
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0891b2 0%, #1d4ed8 100%)",
                  },
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Add to Cart
              </Button>

              {isInCart(product.$id) && (
                <Button
                  variant="outlined"
                  onClick={() => router.push("/cart")}
                  sx={{
                    flex: 1,
                    minWidth: 150,
                    color: "#06b6d4",
                    borderColor: "rgba(6, 182, 212, 0.5)",
                    "&:hover": {
                      borderColor: "#06b6d4",
                      background: "rgba(6, 182, 212, 0.1)",
                    },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  View Cart
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>

        {/* Success Notification */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{
              background: "#10b981",
              color: "white",
              borderRadius: "12px",
              "& .MuiAlert-icon": {
                color: "white",
              },
            }}
          >
            Added {quantity} item(s) to your cart!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
