import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import axios from "axios";

const PackagesDisplay = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/packages");
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

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
    </div>
  );
};

export default PackagesDisplay;
