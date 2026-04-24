import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoriesData from "../../data/categories"; // your dataset

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    parent: "",
    status: "Active",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔹 FETCH CATEGORY BY ID
  useEffect(() => {
    // ✅ LOCAL DATA (replace with API later)
    const category = categoriesData.find(
      (c) => String(c.id) === id
    );

    if (!category) {
      navigate("/admin/categories");
      return;
    }

    setForm({
      name: category.name,
      parent: category.parent || "",
      status: category.status,
      image: category.image || null,
    });

    setLoading(false);

    // ✅ API VERSION (later)
    /*
    fetch(`/api/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      });
    */
  }, [id, navigate]);

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🔹 IMAGE CHANGE
  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🔹 UPDATE CATEGORY
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = {
      id,
      ...form,
    };

    console.log("UPDATED CATEGORY:", updatedCategory);

    // ✅ API UPDATE
    /*
    fetch(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCategory),
      headers: { "Content-Type": "application/json" },
    }).then(() => navigate("/admin/categories"));
    */

    navigate("/admin/categories");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow ">
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Edit Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* IMAGE */}
        <div>
          <label className="font-semibold block mb-1">
            Category Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />
          {form.image && typeof form.image === "string" && (
            <img
              src={form.image}
              alt="Category"
              className="h-20 mt-2 rounded"
            />
          )}
        </div>

        {/* NAME */}
        <div>
          <label className="font-semibold block mb-1">
            Category Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* PARENT */}
        <div>
          <label className="font-semibold block mb-1">
            Parent Category
          </label>
          <input
            name="parent"
            value={form.parent}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            placeholder="Optional"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="font-semibold block mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
