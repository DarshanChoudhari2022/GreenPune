import { promises as fs } from "fs";
import path from "path";

export type QuestionItem = {
  id: string;
  type: "text" | "textarea" | "yes_no";
  labelEnglish: string;
  labelMarathi: string;
  placeholderEnglish: string;
  placeholderMarathi: string;
  required: boolean;
};

const questionsPath = path.join(process.cwd(), "data", "questions.json");

const defaultQuestions: QuestionItem[] = [
  {
    id: "canBringTree",
    type: "yes_no",
    labelEnglish: "Can you bring your own tree sapling?",
    labelMarathi: "आपण आपले वृक्ष स्वतः आणू शकता का?",
    placeholderEnglish: "",
    placeholderMarathi: "",
    required: true
  }
];

export async function listQuestions(): Promise<QuestionItem[]> {
  try {
    const raw = await fs.readFile(questionsPath, "utf8");
    return JSON.parse(raw) as QuestionItem[];
  } catch {
    // If file doesn't exist, write defaults and return
    await saveQuestions(defaultQuestions);
    return defaultQuestions;
  }
}

export async function saveQuestions(questions: QuestionItem[]): Promise<void> {
  await fs.mkdir(path.dirname(questionsPath), { recursive: true });
  await fs.writeFile(questionsPath, JSON.stringify(questions, null, 2), "utf8");
}

export async function addQuestion(question: QuestionItem): Promise<void> {
  const list = await listQuestions();
  list.push(question);
  await saveQuestions(list);
}

export async function updateQuestion(question: QuestionItem): Promise<void> {
  const list = await listQuestions();
  const index = list.findIndex(q => q.id === question.id);
  if (index !== -1) {
    list[index] = question;
    await saveQuestions(list);
  }
}

export async function deleteQuestion(id: string): Promise<void> {
  const list = await listQuestions();
  const filtered = list.filter(q => q.id !== id);
  await saveQuestions(filtered);
}
