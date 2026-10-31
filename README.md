# Assignment 3 — ReactJS Student Registration Form

**Course:** Web Technology (2304362L)  
**Practical:** No. 3 — Front-End JavaScript Frameworks: ReactJS

This application demonstrates reusable React functional components, props, `useState`, controlled inputs, real-time client-side validation, and a submit button disabled until the form is valid.

## Features

- Reusable `FormInput` and `RegistrationForm` components
- Controlled inputs and React state
- Real-time validation with clear error messages
- Name, PRN format, unique PRN, email, mobile, age and course validation
- Submit button remains disabled until all fields are valid
- Registered student list, delete action and JSON state preview
- Responsive layout

## Requirements

Install Node.js LTS (includes npm) and use a modern browser.

## Run locally

1. Extract the ZIP and open the project folder in Visual Studio Code.
2. Open Terminal → New Terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown by Vite, normally `http://localhost:5173`.

If Windows PowerShell blocks `npm.ps1`, use:

```powershell
npm.cmd install
npm.cmd run dev
```

To test a production build, run `npm run build` (or `npm.cmd run build` in PowerShell).

## Deploy to GitHub Pages

This project uses Vite. GitHub Pages must build the React project before publishing it.

1. Create a **public** repository named `assignment-3-react-registration` on GitHub.
2. Upload the project files to the repository root. Do not upload `node_modules` or `dist`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Ensure the file `.github/workflows/deploy.yml` is committed to the repository. It is included in this ZIP.
6. If you chose a different repository name, edit `vite.config.js` and change `base` to `"/YOUR-REPOSITORY-NAME/"`.
7. Commit and push all files to the `main` branch.
8. Open the **Actions** tab. Wait for the deployment workflow to finish successfully.
9. Your site URL will be `https://YOUR-GITHUB-USERNAME.github.io/assignment-3-react-registration/`. Replace the username with your actual GitHub username.
10. Open the live URL and test valid input, invalid input, duplicate PRN, and deletion.

### GitHub Actions workflow

The included `.github/workflows/deploy.yml` installs dependencies, builds the Vite project and publishes the `dist` folder to GitHub Pages.

## What to submit on Moodle

- GitHub repository link and deployed application URL
- Source-code ZIP without `node_modules`
- PDF report with component structure, architecture/flow, valid and invalid screenshots, testing, conclusion and deployed URL
- Complete the AI-use declaration truthfully

Use the filename pattern in the assignment:
- `PRN_Name_P3_Title.zip`
- `PRN_Name_P3_Report.pdf`

## Key concepts for your viva

- **useState:** stores form values, student records and status messages.
- **Props:** pass data and event callbacks from parent to child components.
- **Controlled inputs:** input values are driven by React state and updated through `onChange`.
- **Validation:** checks form data before registration.
- **Conditional rendering:** shows errors, empty states, records and JSON output as needed.

## Limitations

This is a client-side demonstration. Student records are held in React state and disappear on page refresh. It has no backend or database. Email validation checks basic formatting only and does not verify whether an email account exists.
