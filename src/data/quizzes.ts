
export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  title: string;
  description: string;
  questions: Question[];
}

export const quizzes: QuizData[] = [
  {
    title: "Basics of Chemistry",
    description: "Test your fundamental knowledge of chemistry concepts.",
    questions: [
      {
        text: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "G", "Go"],
        correctAnswer: 1,
      },
      {
        text: "Which of the following is a noble gas?",
        options: ["Oxygen", "Nitrogen", "Helium", "Chlorine"],
        correctAnswer: 2,
      },
      {
        text: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "1"],
        correctAnswer: 1,
      },
      {
        text: "Which element is the most abundant in the Earth's crust?",
        options: ["Iron", "Silicon", "Oxygen", "Aluminum"],
        correctAnswer: 2,
      },
      {
        text: "What type of bond involves the sharing of electron pairs between atoms?",
        options: ["Ionic Bond", "Metallic Bond", "Hydrogen Bond", "Covalent Bond"],
        correctAnswer: 3,
      },
    ],
  },
];
