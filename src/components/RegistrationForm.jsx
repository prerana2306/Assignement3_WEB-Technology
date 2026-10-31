import FormInput from "./FormInput.jsx";

const courses = [
  "Computer Engineering",
  "Information Technology",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering"
];

export default function RegistrationForm({
  formData, errors, isFormValid, notice, onChange, onSubmit, onReset
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <FormInput label="Full name" name="fullName" value={formData.fullName} onChange={onChange} error={errors.fullName} placeholder="e.g. Rahul Patil" />
        <FormInput label="PRN / Roll number" name="prn" value={formData.prn} onChange={onChange} error={errors.prn} placeholder="e.g. CE2026001" maxLength={20} />
        <FormInput label="Email address" name="email" value={formData.email} onChange={onChange} error={errors.email} placeholder="you@example.com" type="email" />
        <FormInput label="Mobile number" name="phone" value={formData.phone} onChange={onChange} error={errors.phone} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} />
        <FormInput label="Age" name="age" value={formData.age} onChange={onChange} error={errors.age} placeholder="Between 16 and 100" type="number" min={16} max={100} />
        <FormInput label="Course" name="course" value={formData.course} onChange={onChange} error={errors.course}>
          <select id="field-course" name="course" value={formData.course} onChange={onChange} aria-invalid={Boolean(errors.course)} aria-describedby={errors.course ? "field-course-error" : undefined}>
            <option value="">Select your course</option>
            {courses.map((course) => <option value={course} key={course}>{course}</option>)}
          </select>
        </FormInput>
      </div>

      {notice.text && <div className={`form-notice ${notice.type}`} role="status" aria-live="polite"><span aria-hidden="true">{notice.type === "success" ? "✓" : "!"}</span>{notice.text}</div>}

      <div className="form-actions">
        <button className="submit-button" type="submit" disabled={!isFormValid}>Register student <span aria-hidden="true">→</span></button>
        <button className="reset-button" type="button" onClick={onReset}>Clear form</button>
      </div>
      <p className="disabled-hint">{isFormValid ? "Form is valid and ready to submit." : "Complete every field correctly to enable registration."}</p>
    </form>
  );
}
