import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";

const steps = [
  {
    key: "pending",
    label: "Order Placed",
    icon: FaBox,
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: FaShippingFast,
  },
  {
    key: "out-for-delivery",
    label: "Out for Delivery",
    icon: FaTruck,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: FaCheckCircle,
  },
];

export default function DeliveryTracking({ status }) {
  // Cancelled or Returned special case
  if (status === "cancelled" || status === "returned") {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-4 text-red-600">
          {status === "cancelled" ? (
            <FaTimesCircle className="text-3xl" />
          ) : (
            <FaUndoAlt className="text-3xl" />
          )}
          <div>
            <h3 className="font-heading font-semibold text-lg capitalize">
              Order {status}
            </h3>
            <p className="text-sm text-gray-600">
              This order has been {status}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow ">
      <h3 className="font-heading font-semibold text-xl mb-6 text-primary">
        Delivery Tracking
      </h3>

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* LINE */}
              {index !== 0 && (
                <div
                  className={`absolute top-4 left-0 w-full h-1 -z-10 ${
                    isCompleted ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}

              {/* ICON */}
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                <Icon />
              </div>

              {/* LABEL */}
              <p
                className={`mt-2 text-sm text-center font-semibold ${
                  isCompleted ? "text-primary" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
