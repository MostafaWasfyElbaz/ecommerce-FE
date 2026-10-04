import { Features as FeaturesType } from "@/src/types/Features";
import FeaturesCard from "./FeaturesCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldHalved,
  faRotateLeft,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export default function Features() {
  const features: FeaturesType[] = [
    {
      title: "Free Shipping",
      description: "On orders over 500 EGP",
      icon: <FontAwesomeIcon icon={faTruck} className="text-xl w-5 h-4" />,
      iconClass: "bg-blue-50 text-blue-500",
    },

    {
      title: "Secure Payment",
      description: "100% secure transactions",
      icon: (
        <FontAwesomeIcon icon={faShieldHalved} className="text-xl w-5 h-4" />
      ),
      iconClass: "bg-emerald-50 text-emerald-500",
    },

    {
      title: "Easy Returns",
      description: "14-day return policy",
      icon: <FontAwesomeIcon icon={faRotateLeft} className="text-xl w-5 h-4" />,
      iconClass: "bg-orange-50 text-orange-500",
    },

    {
      title: "24/7 Support",
      description: "Dedicated support team",
      icon: <FontAwesomeIcon icon={faHeadset} className="text-xl w-5 h-4" />,
      iconClass: "bg-purple-50 text-purple-500",
    },
  ];

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeaturesCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
