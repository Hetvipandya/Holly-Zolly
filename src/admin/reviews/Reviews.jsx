import { useState } from "react";
import { FaCheck, FaBan, FaTrash } from "react-icons/fa";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Men Cotton T-Shirt",
      user: "Rahul Sharma",
      rating: 4,
      comment: "Good quality and fitting.",
      status: "Approved",
    },
    {
      id: 2,
      product: "Women Stylish Dress",
      user: "Anita Patel",
      rating: 5,
      comment: "Loved the design ❤️",
      status: "Pending",
    },
    {
      id: 3,
      product: "Running Sneakers",
      user: "Vikram Singh",
      rating: 2,
      comment: "Comfort is not good.",
      status: "Rejected",
    },
  ]);

  /* TOGGLE APPROVE / DISAPPROVE */
  const toggleStatus = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status:
                review.status === "Approved" ? "Rejected" : "Approved",
            }
          : review
      )
    );
  };

  /* DELETE REVIEW */
  const deleteReview = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  /* STATUS BADGE */
  const statusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {/* HEADER */}
        <h2 className="text-2xl font-heading font-bold text-primary mb-6 mt-2">
          Reviews Management
        </h2>


      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-primary/70 text-light">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-t hover:bg-gray-50">
                {/* PRODUCT */}
                <td className="p-3 font-semibold">
                  {review.product}
                </td>

                {/* USER */}
                <td className="p-3">{review.user}</td>

                {/* RATING */}
                <td className="p-3">
                  ⭐ {review.rating} / 5
                </td>

                {/* COMMENT */}
                <td className="p-3 max-w-[300px] truncate">
                  {review.comment}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      review.status
                    )}`}
                  >
                    {review.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => toggleStatus(review.id)}
                    className="text-green-600"
                    title="Approve / Disapprove"
                  >
                    {review.status === "Approved" ? <FaBan /> : <FaCheck />}
                  </button>

                  <button
                    onClick={() => deleteReview(review.id)}
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
