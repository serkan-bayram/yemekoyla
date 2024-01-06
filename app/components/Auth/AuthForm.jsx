export default function AuthForm({ children, handleSubmit }) {
  return (
    <form method="POST" onSubmit={handleSubmit} className="  flex flex-col ">
      {children}
    </form>
  );
}
