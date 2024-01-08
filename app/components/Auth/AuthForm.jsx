export default function AuthForm({ children, handleSubmit }) {
  return (
    <form method="POST" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
