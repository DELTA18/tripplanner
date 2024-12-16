import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/admin/login`, {
        name: username,
        password: password,
      });

      if (response.status === 200) {
        // Clear error and redirect to dashboard
        setError("");
        navigate("/admin");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <>
     <div className="py-8 bg-black w-full"></div>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleLogin} className="w-full" variant="primary">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  );
};

export default AdminLogin;
