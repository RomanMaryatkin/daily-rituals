
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">Page not found</p>
      <Button asChild>
        <Link to="/">
          <Home className="mr-2" size={16} />
          Go to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
