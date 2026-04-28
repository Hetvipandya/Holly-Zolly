// import { useState, useEffect } from "react";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaPhoneAlt,
// } from "react-icons/fa";
// import ContactCTA from "../../components/ContactCTA";
// import { useNavigate } from "react-router-dom";
// import { client } from "../../lib/sanity";

// export default function Profile() {
//   const navigate = useNavigate();

//   // ✅ USER STATE
//   const [profile, setProfile] = useState(null);

//   // ✅ ADDRESS STATE
//   const [addresses, setAddresses] = useState([]);

//   const [showForm, setShowForm] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);

//   // 🔥 LOAD USER + ADDRESSES
// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   if (!user) { navigate("/login"); return; }
//   setProfile(user);

//   const fetchData = async () => {
//     try {
//       // Query profile instead of separate address docs
//       const data = await client.fetch(
//         `*[_type == "profile" && email == $email][0]`,
//         { email: user.email }
//       );
      
//       if (data?.addresses) {
//         setAddresses(data.addresses);
//       }
//     } catch (err) {
//       console.log("Fetch Error:", err);
//     }
//   };
//   fetchData();
// }, [navigate]);

//   const openAddForm = () => {
//     setEditAddress(null);
//     setShowForm(true);
//   };

//   const openEditForm = (address) => {
//     setEditAddress(address); 
//     setShowForm(true);
//   };

//   // ✅ SAVE ADDRESS (PER USER)
// // ✅ SAVE ADDRESS (PER USER)
// const saveAddress = async (data) => {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   if (!user || !user.email) return alert("User not logged in!");

//   try {
//     // 1. Correct Schema Name: "profile" vapro
//     const userDoc = await client.fetch(
//       `*[_type == "profile" && email == $email][0]`, 
//       { email: user.email }
//     );

//     if (!userDoc) {
//       alert(`Sanity ma '${user.email}' email sathe koi Profile nathi mali. Tamaro email check karo.`);
//       return;
//     }

//     if (editAddress) {
//       // Edit logic (Optional: complicated for arrays, easier to append)
//       // If you want simple update for now, focus on Adding first.
//     } else {
//       // 2. Add to 'addresses' array inside the 'profile' document
//       await client
//         .patch(userDoc._id)
//         .setIfMissing({ addresses: [] })
//         .insert("after", "addresses[-1]", [
//           {
//             _key: Math.random().toString(36).substring(2, 9),
//             title: data.name || "Home", // Schema ma field 'title' che
//             street: data.street,
//             city: data.city,
//             state: data.state,
//             pincode: data.zip, // Schema ma field 'pincode' che
//             country: data.country || "India",
//           },
//         ])
//         .commit();
//     }

//     // 3. Refresh list
//     const updatedUser = await client.fetch(
//       `*[_type == "profile" && email == $email][0]`,
//       { email: user.email }
//     );

//     setAddresses(updatedUser.addresses || []);
//     setShowForm(false);
//     alert("Address successfully added to Sanity!");

//   } catch (err) {
//     console.error("Sanity Error:", err);
//     alert("Error: " + err.message);
//   }
// };

//   // ✅ DELETE ADDRESS
// const deleteAddress = async (_key) => {
//   if (!window.confirm("Delete this address?")) return;

//   try {
//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     const userDoc = await client.fetch(
//       `*[_type == "profile" && email == $email][0]`,
//       { email: user.email }
//     );

//     await client
//       .patch(userDoc._id)
//       .unset([`addresses[_key=="${_key}"]`])
//       .commit();

//     // refresh
//     const updated = await client.fetch(
//       `*[_type == "profile" && email == $email][0]`,
//       { email: user.email }
//     );

//     setAddresses(updated.addresses || []);
//   } catch (err) {
//     console.log(err);
//   }
// };

//   // ✅ LOGOUT
//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("currentUser");
//       navigate("/login");
//     }
//   };

//   if (profile === null) {
//     return null;
//   }

//   return (
//     <section className="bg-[#FCFBFA] py-16 min-h-screen">
//       <div className="max-w-6xl mx-auto px-6 space-y-12">

//         {/* PROFILE HEADER */}
//         <div className="bg-black rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">

//           <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

//           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
//             <div className="relative">
//               <FaUserCircle className="text-8xl text-orange-600 bg-white rounded-full border-4 border-orange-600/20" />
//               <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>
//             </div>

//             <div className="text-center md:text-left space-y-2">
//               <h2 className="text-3xl md:text-4xl font-bold">
//                 {profile?.name}
//               </h2>

//               <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm">
//                 <span className="flex items-center gap-2">
//                   <FaEnvelope className="text-orange-600" />
//                   {profile?.email}
//                 </span>

//                 <span className="flex items-center gap-2">
//                   <FaPhoneAlt className="text-orange-600" />
//                   {profile?.phone || "No phone added"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 bg-white/10 hover:bg-red-500 px-8 py-3 rounded-2xl font-bold transition"
//           >
//             <FaSignOutAlt />
//             Logout
//           </button>
//         </div>

//         {/* ADDRESS SECTION */}
//         <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100">

//           <div className="flex justify-between items-center mb-10">
//             <h3 className="text-2xl font-bold">
//               Saved <span className="text-orange-600">Addresses</span>
//             </h3>

//             <button
//               onClick={openAddForm}
//               className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-orange-600"
//             >
//               <FaPlus /> Add New
//             </button>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">
//               No addresses found
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-6">
//               {addresses.map((addr) => (
//                 <div
//                   key={addr.id}
//                   className="border rounded-2xl p-6 hover:shadow-lg transition"
//                 >
//                   <div className="flex justify-between mb-3">
//                     <h4 className="font-bold">{addr.name}</h4>

