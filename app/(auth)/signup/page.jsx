import SignupForm from "@/app/ui/SignupForm";

export default async function Page() {
  return (
    <div className="bg-gray-50 w-full pt-20 h-screen">
      <div className="bg-white w-1/3 p-5 mx-auto shadow-sm">
        <SignupForm />
      </div>
    </div>
  );
}