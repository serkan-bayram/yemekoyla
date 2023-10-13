import SignInView from "@/components/SignInView";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-5/6 h-5/6 bg-secondary rounded-md border border-primary shadow">
        <SignInView />
      </div>
    </div>
  );
}
