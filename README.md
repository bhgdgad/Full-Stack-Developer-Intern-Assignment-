# 📊 Feedback Pulse – Full Stack Developer Intern Assignment

Feedback Pulse is a full-stack web application that allows users to create projects and integrate a feedback widget into their websites using a unique project key.

This project is built as part of a **Full-Stack Developer Intern Assignment** and demonstrates real-world backend + frontend integration.

---

## 🚀 Features

- 🔐 User Authentication (Signup & Login)
- 👤 Welcome message showing logged-in user
- 📁 Create unlimited projects
- 🔑 Auto-generated unique project keys
- 📊 Dashboard to view all created projects
- 🧩 Embeddable feedback widget script
- ⚡ Real-time project creation without page refresh
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16 (App Router)**
- **React**
- **TypeScript**
- Inline CSS Styling

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### Authentication
- **NextAuth.js**

### Database
- **PostgreSQL**

---

## 📂 Project Structure

```bash
app/
 ├── api/
 │   ├── auth/
 │   ├── projects/
 │   └── widget/
 ├── dashboard/
 ├── login/
 ├── signup/
 ├── projects/
 └── layout.tsx

prisma/
 ├── schema.prisma
 ├── migrations/
 └── seed.ts

lib/
 └── prisma.ts
