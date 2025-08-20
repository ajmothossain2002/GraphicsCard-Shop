// src/components/ProfileDropdown.tsx
import Link from "next/link";

interface ProfileDropdownProps {
  onLogout: () => void;
}

export default function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-800">View Profile</Link>
      <Link href="/admin" className="block px-4 py-2 hover:bg-gray-800">Admin</Link>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
      >
        Logout
      </button>
    </div>
  );
}