//                     <div className="flex gap-2">
//                       <button onClick={() => openEditForm(addr)}>
//                         <FaEdit />
//                       </button>
//                       <button onClick={() => deleteAddress(addr.id)}>
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>

//                   <p>{addr.street}</p>
//                   <p>{addr.city}, {addr.state}</p>
//                   <p>{addr.zip} • {addr.country}</p>
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

//       <div className="mt-16">
//         <ContactCTA />
//       </div>
//     </section>
//   );
// }

// // ================= FORM =================

// function AddressForm({ onClose, onSave, address }) {
//   const [form, setForm] = useState(
//     address || {
//       name: "",
//       street: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "India",
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
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-3xl w-full max-w-lg">

//         <h3 className="text-xl font-bold mb-6">
//           {address ? "Update" : "Add"} Address
//         </h3>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

//           <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

//           <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

//           <input name="zip" placeholder="Pincode" value={form.zip} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

//           <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl" required />

//           <div className="flex justify-end gap-4">
//             <button type="button" onClick={onClose}>Cancel</button>
//             <button className="bg-black text-white px-6 py-2 rounded-xl">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  FaPlus, FaEdit, FaTrash, FaUserCircle,
  FaSignOutAlt, FaEnvelope, FaPhoneAlt,
} from "react-icons/fa";
import ContactCTA from "../../components/ContactCTA";
import { useNavigate } from "react-router-dom";
import { client } from "../../lib/sanity";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email) {
      navigate("/login");
      return;
    }

    try {
      // અહિયાં 'name' ફીલ્ડ હોવી જરૂરી છે
      const data = await client.fetch(
        `*[_type == "profile" && email == $email][0]{
          _id,
          name, 
          email,
          phone,
          addresses
        }`,
        { email: user.email }
      );

      console.log("Backend Response:", data); // આ ચેક કરો કે 'name' માં શું આવે છે

      if (!data) {
        alert("Profile not found!");
        setLoading(false);
        return;
      }

      setProfile(data);
      setAddresses(data.addresses || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [navigate]);

  const saveAddress = async (formData) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email || !profile?._id) return alert("Session expired!");

    try {
      const addressObject = {
        _key: formData._key || Math.random().toString(36).substring(2, 9),
        title: formData.title,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country || "India",
      };

      if (formData._key) {
        await client
          .patch(profile._id)
          .insert("replace", `addresses[_key == "${formData._key}"]`, [addressObject])
          .commit();
      } else {
        await client
          .patch(profile._id)
          .setIfMissing({ addresses: [] })
          .insert("after", "addresses[-1]", [addressObject])
          .commit();
      }

      setShowForm(false);
      loadProfile(); 
    } catch (err) {
      console.error("Sanity Error:", err);
    }
  };

  const deleteAddress = async (key) => {
    if (!window.confirm("Delete address?")) return;
    try {
      await client.patch(profile._id).unset([`addresses[_key=="${key}"]`]).commit();
      setAddresses(prev => prev.filter(a => a._key !== key));
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="bg-[#FCFBFA] py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* HEADER SECTION */}
        <div className="bg-black rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <FaUserCircle className="text-8xl text-orange-600 bg-white rounded-full" />
            <div className="text-center md:text-left space-y-2">
              {/* અહિયાં profile.name ડિસ્પ્લે થશે */}
              <h2 className="text-3xl font-bold uppercase tracking-wide">
                {profile?.name || "Bhavya Shah"} 
              </h2>
              <div className="flex flex-col md:flex-row gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-2"><FaEnvelope className="text-orange-600" />{profile?.email}</span>
                <span className="flex items-center gap-2"><FaPhoneAlt className="text-orange-600" />{profile?.phone || "No phone"}</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-white/10 hover:bg-red-500 px-8 py-3 rounded-2xl font-bold transition flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* ADDRESS SECTION */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold">Saved <span className="text-orange-600">Addresses</span></h3>
            <button onClick={() => { setEditAddress(null); setShowForm(true); }} className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-600 transition">
              <FaPlus /> Add New
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div key={addr._key} className="border rounded-2xl p-6 hover:shadow-lg transition">
                <div className="flex justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-800">{addr.title}</h4>
                  <div className="flex gap-3 text-gray-400">
                    <button onClick={() => { setEditAddress(addr); setShowForm(true); }} className="hover:text-orange-600"><FaEdit /></button>
                    <button onClick={() => deleteAddress(addr._key)} className="hover:text-red-500"><FaTrash /></button>
                  </div>
                </div>
                <p className="text-gray-600">{addr.street}, {addr.city}</p>
                <p className="text-gray-600 font-medium">{addr.pincode}, {addr.state}</p>
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <AddressForm onClose={() => setShowForm(false)} onSave={saveAddress} address={editAddress} />
        )}
      </div>
      <div className="mt-16"><ContactCTA /></div>
    </section>
  );
}

// ADDRESS FORM COMPONENT (Same as before but integrated)
function AddressForm({ onClose, onSave, address }) {
  const [form, setForm] = useState({
    _key: address?._key || null,
    title: address?.title || "",
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    pincode: address?.pincode || "",
    country: address?.country || "India",
  });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-6">{address ? "Update" : "Add"} Address</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl" required />
          <input placeholder="Street" value={form.street} onChange={(e) => setForm({...form, street: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl" required />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="City" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="p-3 bg-gray-50 border rounded-xl" required />
            <input placeholder="State" value={form.state} onChange={(e) => setForm({...form, state: e.target.value})} className="p-3 bg-gray-50 border rounded-xl" required />
          </div>
          <input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({...form, pincode: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl" required />
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-500">Cancel</button>
            <button className="bg-black text-white px-8 py-3 rounded-xl font-bold">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}