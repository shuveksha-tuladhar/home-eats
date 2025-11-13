import React from "react";

const statusSteps = [
  { label: "ACCEPTED", key: "accepted", icon: "📝" },
  { label: "PREPARING", key: "preparing", icon: "📦" },
  { label: "ON ITS WAY", key: "on its way", icon: "🚗" },
  { label: "DELIVERED", key: "delivered", icon: "✓" },
];

function StatusStepper({ currentStatus }) {
  const currentStep = statusSteps.findIndex(
    (step) => step.key === currentStatus
  );

  return (
    <section className="bg-white py-12 border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center items-center gap-0 relative">
          {statusSteps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center gap-4 text-center relative">
                  {/* Circle with icon */}
                  <div
                    className={`
                      w-[100px] h-[100px] sm:w-[112px] sm:h-[112px] 
                      rounded-full shadow-md 
                      flex items-center justify-center 
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-primary/20 ring-4 ring-primary"
                          : isCompleted
                          ? "bg-green-100 ring-2 ring-green-500"
                          : "bg-gray-100 ring-2 ring-gray-300"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-4xl sm:text-5xl
                        ${isActive ? "scale-110" : ""}
                      `}
                    >
                      {step.icon}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="flex flex-col gap-1">
                    <h3
                      className={`
                        text-sm font-bold tracking-wide
                        ${
                          isActive
                            ? "text-primary"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {step.label}
                    </h3>
                  </div>
                </div>

                {/* Connector line between circles */}
                {idx < statusSteps.length - 1 && (
                  <div
                    className={`
                      w-12 sm:w-20 md:w-32 h-1
                      transition-all duration-300
                      ${isCompleted ? "bg-green-500" : "bg-gray-300"}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatusStepper;
