import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log("Starting server on port", PORT);

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // محاكاة بيانات قادمة من قاعدة بيانات (مثل Django Models)
  const portfolioData = {
    user: {
      name: "د. سلطان الشهري",
      title: "خبير بايثون وجانقو | مطور Full-Stack",
      bio: "متخصص في بناء الأنظمة البرمجية المتقدمة باستخدام Python و Django. صاحب مدونة تقنية ومساهم في مجتمع البرمجة العربي."
    },
    skills: [
      { name: "Python / Django", level: "Expert", category: "Backend" },
      { name: "REST Framework", level: "Advanced", category: "API" },
      { name: "PostgreSQL", level: "Advanced", category: "Database" },
      { name: "Celery / Redis", level: "Intermediate", category: "Task Queue" }
    ],
    projects: [
      { id: 1, title: "نظام إدارة المخازن بـ Django", status: "Completed" },
      { id: 2, title: "منصة تعليمية متكاملة", status: "In Progress" }
    ]
  };

  // API Endpoints (محاكاة لـ Django REST Framework)
  app.get("/api/profile", (req, res) => {
    res.json(portfolioData.user);
  });

  app.get("/api/skills", (req, res) => {
    res.json(portfolioData.skills);
  });

  app.get("/api/github-projects", async (req, res) => {
    const username = process.env.GITHUB_USERNAME || "sultanshehri1"; // تم التحديث لاسم المستخدم الصحيح
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      const repos = response.data;
      
      // تنسيق البيانات لتناسب الواجهة
      const formattedRepos = repos.map((repo: any) => ({
        id: repo.id,
        title: repo.name,
        desc: repo.description || "لا يوجد وصف لهذا المشروع حالياً.",
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || "Python",
        tags: [repo.language].filter(Boolean)
      }));
      
      res.json(formattedRepos);
    } catch (error) {
      console.error("GitHub API Error:", error);
      res.status(500).json({ error: "تعذر جلب المشاريع من GitHub" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
