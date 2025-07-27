import LoginForm from "@/app/ui/LoginForm";

export default async function Page() {
  return (
    <div className="bg-gray-50 w-full pt-28 h-screen">
      <div className="bg-white w-1/3 p-5 mx-auto shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
}