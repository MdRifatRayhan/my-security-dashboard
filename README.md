# 🛡️ Sentinel - Professional SOC Dashboard & Security Log Analyzer

Sentinel is a full-stack **Cybersecurity Monitoring Dashboard** designed to simulate the core functionality of a Security Operations Center (SOC). It analyzes raw security logs to detect real-time threats like **Brute Force Attacks, Port Scans, and Unauthorized Access** using a smart heuristic engine and real-time alerts.

---

## 🚀 Live Demo

**Click here to view the live app:** https://sentinel-live.onrender.com

**Test Credentials (for quick access):**

- **Username:** `admin`
- **Password:** `123`

---

## ✨ Key Features

- **Smart Log Parsing:** Automatically extracts data from unstructured log files using a flexible Regex engine.
- **Automated Threat Detection:** Identifies **Brute Force**, **Port Scans**, and **Unauthorized Access**.
- **Real-time Notifications:** Instant alerts for critical security incidents using **Socket.io**.
- **Interactive Visualization:** Dynamic charts showing risk severity powered by **Chart.js**.
- **Professional Reporting:** Download automated **PDF Reports** and **CSV Exports**.
- **Mitigation Advisory:** Provides actionable security recommendations for each detected threat.
- **Secure Access:** Protected by a **JWT-based Login System**.

---




## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Chart.js
- **Backend:** Node.js, Express.js
- **Real-time:** Socket.io (WebSockets)
- **Database:** MongoDB Atlas (Cloud)
- **Reporting:** PDFKit & JSON2CSV

---


## 📸 Preview
<img width="948" height="418" alt="dashboard" src="https://github.com/user-attachments/assets/ea1f1865-477c-4727-8f8b-991d41888a6c" />
<img width="940" height="415" alt="test" src="https://github.com/user-attachments/assets/ebc1201b-0a8b-4d06-a9f8-1184286365b3" />
<img width="960" height="414" alt="test 2" src="https://github.com/user-attachments/assets/f635b5bf-982a-49ef-b966-1e50c006f8eb" />
<img width="948" height="406" alt="test 3" src="https://github.com/user-attachments/assets/c8ac1f7f-c601-42f9-9b64-b9096bd6cab8" />



## ⚙️ Steps to Run Locally

Follow these simple steps to get the project running on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/MdRifatRayhan/my-security-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a file named `.env` in the root directory and add:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Launch the Server
```bash
npm run dev
```

---

## 🚀 Usage & Testing Guide

Once the app is running, follow this workflow:

1. **Secure Login:** Create an admin account using the **'Create New Account'** button, then log in.
2. **Log Upload:** Click **'Upload Logs'** and select a `.log` or `.txt` file (e.g., `test_security.log`).
3. **Real-time Analysis:** Watch **Socket.io Notifications** pop up instantly as threats are detected.
4. **Threat Intel:** Navigate to **Threat Intel** to see risk scores and **Mitigation Recommendations**.
5. **Export Data:** Click **'Download PDF'** for a summary or **'Export CSV'** for raw data.

---

## 🛡️ Disclaimer

This tool is developed for **educational and awareness purposes** only. While it uses advanced heuristic detection techniques, it is designed for log analysis training and should be used in a **controlled environment**. Always practice ethical hacking and security research.

---

**Developed with ❤️ by [Md. Rifat Rayhan]**  
*Passionate about **Cybersecurity** and **Full-Stack Development**.*  
