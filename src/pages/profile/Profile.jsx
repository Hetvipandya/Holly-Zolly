// import { useState } from "react";
// import { FaPlus, FaEdit, FaTrash, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
// import ContactCTA from "../../components/ContactCTA";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const [profile] = useState({
//     name: "Darshil Patel",
//     email: "darshil@gmail.com",
//     phone: "9876543210",
//   });

//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       name: "Home",
//       street: "123 Ring Road",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       zip: "380015",
//       country: "India",
//     },
//     {
//       id: 2,
//       name: "Office",
//       street: "SG Highway",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       zip: "380054",
//       country: "India",
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);

//   const openAddForm = () => {
//     setEditAddress(null);
//     setShowForm(true);
//   };

//   const openEditForm = (address) => {
//     setEditAddress(address);
//     setShowForm(true);
//   };

//   const saveAddress = (data) => {
//     if (editAddress) {
//       setAddresses(addresses.map((a) => (a.id === data.id ? data : a)));
//     } else {
//       setAddresses([...addresses, { ...data, id: Date.now() }]);
//     }
//     setShowForm(false);
//   };

//   const deleteAddress = (id) => {
//     if (window.confirm("Delete this address?")) {
//       setAddresses(addresses.filter((a) => a.id !== id));
//     }
//   };

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (!confirmLogout) return;

//     navigate("/login");
//   };

//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="max-w-6xl mx-auto px-6 mb-5 space-y-12">

//         {/* PROFILE HEADER */}
//         <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 flex flex-col md:flex-row items-between justify-between gap-6 shadow" data-aos="fade-up">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//           <FaUserCircle className="text-7xl opacity-90" />

//           <div className="text-center md:text-left flex flex-col gap-1">
//             <h2 className="text-2xl font-heading font-bold">
//               {profile.name}
//             </h2>
//             <p className="text-lg opacity-90">{profile.email}</p>
//             <p className="text-lg opacity-90">📞 {profile.phone}</p>
//           </div>
//           </div>

//           {/* RIGHT – LOGOUT */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center md:flex-col justify-center gap-2 bg-white/15 hover:bg-accent bg-white/25 px-5 py-2 rounded-lg font-semibold transition "
//           >
//             <FaSignOutAlt />
//             Logout
//           </button>
//         </div>

//         {/* ADDRESSES */}
//         <div className="bg-white rounded-xl shadow p-6 border border-primary/30" data-aos="fade-up" data-aos-duration="2500">
//           <div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-4 mb-8">
//             <h3 className="text-xl font-heading font-bold text-primary">
//               Saved Addresses
//             </h3>

//             <button
//               onClick={openAddForm}
//               className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition"
//             >
//               <FaPlus /> Add New Address
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <p className="text-gray-500">No address added</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {addresses.map((addr) => (
//                 <div
//                   key={addr.id}
//                   className="relative border rounded-xl p-5 hover:shadow-lg transition bg-gray-50"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h4 className="font-semibold text-lg text-primary">
//                       {addr.name}
//                     </h4>

//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => openEditForm(addr)}
//                         className="text-blue-600 hover:scale-110 transition"
//                         title="Edit"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => deleteAddress(addr.id)}
//                         className="text-red-600 hover:scale-110 transition"
//                         title="Delete"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>

//                   <p className="text-sm text-gray-600 mt-2">
//                     {addr.street}, {addr.city}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {addr.state} - {addr.zip}
//                   </p>
//                   <p className="text-sm text-gray-600">{addr.country}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* MODAL */}
//         {showForm && (
//           <AddressForm
//             onClose={() => setShowForm(false)}
//             onSave={saveAddress}
//             address={editAddress}
//           />
//         )}
//       </div>

//       <ContactCTA />
//     </section>
//   );
// }
// function AddressForm({ onClose, onSave, address }) {
//   const [form, setForm] = useState(
//     address || {
//       name: "",
//       street: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "",
//     }
//   );

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ ...form, id: address?.id });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//       <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

//         <h3 className="text-xl font-heading font-bold mb-6 text-primary">
//           {address ? "Edit Address" : "Add New Address"}
//         </h3>

//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//           <input name="name" placeholder="Address Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" required />
//           <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="border rounded px-3 py-2 md:col-span-2" required />
//           <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border rounded px-3 py-2" required />
//           <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border rounded px-3 py-2" required />
//           <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="border rounded px-3 py-2" required />
//           <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="border rounded px-3 py-2" required />

//           <div className="md:col-span-2 flex justify-end gap-3 mt-4">
//             <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
//               Cancel
//             </button>
//             <button type="submit" className="px-6 py-2 bg-primary text-white rounded">
//               Save Address
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaUserCircle, FaSignOutAlt, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
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
  const navigate = useNavigate();

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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/login");
    }
  };

  return (
    <section className="bg-[#FCFBFA] py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* PROFILE HEADER CARD */}
        <div className="bg-black rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden" data-aos="fade-up">
          {/* Background Aesthetic */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <FaUserCircle className="text-8xl text-orange-600 bg-white rounded-full border-4 border-orange-600/20" />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                {profile.name}
              </h2>
              <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm font-medium">
                <span className="flex items-center gap-2"><FaEnvelope className="text-orange-600" /> {profile.email}</span>
                <span className="flex items-center gap-2"><FaPhoneAlt className="text-orange-600" /> {profile.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="group relative z-10 flex items-center gap-3 bg-white/10 hover:bg-red-500 hover:text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 border border-white/5"
          >
            <FaSignOutAlt className="group-hover:rotate-12 transition-transform" />
            Logout
          </button>
        </div>

        {/* ADDRESS MANAGEMENT SECTION */}
        <div className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-10 border border-gray-100" data-aos="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h3 className="text-2xl font-heading font-bold text-black mb-1">
                Saved <span className="text-orange-600 italic">Addresses</span>
              </h3>
              <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Manage your delivery locations</p>
            </div>

            <button
              onClick={openAddForm}
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-gray-200 font-bold"
            >
              <FaPlus /> Add New
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
              <FaMapMarkerAlt className="mx-auto text-4xl text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">No saved addresses found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="group relative border border-gray-100 rounded-[2rem] p-8 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-500 bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                        <FaMapMarkerAlt />
                      </div>
                      <h4 className="font-bold text-lg text-black">
                        {addr.name}
                      </h4>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditForm(addr)}
                        className="w-10 h-10 rounded-xl bg-gray-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="w-10 h-10 rounded-xl bg-gray-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-gray-500 text-sm leading-relaxed">
                    <p className="font-medium text-black/70">{addr.street}</p>
                    <p>{addr.city}, {addr.state}</p>
                    <p className="font-mono text-[12px] bg-gray-50 w-fit px-2 py-0.5 rounded uppercase tracking-tighter">{addr.zip} • {addr.country}</p>
                  </div>
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <h3 className="text-2xl font-heading font-bold mb-8 text-black">
          {address ? "Update" : "Add"} <span className="text-orange-600 italic font-serif">Address</span>
        </h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">Address Label</label>
            <input name="name" placeholder="e.g. Home, Work" value={form.name} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all" required />
          </div>
          
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">Street Address</label>
            <input name="street" placeholder="House No, Street Name" value={form.street} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all" required />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">City</label>
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all" required />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">State</label>
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all" required />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">ZIP Code</label>
            <input name="zip" placeholder="Pincode" value={form.zip} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all" required />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 block">Country</label>
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all" required />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="px-8 py-4 text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" className="px-10 py-4 bg-black text-white rounded-2xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-900/10 transition-all uppercase tracking-widest text-sm">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}