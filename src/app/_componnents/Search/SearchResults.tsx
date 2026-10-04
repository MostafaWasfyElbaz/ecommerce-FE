"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSliders,
  faGripVertical,
  faList,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faBoxOpen,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "@/src/types/Product";
import { Category } from "@/src/types/Category";
import { Brand } from "@/src/types/Brands";
import ProductCard from "@/src/app/_componnents/Products/ProductCard";

interface SearchResultsProps {
  initialProducts: Product[];
  categories: Category[];
  brands: Brand[];
}

const items = 8;

export default function SearchResults({
  initialProducts,
  categories,
  brands,
}: SearchResultsProps) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [pricePreset, setPricePreset] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  if (prevUrlQuery !== urlQuery) {
    setPrevUrlQuery(urlQuery);
    setSearchTerm(urlQuery);
    setCurrentPage(1);
  }

  const updateUrlParam = useCallback((value: string) => {
    const newUrl = value.trim()
      ? `/search?q=${encodeURIComponent(value.trim())}`
      : "/search";
    window.history.replaceState(null, "", newUrl);
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
    updateUrlParam(val);
  };

  const toggleCategory = (catName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName],
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName],
    );
    setCurrentPage(1);
  };

  const handlePricePreset = (presetMax: number) => {
    if (pricePreset === presetMax) {
      setPricePreset(null);
      setMaxPrice("");
    } else {
      setPricePreset(presetMax);
      setMinPrice("");
      setMaxPrice(presetMax.toString());
    }
    setCurrentPage(1);
  };

  const handleMinPriceChange = (val: string) => {
    setMinPrice(val);
    setPricePreset(null);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (val: string) => {
    setMaxPrice(val);
    setPricePreset(null);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setPricePreset(null);
    setSortBy("");
    setCurrentPage(1);
    updateUrlParam("");
  };

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
      selectedCategories.length > 0 ||
      selectedBrands.length > 0 ||
      minPrice !== "" ||
      maxPrice !== "" ||
      sortBy !== "",
  );

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((product) => {
        const titleMatch = product.title?.toLowerCase().includes(term);
        const descMatch = product.description?.toLowerCase().includes(term);
        const catMatch = product.category?.name?.toLowerCase().includes(term);
        const brandMatch = product.brand?.name?.toLowerCase().includes(term);
        return titleMatch || descMatch || catMatch || brandMatch;
      });
    }

    if (selectedCategories.length > 0) {
      result = result.filter(
        (product) =>
          product.category?.name &&
          selectedCategories.includes(product.category.name),
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(
        (product) =>
          product.brand?.name && selectedBrands.includes(product.brand.name),
      );
    }

    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    if (min !== null && !isNaN(min)) {
      result = result.filter((p) => {
        const price = p.priceAfterDiscount ?? p.price;
        return price >= min;
      });
    }

    if (max !== null && !isNaN(max)) {
      result = result.filter((p) => {
        const price = p.priceAfterDiscount ?? p.price;
        return price <= max;
      });
    }

    if (sortBy === "price") {
      result.sort(
        (a, b) =>
          (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price),
      );
    } else if (sortBy === "-price") {
      result.sort(
        (a, b) =>
          (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price),
      );
    } else if (sortBy === "-ratingsAverage") {
      result.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0));
    } else if (sortBy === "title") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "-title") {
      result.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    return result;
  }, [
    initialProducts,
    searchTerm,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / items),
  );
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * items;
    return filteredProducts.slice(startIndex, startIndex + items);
  }, [filteredProducts, currentPage]);

  const FilterContent = (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Categories</h3>
          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategories([]);
                setCurrentPage(1);
              }}
              className="text-xs text-green-600 hover:text-green-700 cursor-pointer font-medium"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <label
                key={cat._id || cat.name}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat.name)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 accent-green-600 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Price Range</h3>
          {(minPrice !== "" || maxPrice !== "" || pricePreset !== null) && (
            <button
              type="button"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setPricePreset(null);
                setCurrentPage(1);
              }}
              className="text-xs text-green-600 hover:text-green-700 cursor-pointer font-medium"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Min (EGP)</label>
            <input
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-black placeholder:text-[#979ea6] focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Max (EGP)</label>
            <input
              placeholder="No limit"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-black placeholder:text-[#979ea6] focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "Under 500", max: 500 },
            { label: "Under 1K", max: 1000 },
            { label: "Under 5K", max: 5000 },
            { label: "Under 10K", max: 10000 },
          ].map((chip) => {
            const isActive = pricePreset === chip.max;
            return (
              <button
                key={chip.max}
                type="button"
                onClick={() => handlePricePreset(chip.max)}
                className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-green-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Brands</h3>
          {selectedBrands.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedBrands([]);
                setCurrentPage(1);
              }}
              className="text-xs text-green-600 hover:text-green-700 cursor-pointer font-medium"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {brands.map((b) => {
            const isChecked = selectedBrands.includes(b.name);
            return (
              <label
                key={b._id || b.name}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(b.name)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 accent-green-600 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {b.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-2">
          <button
            type="button"
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faRotateRight} className="text-xs text-gray-500" />
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-green-600 transition-colors" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Search Results</span>
          </nav>

          <form
            className="max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none"
              />
              <input
                placeholder="Search for products..."
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-lg bg-white text-black placeholder:text-[#979ea6]"
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search text"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-xs">
              {FilterContent}
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faSliders} className="text-sm" />
                  Filters
                  {(selectedCategories.length > 0 ||
                    selectedBrands.length > 0 ||
                    minPrice !== "" ||
                    maxPrice !== "") && (
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                  )}
                </button>

                <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`cursor-pointer p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="Grid view"
                    aria-label="Grid view"
                  >
                    <FontAwesomeIcon icon={faGripVertical} className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`cursor-pointer p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="List view"
                    aria-label="List view"
                  >
                    <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                  </button>
                </div>

                <span className="text-sm text-gray-500 hidden sm:inline">
                  Showing{" "}
                  <strong className="text-gray-800 font-semibold">
                    {filteredProducts.length}
                  </strong>{" "}
                  products
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer px-3 py-2 rounded-lg border border-gray-200 text-sm text-black focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white transition-all"
                >
                  <option value="">Relevance</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-ratingsAverage">Rating: High to Low</option>
                  <option value="title">Name: A to Z</option>
                  <option value="-title">Name: Z to A</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-500">Active filters:</span>
                {searchTerm.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                    Keyword: &quot;{searchTerm.trim()}&quot;
                    <button
                      type="button"
                      onClick={() => handleSearchChange("")}
                      className="cursor-pointer hover:text-green-900"
                    >
                      <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                  >
                    Category: {cat}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className="cursor-pointer hover:text-emerald-900"
                    >
                      <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 font-medium"
                  >
                    Brand: {brand}
                    <button
                      type="button"
                      onClick={() => toggleBrand(brand)}
                      className="cursor-pointer hover:text-violet-900"
                    >
                      <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {(minPrice !== "" || maxPrice !== "") && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                    Price: {minPrice ? `${minPrice} EGP` : "0"} -{" "}
                    {maxPrice ? `${maxPrice} EGP` : "∞"}
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice("");
                        setMaxPrice("");
                        setPricePreset(null);
                      }}
                      className="cursor-pointer hover:text-amber-900"
                    >
                      <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-gray-500 hover:text-red-500 underline ml-2 cursor-pointer font-medium"
                >
                  Clear all
                </button>
              </div>
            )}

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-2xs p-8">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-3xl text-gray-400"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm.trim()
                    ? `We couldn't find any products matching "${searchTerm}". Try checking for typos or removing filters.`
                    : "No products match the selected filters. Try broadening your filter criteria."}
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-sm"
                  >
                    <FontAwesomeIcon icon={faRotateRight} className="text-sm" />
                    Reset All Filters
                  </button>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "grid grid-cols-1 sm:grid-cols-2 gap-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id || product._id}
                    product={product}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`cursor-pointer w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                        isActive
                          ? "bg-green-600 text-white shadow-xs"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-2xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <FontAwesomeIcon icon={faSliders} className="text-green-600" />
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="cursor-pointer w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                aria-label="Close filters"
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">{FilterContent}</div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="cursor-pointer w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-sm"
              >
                View {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
