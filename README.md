**Table of Contents**
- Features (#features)

- Technologies (#technologies)

- Project Structure (#project-structure)

- Setup Instructions (#setup-instructions)
- Prerequisites (#prerequisites)

- Installation (#installation)

- Configuration (#configuration)

- Running the Application (#running-the-application)



**Features**
- Doctor Dashboard: A centralized interface with a sidebar for navigating sections (Create Program, Register Client, Enroll Client, Search Clients, List Programs, Client Profile).

- Program Management:
- Create health programs with name and description.

- List all programs in a full-width table with columns for Name, Description, Doctor, and Date Created.

- Client Management:
- Register new clients.

- Enroll clients in programs.

- Search clients by criteria.

- View detailed client profiles, including personal information (name, email, DOB) and enrolled programs.

- Responsive Design: Full-width layouts, hover effects, and card-like components using Material-UI.

- Authentication: Token-based authentication with login/logout functionality.


**Technologies**
- React: ^18.2.0 (JavaScript library for building user interfaces)
- Material-UI (MUI): ^5.10.0 (React UI framework for responsive, sleek components)
- React Router: ^6.4.0 (Declarative routing for dynamic URLs)
- Axios: ^1.4.0 (HTTP client for API requests)
- CRACO: ^7.0.0 (Customizes Create React App configuration for proxy setup)
- Node.js: >=16.x (JavaScript runtime for development)
- npm: >=8.x (Package manager)

**Prerequisites**
- Node.js: Install Node.js (>=16.x) from nodejs.org.

- npm: Included with Node.js or install separately.

- Git: For cloning the repository.

- Backend: A running Django backend ([see backend README for setup](https://github.com/josephmusila/CEMA-Backend "see backend README for setup")). 

**Running the Application**
```shell
cd health-system-frontend
npm start
```


