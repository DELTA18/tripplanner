import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            Travel Agency
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-300">
            Home
          </Link>
          <Link to="/admin/login" className="text-white hover:text-blue-300">
            Admin Panel
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white">
                ☰
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <DropdownMenuItem>
                <Link to="/" className="hover:text-blue-300">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin/login" className="hover:text-blue-300">
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
