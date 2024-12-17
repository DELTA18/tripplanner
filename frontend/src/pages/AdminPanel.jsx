import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Textarea } from "@/components/ui/textarea"; // ShadCN Textarea
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"; // ShadCN Table
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // ShadCN Dialog

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState("");
  const [error, setError] = useState("");
  const [newPackage, setNewPackage] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState(null);
  const username = "admin";
  const password = "password123";

  const backendurl = import.meta.env.VITE_BACKEND_URI || "http://localhost:3000";

  // Fetch all packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${backendurl}/api/packages/allpackages`);
        setPackages(response.data);
      } catch (err) {
        console.error("Error fetching packages", err);
      }
    };
    fetchPackages();
  }, [newPackage]);

  // Handle package deletion
  const deletePackage = async (id) => {
    try {
      await axios.delete(`${backendurl}/api/admin/packages/${id}`, {
        data: {
          name: username,
          password: password,
        },
      });
      setNewPackage({}); // Reset state after deletion
    } catch (err) {
      console.error("Error deleting package", err);
    }
  };

  // Handle form submission to create a new package
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPkg = {
      title,
      description,
      price,
      availableDates,
      coverImage,
      additionalImages,
    };
    try {
      const response = await axios.post(`${backendurl}/api/admin/packages`,{
        name: username,
        password: password,
      },
      {
        params: {
          newPkg: JSON.stringify(newPkg),  // Send updatedPackage as query param
        },
      });
      setNewPackage(response.data); // Update state with the newly created package
      resetForm();
    } catch (err) {
      setError("Failed to add package. Please try again.");
    }
  };

  // Handle package update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPackage = {
      title,
      description,
      price,
      availableDates,
      coverImage,
      additionalImages,
    };
    try {
      const response = await axios.put(`${backendurl}/api/admin/packages/${packageToEdit._id}`,
        {
            name: username,
            password: password,
          },
          {
            params: {
              updatedPackage: JSON.stringify(updatedPackage),  // Send updatedPackage as query param
            },
          });
      setNewPackage(response.data); // Update state with the updated package
      resetForm();
      setIsEditMode(false); // Close edit mode
    } catch (err) {
      setError("Failed to update package. Please try again.");
    }
  };

  // Open package for editing
  const editPackage = (pkg) => {
    setIsEditMode(true);
    setPackageToEdit(pkg);
    setTitle(pkg.title);
    setDescription(pkg.description);
    setPrice(pkg.price);
    setAvailableDates(pkg.availableDates);
    setCoverImage(pkg.coverImage);
    setAdditionalImages(pkg.additionalImages);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setAvailableDates("");
    setCoverImage("");
    setAdditionalImages("");
  };

  
  return (
    <>
     <div className="py-8 bg-black w-full"></div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Form to create or update a package */}
      <div className="mb-6">
        <h3 className={`text-xl font-semibold mb-2 `}>{isEditMode ? "Update Package" : "Create New Package"}</h3>
        <form onSubmit={isEditMode ? handleUpdate : handleSubmit} className="space-y-4">
          <Input
            label="Package Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter package title"
          />
          <Textarea
            label="Package Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter package description"
          />
          <Input
            label="Package Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter package price"
          />
          <Input
            label="Available Dates"
            type="text"
            value={availableDates}
            onChange={(e) => setAvailableDates(e.target.value)}
            placeholder="Enter available dates"
          />
          <Input
            label="Cover Image URL"
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Enter cover image URL"
          />
          <Input
            label="Additional Images (comma-separated)"
            type="text"
            value={additionalImages}
            onChange={(e) => setAdditionalImages(e.target.value)}
            placeholder="Enter additional image URLs"
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className={`${isEditMode ? "bg-blue-600" : "bg-green-600"}`} variant="primary">{isEditMode ? "Update Package" : "Create Package"}</Button>
        </form>
      </div>

      {/* Packages List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Packages List</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg._id}>
                <TableCell>{pkg.title}</TableCell>
                <TableCell>{pkg.description}</TableCell>
                <TableCell>${pkg.price}</TableCell>
                <TableCell>
                  <Button variant="secondary" className=" bg-blue-500 mr-1" onClick={() => { editPackage(pkg); scrollToTop(); }}>Edit</Button>
                  <Button variant="danger" className=" bg-red-500" onClick={() => deletePackage(pkg._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
