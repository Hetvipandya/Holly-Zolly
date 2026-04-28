import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserCircle,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import ContactCTA from "../../components/ContactCTA";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // ✅ USER STATE
  const [profile, setProfile] = useState(null);

  // ✅ ADDRESS STATE
  const [addresses, setAddresses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  // 🔥 LOAD USER + ADDRESSES
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    setProfile(user);

    const savedAddresses =
      JSON.parse(localStorage.getItem(`addresses_${user.email}`)) || [];

    setAddresses(savedAddresses);
  }, [navigate]);

  const openAddForm = () => {
    setEditAddress(null);
    setShowForm(true);
  };

  const openEditForm = (address) => {
    setEditAddress(address); 
    setShowForm(true);
  };

  // ✅ SAVE ADDRESS (PER USER)
  const saveAddress = (data) => {
    let updated;

    if (editAddress) {
      updated = addresses.map((a) => (a.id === data.id ? data : a));
    } else {
      updated = [...addresses, { ...data, id: Date.now() }];
    }

    setAddresses(updated);

    const user = JSON.parse(localStorage.getItem("currentUser"));
    localStorage.setItem(
      `addresses_${user.email}`,
      JSON.stringify(updated)
    );

    setShowForm(false);
  };

  // ✅ DELETE ADDRESS
  const deleteAddress = (id) => {
    if (window.confirm("Delete this address?")) {
      const updated = addresses.filter((a) => a.id !== id);
      setAddresses(updated);

      const user = JSON.parse(localStorage.getItem("currentUser"));
      localStorage.setItem(
        `addresses_${user.email}`,
        JSON.stringify(updated)
      );
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      navigate("/login");
    }
  };

  if (profile === null) {
    return null;
  }

  return (
    <section className="bg-[#FCFBFA] py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* PROFILE HEADER */}
        <div className="bg-black rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <FaUserCircle className="text-8xl text-orange-600 bg-white rounded-full border-4 border-orange-600/20" />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">
                {profile?.name}
              </h2>

              <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-2">
                  <FaEnvelope className="text-orange-600" />
                  {profile?.email}
                </span>

                <span className="flex items-center gap-2">
                  <FaPhoneAlt className="text-orange-600" />
                  {profile?.phone || "No phone added"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-white/10 hover:bg-red-500 px-8 py-3 rounded-2xl font-bold transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* ADDRESS SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100">

          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold">
              Saved <span className="text-orange-600">Addresses</span>
            </h3>

            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-orange-600"
            >
              <FaPlus /> Add New
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No addresses found
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="border rounded-2xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between mb-3">
                    <h4 className="font-bold">{addr.name}</h4>

                    <div className="flex gap-2">
                      <button onClick={() => openEditForm(addr)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteAddress(addr.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state}</p>
                  <p>{addr.zip} • {addr.country}</p>
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

      <div className="mt-16">
        <ContactCTA />
      </div>
    </section>
  );
}

// ================= FORM =================

function AddressForm({ onClose, onSave, address }) {
  const [form, setForm] = useState(
    address || {
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl w-full max-w-lg">

        <h3 className="text-xl font-bold mb-6">
          {address ? "Update" : "Add"} Address
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

          <input name="zip" placeholder="Pincode" value={form.zip} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

          <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose}>Cancel</button>
            <button className="bg-black text-white px-6 py-2 rounded-xl">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}