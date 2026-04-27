import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mongoose from "mongoose";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Connect to MongoDB if URI is provided, otherwise fallback to mock data mode
  const mongoURI = process.env.MONGODB_URI;
  let useMockData = true;

  if (mongoURI) {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to MongoDB");
      useMockData = false;
    } catch (err) {
      console.error("Failed to connect to MongoDB, falling back to mock data:", err);
    }
  } else {
    console.log("No MONGODB_URI provided. Running in mock data mode.");
  }

  // Define Mongoose Models (if using DB)
  const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

  // --- API Routes ---

  app.get("/api/projects", (req, res) => {
    // Both mocked and real mode can return the same static projects list for simplicity in a portfolio,
    // but in a real app these might come from the DB.
    const projects = [
      {
        id: "1",
        title: "Favourite Student System",
        description: "A comprehensive student management system designed to track student data, performance, and favorability efficiently.",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
        tags: ["React", "Tailwind CSS"],
        github: "https://github.com/Fennjoy100",
        demo: "https://favourite-student-system.vercel.app",
      },
      {
        id: "2",
        title: "ZenMarket",
        description: "A modern, minimalist e-commerce platform built for a seamless shopping experience.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        tags: ["React", "Vite", "Tailwind CSS"],
        github: "https://github.com/Fennjoy100",
        demo: "https://fusion5-5-members-fusion-of-design.vercel.app",
      },
      {
        id: "3",
        title: "Image Gallery",
        description: "A visually stunning, responsive image gallery with elegant transitions and high-performance loading.",
        image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80",
        tags: ["React", "CSS3", "JavaScript"],
        github: "https://github.com/Fennjoy100",
        demo: "https://image-gallery-seven-rouge.vercel.app",
      },
      {
        id: "4",
        title: "Netflix Login Page",
        description: "A pixel-perfect clone of the Netflix login interface, focusing on dark mode aesthetics and responsive forms.",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80",
        tags: ["React", "Tailwind CSS", "Express"],
        github: "https://github.com/Fennjoy100",
        demo: "https://netflix-login-page-eta-mocha.vercel.app",
      },
      {
        id: "5",
        title: "Weather Report Application",
        description: "A dynamic real-time weather forecasting application providing accurate data via weather API integration.",
        image: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80",
        tags: ["React", "OpenWeather API", "Tailwind CSS"],
        github: "https://github.com/Fennjoy100",
        demo: "https://weather-report-application-theta.vercel.app",
      },
      {
        id: "6",
        title: "AI-Powered Translation",
        description: "A real-time translation tool leveraging advanced AI models to seamlessly translate text across multiple languages.",
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Fennjoy100",
        demo: "https://fennjoy100.github.io/Real-time-AI-powered-translation/",
      }
    ];
    res.json(projects);
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      if (!useMockData) {
        // Save to actual database
        const newContact = new Contact({ name, email, message });
        await newContact.save();
      }
      // If mock mode, just pretend we saved it
      res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });


  // --- Vite / SPA Routing Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve absolute paths based on __dirname, properly handling ESM vs CJS
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

startServer();
