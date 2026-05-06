import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import categoriesdata from "../../data/categories"
import { Link, useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState(categoriesdata);

  const deleteCategory = (id) => {
    if (window.confirm("Delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const navigate = useNavigate();

  const statusBadge = (status) =>
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary">
          Categories
        </h2>

        <Link to="/admin/categories/add"
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Category
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/70 text-light">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="p-3 font-semibold">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-14 w-14 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/56?text=No+Image";
                    }}
                  />
                </td>
                <td className="p-3 font-semibold">
                  {category.name}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      category.status
                    )}`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                    className="text-blue-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>


                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  );
}
