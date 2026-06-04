# 🛡️ Sentinel - Professional SOC Dashboard & Security Log Analyzer

Sentinel is a full-stack **Cybersecurity Monitoring Dashboard** designed to simulate the core functionality of a Security Operations Center (SOC). It analyzes raw security logs to detect real-time threats like **Brute Force Attacks, Port Scans, and Unauthorized Access** using a smart heuristic engine and real-time alerts.

## 🚀 Live Demo
Click here to view the live app: https://sentinel-live.onrender.com

**Test Credentials:**
- **Username:** admin
- **Password:** 123

## ✨ Key Features
- **Smart Log Parsing:** Automatically extracts IP addresses, timestamps, and event patterns from unstructured log files using a flexible Regex engine.
- **Automated Threat Detection:** Identifies malicious patterns such as Brute Force attempts (multi-fail logins) and sequential port probing.
- **Real-time Notifications:** Instant desktop-style alerts for critical security incidents using **Socket.io** (WebSockets).
- **Interactive Visualization:** Dynamic charts showing event distribution and risk severity powered by **Chart.js**.
- **Professional Reporting:** Generate and download automated **PDF Security Reports** and **CSV Raw Data Exports**.
- **Mitigation Advisory:** Provides actionable security recommendations for each detected threat to help analysts respond faster.
- **Secure Access:** Protected by a **JWT-based Login System** with encrypted passwords using Bcrypt.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Chart.js
- **Backend:** Node.js, Express.js
- **Real-time:** Socket.io (WebSockets)
- **Database:** MongoDB Atlas (Cloud)
- **Reporting:** PDFKit & JSON2CSV
- **Deployment:** Render (Server) & GitHub (Version Control)

## 📸 Preview
<img width="948" height="418" alt="dashboard" src="https://github.com/user-attachments/assets/b7c42d9c-9365-4a4a-954c-18d3d853f061" />
<img width="940" height="415" alt="test" src="https://github.com/user-attachments/assets/17b2bcb7-da85-4788-925f-4f89ca8c3425" />
<img width="960" height="414" alt="test 2" src="https://github.com/user-attachments/assets/ca4b69b6-7a72-466b-9b10-7a9d8ea97499" />
<img width="948" height="406" alt="test 3" src="https://github.com/user-attachments/assets/8cb61c82-d05e-42ba-aa12-79ae38173876" />



## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/MdRifatRayhan/my-security-dashboard
   

# 🛡️ PhishGuard Setup & Usage

### 🚀 Live Demo: https://sentinel-live.onrender.com

### ⚙️ Steps to Run Locally:
1. Install dependencies:
   $ npm install

2. Create a .env file and add your credentials:
   PORT=5000
MONGODB_URI=your_mongodb_connection_string

3. Run the server:
   $ npm run dev

🚀 Usage & Testing
Login: Create an admin account using the 'Create Account' button and log in.
Upload: Use the "Upload Logs" button to process a .log or .txt file.
Analyze: View real-time alerts and detailed analysis in the Threat Intel section.
Report: Download the PDF or CSV report for a professional security summary.


🛡️ Disclaimer:
This tool is for educational and awareness purposes. While it uses advanced detection techniques, it should be used in a controlled environment for log analysis training and awareness.


Developed by Md. Rifat Rayhan
Passionate about Cybersecurity and Full-Stack Development.
