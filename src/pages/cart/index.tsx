// 



"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button, Typography, Box, TextField, Input } from "@mui/material";
import Link from "next/link";

const Cart: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3,
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        }}
      >
        <Box
          sx={{
            background: "rgba(45, 45, 45, 0.8)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            p: 6,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              color: "#ffffff",
              fontWeight: 600,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Your Cart is Empty 🛒
          </Typography>
          <Typography 
            variant="body1" 
            gutterBottom
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 3,
            }}
          >
            Add some products to get started.
          </Typography>
          <Link href="/" passHref>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                color: "#ffffff",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5855f5 0%, #7c3aed 100%)",
                  boxShadow: "0 12px 35px rgba(99, 102, 241, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Continue Shopping
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        maxWidth: "1200px", 
        mx: "auto", 
        p: 3,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      }}
    >
      {isCheckingOut ? (
        <Input />
      ) : (
        <>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              textAlign: "center",
              mb: 4,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Shopping Cart
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {cart.map((item) => (
              <Box
                key={item.$id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(45, 45, 45, 0.8)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 3,
                  p: 3,
                  gap: 3,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 120,
                    height: 120,
                    flexShrink: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="h6" 
                    noWrap
                    sx={{
                      color: "#ffffff",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography 
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      mb: 2,
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() =>
                        updateQuantity(item.$id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      sx={{
                        minWidth: "auto",
                        width: 40,
                        height: 40,
                        p: 0,
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                        "&:disabled": {
                          background: "rgba(255, 255, 255, 0.02)",
                          color: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    >
                      <Minus size={16} />
                    </Button>
                    <TextField
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1;
                        updateQuantity(item.$id, newQuantity);
                      }}
                      type="number"
                      inputProps={{ min: 1 }}
                      sx={{
                        width: 80,
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                          py: 1.2,
                          color: "#ffffff",
                          fontWeight: 600,
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                          background: "rgba(255, 255, 255, 0.05)",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#6366f1",
                          },
                        },
                      }}
                    />
                    <Button
                      onClick={() =>
                        updateQuantity(item.$id, item.quantity + 1)
                      }
                      sx={{
                        minWidth: "auto",
                        width: 40,
                        height: 40,
                        p: 0,
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={() => removeFromCart(item.$id)}
                    sx={{
                      minWidth: "auto",
                      width: 40,
                      height: 40,
                      p: 0,
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      borderRadius: 2,
                      "&:hover": {
                        background: "rgba(239, 68, 68, 0.2)",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <Trash2 size={18} />
                  </Button>
                  <Typography
                    variant="h6"
                    sx={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 4,
              background: "rgba(45, 45, 45, 0.8)",
              backdropFilter: "blur(20px)",
              p: 4,
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
              }}
            >
              Order Summary
            </Typography>
            
            <Box
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                mb: 2,
                py: 1,
              }}
            >
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Items
              </Typography>
              <Typography sx={{ color: "#ffffff", fontWeight: 600 }}>
                {totalItems}
              </Typography>
            </Box>
            
            <Box
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                mb: 3,
                py: 1,
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Subtotal
              </Typography>
              <Typography sx={{ color: "#ffffff", fontWeight: 600 }}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            
            <Box
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                mb: 4,
                py: 2,
                px: 3,
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                Total
              </Typography>
              <Typography 
                variant="h6" 
                sx={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                }}
              >
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setIsCheckingOut(true)}
                sx={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "#ffffff",
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5855f5 0%, #7c3aed 100%)",
                    boxShadow: "0 12px 35px rgba(99, 102, 241, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Proceed to Checkout
              </Button>
              <Button
                onClick={clearCart}
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  color: "#ef4444",
                  borderColor: "rgba(239, 68, 68, 0.3)",
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  background: "rgba(239, 68, 68, 0.05)",
                  "&:hover": {
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    background: "rgba(239, 68, 68, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Clear Cart
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;