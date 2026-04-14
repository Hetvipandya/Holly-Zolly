import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import ContactCTA from "../../components/ContactCTA";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile] = useState({
    name: "Darshil Patel",
    email: "darshil@gmail.com",
    phone: "9876543210",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Ring Road",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380015",
      country: "India",
    },
    {
      id: 2,
      name: "Office",
      street: "SG Highway",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380054",
      country: "India",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const openAddForm = () => {
    setEditAddress(null);
    setShowForm(true);
  };

  const openEditForm = (address) => {
    setEditAddress(address);
    setShowForm(true);
  };

  const saveAddress = (data) => {
    if (editAddress) {
      setAddresses(addresses.map((a) => (a.id === data.id ? data : a)));
    } else {
      setAddresses([...addresses, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const deleteAddress = (id) => {
    if (window.confirm("Delete this address?")) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    navigate("/login");
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 mb-5 space-y-12">

        {/* PROFILE HEADER */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 flex flex-col md:flex-row items-between justify-between gap-6 shadow" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center gap-6">
          <FaUserCircle className="text-7xl opacity-90" />

          <div className="text-center md:text-left flex flex-col gap-1">
            <h2 className="text-2xl font-heading font-bold">
              {profile.name}
            </h2>
            <p className="text-lg opacity-90">{profile.email}</p>
            <p className="text-lg opacity-90">📞 {profile.phone}</p>
          </div>
          </div>

          {/* RIGHT – LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center md:flex-col justify-center gap-2 bg-white/15 hover:bg-accent bg-white/25 px-5 py-2 rounded-lg font-semibold transition "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* ADDRESSES */}
        <div className="bg-white rounded-xl shadow p-6 border border-primary/30" data-aos="fade-up" data-aos-duration="2500">
          <div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-4 mb-8">
            <h3 className="text-xl font-heading font-bold text-primary">
              Saved Addresses
            </h3>

            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              <FaPlus /> Add New Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <p className="text-gray-500">No address added</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="relative border rounded-xl p-5 hover:shadow-lg transition bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg text-primary">
                      {addr.name}
                    </h4>

                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditForm(addr)}
                        className="text-blue-600 hover:scale-110 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-red-600 hover:scale-110 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {addr.street}, {addr.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.state} - {addr.zip}
                  </p>
                  <p className="text-sm text-gray-600">{addr.country}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL */}
        {showForm && (
          <AddressForm
            onClose={() => setShowForm(false)}
            onSave={saveAddress}
            address={editAddress}
          />
        )}
      </div>

      <ContactCTA />
    </section>
  );
}
function AddressForm({ onClose, onSave, address }) {
  const [form, setForm] = useState(
    address || {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: address?.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

        <h3 className="text-xl font-heading font-bold mb-6 text-primary">
          {address ? "Edit Address" : "Add New Address"}
        </h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input name="name" placeholder="Address Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="border rounded px-3 py-2 md:col-span-2" required />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="border rounded px-3 py-2" required />
          <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="border rounded px-3 py-2" required />

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
