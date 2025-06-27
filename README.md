# ✅ Task Management App – Softivus Frontend Developer Task

A professional, responsive, and functional **Task Management Web App** built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This app performs full **CRUD** operations through a provided API, offering a smooth dashboard experience with clean UI, proper loading states, and real-time updates.



---

## 📚 Table of Contents

- [📸 Demo](#-demo)
- [🚀 Features](#-features)
- [✨ Bonus Features](#-bonus-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Getting Started](#-getting-started)
- [📄 License](#-license)

---

## 📸 Demo

🔗 [Live Demo on Vercel](https://task-manager-mr-rafiqulthedev.vercel.app/) 

---

## 🚀 Features (Required)

### ✅ Dashboard (`/`)
- View all tasks with:
  - Title
  - Status
  - Due Date (formatted)
  - Actions: `View`, `Edit`, `Delete`
- Filter tasks by **status**: `All`, `Pending`, `Completed`

### ✅ View Task (`/tasks/[id]`)
- Show full task details: title, description, status, due date
- Show loading skeleton/spinner while fetching
- Gracefully handle invalid ID with “Task not found”

### ✅ Add Task (`/tasks/new`)
- Create a new task using form:
  - Fields: Title, Description, Status, Due Date
  - Validations included
- Submit via `POST` to API
- Show success/error UI

### ✅ Edit Task (`/tasks/[id]/edit`)
- Same form as `Add Task`, pre-filled with existing data
- Update task using `PUT` request
- Show loading while fetching

### ✅ Delete Task
- Delete from list or single task page
- Confirmation modal for safety
- Send `DELETE` request

### ✅ Loading States
- Loading indicators during:
  - Fetching task(s)
  - Form submissions
  - Page transitions

---

## ✨ Bonus Features (Optional Implementations)

- ✅ Status badges with color indicators (e.g., green for completed)
- ✅ Reusable UI Components:
  - Modal
  - Button
  - Loader

---

## 🛠 Tech Stack

| Technology     | Purpose                        |
|----------------|--------------------------------|
| **Next.js**    | Fullstack React framework      |
| **TypeScript** | Type safety                    |
| **Tailwind CSS** | Utility-first styling        |
| **React Hook Form** *(or controlled inputs)* | Form state |
| **date-fns**   | Date formatting                |
| **App Router** | Navigation & routing           |
| **useState / useEffect** | Core React state     |

---

## 📦 Getting Started

### 🧩 Prerequisites
- Node.js (v18+)
- npm or yarn

### 🔧 Installation

```bash
git clone https://github.com/Mr-Rafiqul-Islam/task-manager-mr.rafiqulthedev.git
cd task-manager-mr.rafiqulthedev
npm install
npm run dev

```
Visit: http://localhost:3000

License
This project is for assignment and evaluation purposes. You may adapt or enhance it for learning or personal portfolio use.