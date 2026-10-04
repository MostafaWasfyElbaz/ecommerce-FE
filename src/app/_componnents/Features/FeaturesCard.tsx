import { Features } from "@/src/types/Features";

export default function FeaturesCard({ feature }: { feature: Features }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
      >
        {feature.icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>

        <p className="text-xs text-gray-500">{feature.description}</p>
      </div>
    </div>
  );
}
