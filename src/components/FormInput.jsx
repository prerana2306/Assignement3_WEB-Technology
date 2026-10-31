export default function FormInput({
  label, name, value, onChange, error, placeholder,
  type = "text", inputMode, maxLength, min, max, children
}) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`field ${error ? "field-invalid" : ""}`}>
      <label htmlFor={inputId}>{label}<span className="required-mark"> *</span></label>
      {children ? children : (
        <input
          id={inputId} name={name} type={type} value={value}
          onChange={onChange} placeholder={placeholder}
          inputMode={inputMode} maxLength={maxLength} min={min} max={max}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          autoComplete="off"
        />
      )}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}
