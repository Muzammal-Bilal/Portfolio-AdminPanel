// Seed data for initial portfolio content
export const seedData = {
  settings: {
    siteTitle: "Muzammal Bilal - AI/ML Engineer",
    siteDescription: "AI/ML engineer with expertise in Python, LLMs, computer vision, and cloud deployment.",
    themeDefault: "dark",
    seoKeywords: "AI, ML, Machine Learning, Python, Computer Vision, LLMs, Deep Learning",
    ogImage: "",
    socialLinks: {
      github: "https://github.com/Muzammal-Bilal",
      linkedin: "https://linkedin.com/in/muzammal-bilal",
      twitter: "",
      email: "Muzammalbilal36@gmail.com"
    }
  },
  
  profile: {
    name: "Muzammal Bilal",
    title: "AI/ML Engineer & Python Developer",
    subtitle: "Building intelligent systems that transform businesses",
    summary: "AI/ML engineer with almost 2 years of experience skilled in Python, LLMs, computer vision, and cloud deployment. Built production-grade AI systems improving workflow efficiency by up to 45%. Experienced in chatbot development, RAG pipelines, model deployment, and agent-based automation. Fast learner delivering high-impact technical solutions.",
    profileImage: "",
    resumeUrl: "",
    ctaButtons: [
      { text: "View Projects", link: "/projects", primary: true },
      { text: "Contact Me", link: "/contact", primary: false }
    ],
    stats: [
      { label: "Years Experience", value: "2+" },
      { label: "Projects Completed", value: "15+" },
      { label: "Certifications", value: "5" },
      { label: "Efficiency Improvement", value: "45%" }
    ],
    published: true
  },
  
  about: {
    headline: "Transforming Ideas into Intelligent Solutions",
    longBio: `<p>I'm a passionate AI/ML Engineer based in Pakistan, dedicated to building intelligent systems that solve real-world problems. With a strong foundation in computer science and ongoing pursuit of a Master's in Artificial Intelligence from Bahria University, I combine academic excellence with practical industry experience.</p>
    
<p>My journey in AI began with a fascination for how machines can learn and adapt. This curiosity has evolved into expertise spanning deep learning, computer vision, natural language processing, and cloud deployment. I've had the privilege of working with innovative companies where I've contributed to projects that have measurably improved business outcomes.</p>

<p>What sets me apart is my ability to deliver production-ready solutions quickly while maintaining high quality standards. Whether it's building RAG pipelines that reduce response errors by 30%, creating chatbots that boost user engagement by 45%, or developing AI agents that enhance task execution accuracy by 35%, I focus on metrics that matter.</p>

<p>When I'm not coding, I'm actively contributing to the AI community as a Core Team Member of the AI Club, where I've helped impact 500+ students through events, workshops, and ML initiatives.</p>`,
    highlights: [
      "Production-grade AI systems with measurable impact",
      "Expert in RAG pipelines, LLMs, and chatbot development",
      "Strong foundation in computer vision and deep learning",
      "Proven track record of improving workflow efficiency",
      "Active AI community contributor"
    ],
    published: true
  },
  
  experience: [
    {
      id: "exp1",
      company: "Hubble42 Inc.",
      role: "Software Engineer (Python Developer)",
      location: "Remote",
      startDate: "Jul 2025",
      endDate: "Present",
      current: true,
      description: "Leading AI pipeline development and automation initiatives",
      bullets: [
        "Improved automation workflows by 40% through Python-based AI pipelines and API-driven systems",
        "Developed AI agents using MCP protocol, enhancing autonomous task execution accuracy by 35%",
        "Built scalable automation scripts and data pipelines, reducing manual workload by 50%",
        "Awarded Employee of the Month for delivering high-impact AI features ahead of schedule"
      ],
      techTags: ["Python", "AI Pipelines", "MCP Protocol", "API Development", "Automation"],
      order: 0,
      published: true
    },
    {
      id: "exp2",
      company: "Recruitment Xperts Pakistan",
      role: "Machine Learning Engineer",
      location: "Pakistan",
      startDate: "Jan 2025",
      endDate: "Jul 2025",
      current: false,
      description: "Built AI-powered healthcare recruitment solutions",
      bullets: [
        "Built an AI-powered healthcare recruitment chatbot, increasing candidate–job matching accuracy by 38%",
        "Designed RAG pipelines using Gemini, LangGraph, FAISS, and TF-IDF, cutting response errors by 30%",
        "Added Whisper + pyttsx3 voice interaction, boosting user engagement by 45%"
      ],
      techTags: ["RAG", "LangGraph", "FAISS", "Gemini", "Whisper", "TF-IDF"],
      order: 1,
      published: true
    },
    {
      id: "exp3",
      company: "UrduX",
      role: "Chatbot Developer",
      location: "Pakistan",
      startDate: "Jul 2024",
      endDate: "Sep 2024",
      current: false,
      description: "Developed legal assistant chatbot with advanced NLP",
      bullets: [
        "Developed a legal assistant chatbot with RAG + LLMs, improving answer relevance by 42%",
        "Deployed the system on Hugging Face, reducing latency by 25% through model optimization"
      ],
      techTags: ["RAG", "LLMs", "Hugging Face", "NLP", "Optimization"],
      order: 2,
      published: true
    },
    {
      id: "exp4",
      company: "Center of Excellence AI",
      role: "AI/ML Developer",
      location: "Pakistan",
      startDate: "Mar 2024",
      endDate: "Jun 2024",
      current: false,
      description: "Built mobile AI applications for plant disease detection",
      bullets: [
        "Built a Flutter-based plant disease detection app with ResNet-50 achieving 95% accuracy",
        "Optimized TFLite models, reducing on-device inference time by 33%"
      ],
      techTags: ["Flutter", "ResNet-50", "TFLite", "Computer Vision", "Mobile AI"],
      order: 3,
      published: true
    },
    {
      id: "exp5",
      company: "AI Club",
      role: "Core Team Member",
      location: "Bahria University",
      startDate: "Aug 2023",
      endDate: "Present",
      current: true,
      description: "Contributing to AI education and community building",
      bullets: [
        "Contributed to events, workshops, and ML initiatives impacting 500+ students"
      ],
      techTags: ["Community", "Education", "Workshops", "Machine Learning"],
      order: 4,
      published: true
    }
  ],
  
  projects: [
    {
      id: "proj1",
      title: "Lung Cancer Detection System",
      subtitle: "Final Year Project",
      description: "Hybrid CNN + ViT model achieving 92% accuracy (↑5%) with an LLM-based awareness chatbot integrated via FastAPI. The system combines state-of-the-art deep learning architectures for medical image analysis with conversational AI for patient education.",
      stack: ["Python", "PyTorch", "Vision Transformer", "CNN", "FastAPI", "LLM"],
      githubLink: "https://github.com/Muzammal-Bilal",
      liveLink: "",
      metrics: [
        { label: "Accuracy", value: "92%" },
        { label: "Improvement", value: "+5%" }
      ],
      images: [],
      featured: true,
      order: 0,
      published: true
    },
    {
      id: "proj2",
      title: "Face Recognition Attendance System",
      description: "Boosted recognition reliability by 28% using KNN + OpenCV. The system processes 2,000+ facial images ethically collected for a robust attendance tracking solution.",
      stack: ["Python", "OpenCV", "KNN", "Face Recognition", "NumPy"],
      githubLink: "https://github.com/Muzammal-Bilal",
      liveLink: "",
      metrics: [
        { label: "Reliability Boost", value: "+28%" },
        { label: "Images Processed", value: "2,000+" }
      ],
      images: [],
      featured: true,
      order: 1,
      published: true
    },
    {
      id: "proj3",
      title: "Plant Identification & Treatment App",
      description: "ResNet50-based model with 95% accuracy for identifying plant diseases and recommending treatments. Applied augmentation techniques that reduced overfitting by 40%.",
      stack: ["Python", "ResNet50", "TensorFlow", "Flutter", "Mobile"],
      githubLink: "https://github.com/Muzammal-Bilal",
      liveLink: "",
      metrics: [
        { label: "Accuracy", value: "95%" },
        { label: "Overfitting Reduction", value: "40%" }
      ],
      images: [],
      featured: true,
      order: 2,
      published: true
    },
    {
      id: "proj4",
      title: "Wildlife Classification (CNN)",
      description: "Sequential CNN for multi-species wildlife classification achieving 76% accuracy. Built for environmental conservation and wildlife monitoring applications.",
      stack: ["Python", "TensorFlow", "CNN", "Computer Vision"],
      githubLink: "https://github.com/Muzammal-Bilal",
      liveLink: "",
      metrics: [
        { label: "Accuracy", value: "76%" }
      ],
      images: [],
      featured: false,
      order: 3,
      published: true
    },
    {
      id: "proj5",
      title: "Traffic Sign Detection System",
      description: "CNN-based traffic sign detector achieving 81% accuracy with improved class balance. Designed for autonomous driving and road safety applications.",
      stack: ["Python", "TensorFlow", "CNN", "OpenCV", "Computer Vision"],
      githubLink: "https://github.com/Muzammal-Bilal",
      liveLink: "",
      metrics: [
        { label: "Accuracy", value: "81%" }
      ],
      images: [],
      featured: false,
      order: 4,
      published: true
    }
  ],
  
  skills: [
    {
      id: "cat1",
      category: "AI/ML",
      skills: [
        { name: "Deep Learning", proficiency: 90 },
        { name: "Computer Vision", proficiency: 88 },
        { name: "Transformers", proficiency: 85 },
        { name: "RAG Pipelines", proficiency: 92 },
        { name: "CAG", proficiency: 80 }
      ],
      order: 0,
      published: true
    },
    {
      id: "cat2",
      category: "Data & Analytics",
      skills: [
        { name: "Pandas", proficiency: 90 },
        { name: "NumPy", proficiency: 90 },
        { name: "Power BI", proficiency: 75 },
        { name: "Statistical Analysis", proficiency: 85 }
      ],
      order: 1,
      published: true
    },
    {
      id: "cat3",
      category: "LLM Tools",
      skills: [
        { name: "LangChain", proficiency: 90 },
        { name: "LangGraph", proficiency: 88 },
        { name: "FAISS", proficiency: 85 },
        { name: "Hugging Face", proficiency: 85 }
      ],
      order: 2,
      published: true
    },
    {
      id: "cat4",
      category: "Cloud & Deployment",
      skills: [
        { name: "AWS", proficiency: 78 },
        { name: "Hugging Face Spaces", proficiency: 85 },
        { name: "Streamlit", proficiency: 88 },
        { name: "Vercel", proficiency: 80 }
      ],
      order: 3,
      published: true
    },
    {
      id: "cat5",
      category: "Web & APIs",
      skills: [
        { name: "FastAPI", proficiency: 90 },
        { name: "Flask", proficiency: 85 },
        { name: "Django", proficiency: 75 }
      ],
      order: 4,
      published: true
    },
    {
      id: "cat6",
      category: "Databases & Tools",
      skills: [
        { name: "SQL Server", proficiency: 82 },
        { name: "MongoDB", proficiency: 78 },
        { name: "Git/GitHub", proficiency: 90 }
      ],
      order: 5,
      published: true
    }
  ],
  
  certifications: [
    {
      id: "cert1",
      title: "IBM AI Engineering Professional Certificate",
      issuer: "IBM",
      date: "Jun 9, 2025",
      credentialLink: "#",
      image: "",
      order: 0,
      published: true
    },
    {
      id: "cert2",
      title: "IBM Data Science Professional Certificate",
      issuer: "IBM",
      date: "Jan 20, 2025",
      credentialLink: "#",
      image: "",
      order: 1,
      published: true
    },
    {
      id: "cert3",
      title: "Machine Learning Specialization",
      issuer: "Stanford University",
      date: "Apr 15, 2025",
      credentialLink: "#",
      image: "",
      order: 2,
      published: true
    },
    {
      id: "cert4",
      title: "Google Advanced Data Analytics Professional Certificate",
      issuer: "Google",
      date: "Nov 27, 2024",
      credentialLink: "#",
      image: "",
      order: 3,
      published: true
    },
    {
      id: "cert5",
      title: "AWS Cloud Developing",
      issuer: "Amazon Web Services",
      date: "May 19, 2024",
      credentialLink: "#",
      image: "",
      order: 4,
      published: true
    }
  ],
  
  contact: {
    email: "Muzammalbilal36@gmail.com",
    phone: "+92 312 0233422",
    location: "Pakistan",
    linkedin: "https://linkedin.com/in/muzammal-bilal",
    github: "https://github.com/Muzammal-Bilal",
    twitter: "",
    calendlyLink: "",
    contactFormEnabled: true,
    published: true
  },
  
  education: [
    {
      id: "edu1",
      degree: "Master's in Artificial Intelligence",
      institution: "Bahria University",
      status: "In Progress",
      order: 0,
      published: true
    },
    {
      id: "edu2",
      degree: "Bachelor of Science in Computer Science",
      institution: "Bahria University",
      status: "Completed",
      order: 1,
      published: true
    }
  ]
};

export default seedData;
