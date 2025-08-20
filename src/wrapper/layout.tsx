'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from "./header";
import Footer from "./footer";
import { PropsWithChildren } from 'react';
import { CartProvider } from '@/context/cartContext';

const queryClient = new QueryClient();

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
       <CartProvider>

        <Header />
        
        
          {children}
   
   
        <Footer />
    
      </CartProvider>
    </QueryClientProvider>
  );
};

export default Layout;