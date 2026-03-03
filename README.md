# Ticketly - Universal Support Engine

**Ticketly** is a high-performance, role-based ticketing system designed for seamless integration into any 3rd party application. Originally inspired by challenges in Kenya's dairy logistics and rural healthcare, this system provides a robust layer for managing user support through specialized Admin, Agent, and Customer workflows.

---

## 🚀 Live Demo
You can view the live application here:
**[Link to be added upon deployment]**

---

## ✨ Features
* **Role-Based Access Control (RBAC):** Distinct dashboards for Admins (Backlog management), Agents (Assigned tasks), and Customers (Ticket creation).
* **Real-time Sync:** Powered by **Clerk Webhooks** to ensure user data remains consistent between Auth and the local database.
* **Modern Tech Stack:** Built with **Next.js 16**, **Prisma**, **Tailwind CSS**, and **SQLite**.
* **Pluggable Architecture:** Designed to be easily adapted for telemedicine, insurance, or logistics portals.

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mudash-dev/customer-ticket.git

2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Environment Variables:**
   Create a .env file and add your Clerk credentials and Webhook secret:
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
    CLERK_SECRET_KEY=...
    WEBHOOK_SECRET=...
    DATABASE_URL="file:./dev.db"
    ```
4. **Initialize Database:**
     ```bash
     npx prisma generate
     npx prisma db push
     ```
5. **Run Development Server:**
     ```bash
     npm run dev
     ```

## 🤝 Acknowledgments & Contributions
Special thanks to the following resources:
. Favicon: Letter T icons created by **rashedul.islam - Flaticon.**[<a href="https://www.flaticon.com/free-icons/letter-t" title="letter t icons">Letter t icons created by rashedul.islam - Flaticon</a>]

## 📜 License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:
[http://www.apache.org/licenses/LICENSE-2.0]
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
