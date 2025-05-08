# comida.app

This is the repository for a MVP (Minimum Viable Product) for a web application software designed to handle delivery orders.

### How it works:

1. The user makes the order via the web application;
2. The restaurant proceeds to confirm the payment and produce the food;
3. When it's done a driver is notified and delivers the food to the client.

### About the project:

- The app charges a 10% fixed fee; delivery fees are calculated based on customer location.
- Currently live at [comida.app.br](https://comida.app.br), with a test restaurant in Curitiba - Brazil.
- The initial version was developed over a weekend hackathon-style effort, and has since been iterated into a production-ready MVP
- Real sales have been successfully processed through the platform.

## Motivation

This project was born out of a social entrepreneurship initiative. Most delivery apps charge restaurants predatory fees (~27%), making profitability difficult for local businesses. This app aims to provide:

- Fair fees for restaurants
- Reasonable compensation for drivers
- A sustainable business model that benefits all parties

## Technologies

This repository is a monorepo containing both the backend and frontend for the MVP version of the application.

- The backend is built with Node.js, using Express as the web framework.
- The frontend is built with React, using Vite as the build tool.
- Both projects are written in TypeScript.

| **Technology** | **Use case**                                                             |
| -------------- | ------------------------------------------------------------------------ |
| Typescript     | Language in which both the frontend and backend are written              |
| Express        | web framework for building RESTful APIs                                  |
| Mongoose       | ODM library for creating schemas for the DB                              |
| MongoDB        | Database                                                                 |
| React          | Frontend framework for building user interfaces                          |
| Vite           | Fast frontend build tool and development server                          |
| Tailwind       | Utility-first CSS framework for styling                                  |
| React Email    | Library for generating transactional emails (to restaurants and drivers) |
| Github Actions | CI/CD automation for testing and deploying the application               |
| Figma          | Modelling tool (UML Diagrams)                                            |
| Sendgrid       | Email Service                                                            |

## Email Interactions

All interactions between the system, restaurants, and delivery drivers are currently handled via email. Below is an overview of the flow:

1. Order Placement
   When a customer places an order, the restaurant receives an email notification. Depending on the payment method, the email will prompt the restaurant to either:

- Confirm that the payment has been received, or
- Begin food preparation directly.

2. Restaurant Confirmation
   The restaurant clicks a button within the email to:

- Confirm payment, or
- Mark the order as produced.

3. Driver Notification
   Once the restaurant marks the order as produced, the system sends an email to an available delivery driver. This email includes:

- Pickup address (restaurant)
- Delivery address (customer)
- Order details

4. Delivery Completion
   After completing the delivery, the driver clicks a confirmation button in the email to mark the order as delivered.

##### Why email?

This communication is intentional to:

- Simplify the onboarding process for restaurants and drivers
- Avoid the need for separate dashboards or apps (for now)
- Provide a lightweight and low-cost MVP communication method

## Infrastructure

- **Backend**: Hosted on an AWS EC2 instance.
- **Frontend**: Deployed to an AWS S3 Bucket, served via CloudFront for static content distribution.
- **DNS & CDN**: Cloudflare is used for DNS management and as an additional CDN layer to improve reliability and performance.

## Future Functionalities

As the platform evolves, the following features are planned to expand its capabilities and enhance the user experience:

#### Restaurant Portal

- Full CRUD for restaurant registration and management
- Logged-in dashboard with:
  - Menu management (add/edit/remove items)
  - Opening hours control (manual and automated)
  - Order tracking and history

#### End Customer

- Real-time notifications via:
  - Email
  - Push notifications (mobile app)
- In-app payment processing

### Other

- Public landing page
- Restaurant selection page
- Admin dashboard for system monitoring and metrics
- CRUD functionality for delivery drivers
