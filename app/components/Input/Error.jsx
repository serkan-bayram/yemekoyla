export function Error({ errorState, errorMessage }) {
  return errorState && <div className="text-error text-sm">{errorMessage}</div>;
}
