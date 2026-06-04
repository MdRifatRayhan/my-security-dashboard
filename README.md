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
   

# 🛡️ log-analyzer Setup & Usage

### 🚀 Live Demo: https://sentinel-live.onrender.com

### ⚙️ Steps to Run Locally:
1. Install dependencies:
   $ npm install

2. Create a .env file and add your credentials:
   PORT=5000
   
MONGODB_URI=your_mongodb_connection_string

4. Run the server:
   $ npm run dev

🚀 Usage & Testing Guide

Once the app is running, follow this workflow:

Secure Login: Create an admin account using the 'Create New Account' button, then log in.

Log Upload: Click 'Upload Logs' and select a .log or .txt file (e.g., test_security.log).

Real-time Analysis: Watch Socket.io Notifications pop up instantly as threats are detected.

Threat Intel: Navigate to Threat Intel to see risk scores and Mitigation Recommendations.

Export Data: Click 'Download PDF' for a summary or 'Export CSV' for raw data.


🛡️ Disclaimer
This tool is developed for educational and awareness purposes only. While it uses advanced heuristic detection techniques, it is designed for log analysis training and should be used in a controlled environment. Always practice ethical hacking and security research.


Developed with ❤️ by [Md. Rifat Rayhan]

Passionate about Cybersecurity and Full-Stack Development.
