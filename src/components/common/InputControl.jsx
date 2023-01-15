import Alert from './Alert';

export default function InputControl({
  name,
  text,
  value,
  error,
  placeholder,
  disabled,
  onChange,
}) {
  return (
    <>
      <div className="mb-3 flex w-full flex-col justify-between">
        <label
          htmlFor={name}
          className="mb-1 text-base font-bold text-gray-700"
        >
          {text}
        </label>
        <input
          className="rounded-md border border-gray-400 p-2 text-sm text-gray-700 shadow-md placeholder:text-gray-500 focus:outline-blue-500"
          type={name}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
      {error && <Alert text={error} variant="danger" />}
    </>
  );
}
