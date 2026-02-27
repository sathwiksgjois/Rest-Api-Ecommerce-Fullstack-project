const steps = ["PLACED", "SHIPPED", "DELIVERED"];

export default function OrderTimeline({ status }) {
  return (
    <div className="flex justify-between mt-4">
      {steps.map(step => (
        <div key={step} className="flex-1 text-center">
          <div
            className={`h-3 w-3 mx-auto rounded-full ${
              steps.indexOf(step) <= steps.indexOf(status)
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />
          <p className="text-xs mt-2">{step}</p>
        </div>
      ))}
    </div>
  );
}
