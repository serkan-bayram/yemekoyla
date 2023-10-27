export default function AuthForm({ children, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
      {children}
    </form>
  );
}
