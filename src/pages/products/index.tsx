"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { dbService } from "@/lib/appwrite";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
interface Product {
  $id: string;
  name: string;
  price: number;
  image: string;
  quantity:number;
}


export default function ProductGrid() {
  const { addToCart } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await dbService.listProducts({
        limit: 12,
        orderBy: "price",
        orderDirection: "asc",
      });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });

  const handleAddToCart = (product:Product) => {
    addToCart({
      $id: product.$id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        background: '#10b981',
        color: '#fff',
      },
      position: 'bottom-right'
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <CircularProgress sx={{ color: "#06b6d4" }} />
          <Typography variant="body1" sx={{ color: "gray.400", mt: 2 }}>
            Loading products...
          </Typography>
        </Box>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
        <Box textAlign="center">
          <AlertCircle size={48} color="#ef4444" className="mx-auto mb-4" />
          <Typography variant="h6" sx={{ color: "red.400" }}>
            Error loading products
          </Typography>
        </Box>
      </div>
    );

  const products = data?.documents || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <Box sx={{ p: 4 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            color: "white", 
            textAlign: "center", 
            mb: 6,
            fontWeight: 700,
            background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Products
        </Typography>
        
        {/* Show message if no products */}
        {products.length === 0 ? (
          <Box textAlign="center" mt={8}>
            <ShoppingCart size={64} color="#6b7280" className="mx-auto mb-4" />
            <Typography variant="h6" sx={{ color: "gray.400" }}>
              No products available at the moment.
            </Typography>
            <Typography variant="body2" sx={{ color: "gray.500", mt: 1 }}>
              Check back later for new products
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {products.map((product) => (
              <Card
                key={product.$id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  background: "linear-gradient(to bottom right, rgba(30, 41, 59, 0.5), rgba(39, 39, 42, 0.5))",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.25), 0 8px 10px -6px rgba(6, 182, 212, 0.25)",
                    borderColor: "rgba(6, 182, 212, 0.5)",
                  },
                }}
              >
                <Link href={`/products/${product.$id}`} passHref>
                  <Box 
                    sx={{ 
                      position: "relative", 
                      height: 200, 
                      overflow: "hidden",
                      backgroundColor: "rgba(15, 23, 42, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      p: 2
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      style={{ 
                        objectFit: "contain",
                        width: "100%",
                        height: "100%"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/api/placeholder/200/200";
                      }}
                    />
                  </Box>
                </Link>
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
                  <Link href={`/products/${product.$id}`} passHref>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      sx={{ 
                        cursor: "pointer",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        lineHeight: 1.4,
                        mb: 2,
                        "&:hover": {
                          color: "#06b6d4"
                        }
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "rgba(156, 163, 175)", 
                      mb: 3,
                      flexGrow: 1,
                      fontSize: "0.9rem",
                      lineHeight: 1.5
                    }}
                  >
                    {product.description?.substring(0, 80) || "No description available"}...
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Typography variant="h5" sx={{ color: "#10b981", fontWeight: 700 }}>
                      ${product.price?.toFixed(2) || "0.00"}
                    </Typography>
                    {product.category && (
                      <Typography variant="caption" sx={{ color: "rgba(156, 163, 175)", bgcolor: "rgba(30, 41, 59, 0.7)", px: 1.5, py: 0.5, borderRadius: "12px" }}>
                        {product.category}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    sx={{ 
                      mt: "auto",
                      background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0891b2 0%, #1d4ed8 100%)",
                      },
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      py: 1.5,
                      fontSize: "1rem",
                      boxShadow: "0 4px 6px -1px rgba(6, 182, 212, 0.3), 0 2px 4px -1px rgba(6, 182, 212, 0.2)"
                    }}
                    startIcon={<ShoppingCart size={18} />}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}





