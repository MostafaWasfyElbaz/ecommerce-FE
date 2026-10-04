import { ProductDetails } from "@/src/types/ProductDetails";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Details({ product }: { product: ProductDetails }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-900">
          About this Product
        </h3>
        {product.description.split("\n").map((line, index) => (
          <p className="leading-relaxed text-gray-600" key={index}>
            {line}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-3 font-medium text-gray-900">
            Product Information
          </h4>

          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-900">
                {product.category.name}
              </span>
            </li>

            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Subcategory</span>
              <span className="font-medium text-gray-900">
                {product.subcategory[0].name}
              </span>
            </li>

            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium text-gray-900">
                {product.brand.name}
              </span>
            </li>

            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Items Sold</span>
              <span className="font-medium text-gray-900">{product.sold}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-3 font-medium text-gray-900">Key Features</h4>

          <ul className="space-y-2">
            {[
              "Premium Quality Product",
              "100% Authentic Guarantee",
              "Fast & Secure Packaging",
              "Quality Tested",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center text-sm text-gray-600"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mr-2 w-4 text-[#16a34a]"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
