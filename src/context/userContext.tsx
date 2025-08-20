import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: Address;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
}

interface UserContextType {
  profile: UserProfile;
  addresses: Address[];
  orders: Order[];
  updateProfile: (profile: UserProfile) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock user profile
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-01-15',
  });

  // Mock addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      name: 'John Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  // Mock orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2024-08-15',
      status: 'delivered',
      items: [
        {
          id: 1,
          title: 'iPhone 15 Pro',
          price: 999.99,
          quantity: 1,
          thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%209/1.jpg',
        },
      ],
      total: 1079.99,
      shippingAddress: addresses[0],
    },
    {
      id: 'ORD-002',
      date: '2024-08-10',
      status: 'shipped',
      items: [
        {
          id: 2,
          title: 'MacBook Pro',
          price: 1299.99,
          quantity: 1,
          thumbnail: 'https://cdn.dummyjson.com/products/images/laptops/MacBook%20Pro/1.jpg',
        },
      ],
      total: 1403.99,
      shippingAddress: addresses[0],
    },
    {
      id: 'ORD-003',
      date: '2024-08-05',
      status: 'processing',
      items: [
        {
          id: 3,
          title: 'AirPods Pro',
          price: 249.99,
          quantity: 2,
          thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.jpg',
        },
      ],
      total: 539.98,
      shippingAddress: addresses[1],
    },
  ]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addressData,
      id: Date.now().toString(),
    };
    
    if (addresses.length === 0 || addressData.isDefault) {
      setAddresses(prev => [
        ...prev.map(addr => ({ ...addr, isDefault: false })),
        newAddress,
      ]);
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
  };

  const updateAddress = (id: string, addressData: Omit<Address, 'id'>) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === id ? { ...addressData, id } : addr
    ));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => {
      const filtered = prev.filter(addr => addr.id !== id);
      // If we deleted the default address, make the first one default
      if (filtered.length > 0 && !filtered.some(addr => addr.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const value: UserContextType = {
    profile,
    addresses,
    orders,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    addOrder,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};