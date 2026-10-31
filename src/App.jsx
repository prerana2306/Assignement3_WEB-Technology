import { useMemo, useState } from "react";
import RegistrationForm from "./components/RegistrationForm.jsx";

const emptyForm = {
  fullName: "",
  prn: "",
  email: "",
  phone: "",
  age: "",
  course: ""
};

function validate(data, currentStudents) {
  const errors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(data.fullName.trim())) {
    errors.fullName = "Enter 2–60 characters using letters, spaces, apostrophes, dots or hyphens.";
  }

  if (!data.prn.trim()) {
    errors.prn = "PRN / Roll Number is required.";
  } else if (!/^[A-Za-z0-9-]{3,20}$/.test(data.prn.trim())) {
    errors.prn = "Use 3–20 letters, digits or hyphens.";
  } else if (currentStudents.some((student) => student.prn.toLowerCase() === data.prn.trim().toLowerCase())) {
    errors.prn = "This PRN is already registered.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Mobile number is required.";
  } else if (!/^[6-9]\d{9}$/.test(data.phone.trim())) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  const age = Number(data.age);
  if (data.age === "") {
    errors.age = "Age is required.";
  } else if (!Number.isInteger(age) || age < 16 || age > 100) {
    errors.age = "Age must be a whole number between 16 and 100.";
  }

  if (!data.course) errors.course = "Please select a course.";
  return errors;
}

export default function App() {
  const [formData, setFormData] = useState(emptyForm);
  const [students, setStudents] = useState([]);
  const [notice, setNotice] = useState({ text: "", type: "" });

  const errors = useMemo(() => validate(formData, students), [formData, students]);
  const isFormValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setNotice({ text: "", type: "" });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentErrors = validate(formData, students);
    if (Object.keys(currentErrors).length) {
      setNotice({ text: "Please correct the errors before registering.", type: "error" });
      return;
    }

    const student = {
      id: `${Date.now()}-${formData.prn}`,
      fullName: formData.fullName.trim(),
      prn: formData.prn.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: Number(formData.age),
      course: formData.course
    };

    setStudents((previous) => [...previous, student]);
    setFormData(emptyForm);
    setNotice({ text: "Student registered successfully!", type: "success" });
  }

  function handleDelete(id) {
    setStudents((previous) => previous.filter((student) => student.id !== id));
    setNotice({ text: "Student record deleted.", type: "success" });
  }

  function handleReset() {
    setFormData(emptyForm);
    setNotice({ text: "", type: "" });
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-mark" aria-hidden="true">SR</div>
        <p className="eyebrow">WEB TECHNOLOGY · PRACTICAL NO. 3</p>
        <h1>Student Registration</h1>
        <p className="hero-copy">A ReactJS form demonstrating reusable components, controlled inputs and client-side validation.</p>
      </header>

      <main className="layout">
        <section className="panel form-panel" aria-labelledby="form-title">
          <div className="section-heading">
            <div><p className="eyebrow">STUDENT DETAILS</p><h2 id="form-title">Create registration</h2></div>
            <span className="step-chip">01 / FORM</span>
          </div>
          <RegistrationForm
            formData={formData}
            errors={errors}
            isFormValid={isFormValid}
            notice={notice}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
          <p className="form-note"><span aria-hidden="true">ⓘ</span> All fields are required. Your entries are checked in the browser before submission.</p>
        </section>

        <section className="panel records-panel" aria-labelledby="records-title">
          <div className="section-heading">
            <div><p className="eyebrow">LIVE PREVIEW</p><h2 id="records-title">Registered students</h2></div>
            <span className="count-chip">{students.length} {students.length === 1 ? "record" : "records"}</span>
          </div>

          {students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">＋</div>
              <h3>No registrations yet</h3>
              <p>Complete the form and submit it to see a student record here.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Student</th><th>PRN</th><th>Course</th><th>Age</th><th>Action</th></tr></thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td><strong>{student.fullName}</strong><span className="sub-cell">{student.email}</span><span className="sub-cell">{student.phone}</span></td>
                      <td>{student.prn}</td><td>{student.course}</td><td>{student.age}</td>
                      <td><button className="delete-button" type="button" onClick={() => handleDelete(student.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="json-section">
            <div className="json-heading"><h3>State data (JSON)</h3><span>ARRAY · OBJECTS</span></div>
            <pre className="json-output">{JSON.stringify(students.map(({ id, ...student }) => student), null, 2)}</pre>
          </div>
        </section>
      </main>
      <footer><span>ASSIGNMENT 3</span><span>Built with React · useState · Props · Validation</span></footer>
    </div>
  );
}
