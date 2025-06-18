
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the chemical formula for water?',
    options: ['H₂O', 'HO₂', 'H₃O', 'OH₂'],
    correctAnswer: 0,
    explanation: 'Water consists of 2 hydrogen atoms and 1 oxygen atom, making its formula H₂O.'
  },
  {
    id: '2',
    question: 'Which element has the atomic number 6?',
    options: ['Oxygen', 'Nitrogen', 'Carbon', 'Boron'],
    correctAnswer: 2,
    explanation: 'Carbon has 6 protons in its nucleus, giving it an atomic number of 6.'
  },
  {
    id: '3',
    question: 'What type of bond forms between sodium and chlorine in salt?',
    options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'],
    correctAnswer: 1,
    explanation: 'Sodium loses an electron to chlorine, forming an ionic bond between Na⁺ and Cl⁻ ions.'
  },
  {
    id: '4',
    question: 'What is the most abundant gas in Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
    correctAnswer: 2,
    explanation: 'Nitrogen makes up about 78% of Earth\'s atmosphere.'
  },
  {
    id: '5',
    question: 'Which of these is a noble gas?',
    options: ['Hydrogen', 'Helium', 'Lithium', 'Beryllium'],
    correctAnswer: 1,
    explanation: 'Helium is a noble gas with a complete outer electron shell, making it unreactive.'
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  const isQuizComplete = answeredQuestions.every(answered => answered);
  const question = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Chemistry Quiz</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Test your chemistry knowledge with these fun questions!
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Question {currentQuestion + 1} of {quizQuestions.length}
              </CardTitle>
              <Badge variant="secondary">
                Score: {score}/{quizQuestions.length}
              </Badge>
            </div>
            <CardDescription>
              {isQuizComplete ? 'Quiz Complete!' : 'Choose the best answer'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isQuizComplete ? (
              <>
                <div className="text-lg font-medium">
                  {question.question}
                </div>
                
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answeredQuestions[currentQuestion]}
                      className={`w-full p-4 text-left rounded-lg border transition-all ${
                        answeredQuestions[currentQuestion]
                          ? index === question.correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : selectedAnswer === index
                            ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          : 'hover:bg-accent hover:border-accent-foreground/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answeredQuestions[currentQuestion] && (
                          <>
                            {index === question.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                            {selectedAnswer === index && index !== question.correctAnswer && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {showResult && (
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-medium mb-2">
                      {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {question.explanation}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Quiz
                  </Button>
                  
                  {showResult && currentQuestion < quizQuestions.length - 1 && (
                    <Button onClick={nextQuestion}>
                      Next Question
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-6xl">🎉</div>
                <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                <p className="text-lg">
                  You scored {score} out of {quizQuestions.length} questions correctly!
                </p>
                <div className="text-sm text-muted-foreground">
                  {score === quizQuestions.length && "Perfect score! You're a chemistry master! 🧪"}
                  {score >= quizQuestions.length * 0.8 && score < quizQuestions.length && "Great job! You know your chemistry well! 👏"}
                  {score >= quizQuestions.length * 0.6 && score < quizQuestions.length * 0.8 && "Not bad! Keep studying chemistry! 📚"}
                  {score < quizQuestions.length * 0.6 && "Keep learning! Chemistry is fascinating! 🔬"}
                </div>
                <Button onClick={resetQuiz} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Take Quiz Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
