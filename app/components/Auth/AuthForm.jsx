export default function AuthForm({ children, handleSubmit }) {
  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="px-8 pt-12 flex flex-col "
    >
      {children}
    </form>
  );
}
