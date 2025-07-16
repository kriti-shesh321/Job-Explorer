import { getCategoryCardData } from "@/app/lib/data";
import CategoryCard from "./CategoryCard";

export default async function ChooseCategory() {
  const categoryData = await getCategoryCardData();

  return (
    <section className="lg:h-[calc(100vh-8rem)] bg-gradient-to-b from-blue-50 via-white to-blue-100 px-5 py-10 md:px-14 lg:px-30 space-y-6 md:space-y-10 lg:space-y-16 transition-all duration-500">
      <div className="text-center">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-800 mb-2 relative inline-block">
          <span className="relative z-10">Choose Categories</span>
        </h1>
        <p className="text-indigo-600 text-xs md:text-base md:mt-2">
          Explore job categories tailored to your skills and interests.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {categoryData.map((cat) => (
          <div key={cat.id} className="transform transition duration-300 hover:scale-[1.03]">
              <CategoryCard category={cat} />
            </div>
        ))}
      </div>
    </section>
  );
}
