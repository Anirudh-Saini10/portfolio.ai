export type Certification = {
  title: string;
  issuer: string;
  detail?: string;
  category: "ML" | "DL" | "GenAI" | "RAG" | "Algorithms" | "Award";
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford · Coursera",
    detail: "3-course specialization",
    category: "ML",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "NPTEL · IIT Madras",
    detail: "Elite Certification",
    category: "ML",
  },
  {
    title: "Deep Learning",
    issuer: "IIT Ropar",
    detail: "Elite + Silver Medal",
    category: "DL",
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    category: "DL",
  },
  {
    title: "Generative AI Engineering with LLMs",
    issuer: "IBM · Coursera",
    detail: "Fine-Tuning Transformers",
    category: "GenAI",
  },
  {
    title: "AI Agents using RAG and LangChain",
    issuer: "IBM · Coursera",
    detail: "Fundamentals",
    category: "RAG",
  },
  {
    title: "Generative AI Applications with RAG and LangChain",
    issuer: "IBM · Coursera",
    category: "RAG",
  },
  {
    title: "Design and Analysis of Algorithms",
    issuer: "NPTEL",
    category: "Algorithms",
  },
  {
    title: "Manipal University Dean's List",
    issuer: "Manipal University Jaipur",
    detail: "Academic Excellence",
    category: "Award",
  },
  {
    title: "Student Excellence Award",
    issuer: "Manipal University Jaipur",
    category: "Award",
  },
  {
    title: "Model United Nations Awardee",
    issuer: "Public Speaking & Diplomacy",
    category: "Award",
  },
];
