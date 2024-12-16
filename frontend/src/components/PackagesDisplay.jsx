import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import axios from "axios";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const PackagesDisplay = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(() => {
      const fetchPackages = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/packages`, {
            params: { page: currentPage, limit: 8 },
          });
          setPackages(response.data.packages);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching packages:", error);
          setLoading(false);
        }
      };
  
      fetchPackages();
    }, [currentPage]);
  
    const handlePageChange = (page) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    return (
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Packages</h2>
  
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        )}
  
        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeftLong size={24} />
        </button>

        <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowRightLong size={24} />
        </button>
      </div>

      </div>
    );
};

export default PackagesDisplay;
