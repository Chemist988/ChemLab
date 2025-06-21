
import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ElementQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correct: "Au",
      explanation: "Gold's symbol Au comes from its Latin name 'aurum'"
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
      correct: "Hydrogen",
      explanation: "Hydrogen is the first element with 1 proton"
    },
    {
      question: "What is the most abundant gas in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correct: "Nitrogen",
      explanation: "Nitrogen makes up about 78% of Earth's atmosphere"
    },
    {
      question: "Which element is essential for all organic compounds?",
      options: ["Oxygen", "Carbon", "Hydrogen", "Nitrogen"],
      correct: "Carbon",
      explanation: "Carbon forms the backbone of all organic molecules"
    },
    {
      question: "What is the chemical symbol for Sodium?",
      options: ["So", "Sd", "Na", "S"],
      correct: "Na",
      explanation: "Sodium's symbol Na comes from its Latin name 'natrium'"
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizComplete) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl mb-4">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
                  {score}/{questions.length}
                </div>
                <p className="text-gray-300 text-lg">
                  {score === questions.length ? "Perfect! You're a chemistry master!" :
                   score >= questions.length * 0.8 ? "Excellent work!" :
                   score >= questions.length * 0.6 ? "Good job! Keep studying!" :
                   "Keep learning and try again!"}
                </p>
              </div>
              <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Element Quiz</h1>
          <p className="text-gray-300">Test your chemistry knowledge</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
              <div className="text-white">
                Score: {score}/{questions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h2 className="text-xl text-white mb-4">{questions[currentQuestion].question}</h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    variant="outline"
                    className={`w-full text-left justify-start h-auto py-3 px-4 border-white/30 text-white hover:bg-white/10 ${
                      showResult && option === questions[currentQuestion].correct 
                        ? 'bg-green-600 border-green-500' 
                        : showResult && option === selectedAnswer && option !== questions[currentQuestion].correct
                        ? 'bg-red-600 border-red-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {showResult && option === questions[currentQuestion].correct && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {showResult && option === selectedAnswer && option !== questions[currentQuestion].correct && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="mb-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                <p className="text-blue-400 mb-2">
                  {selectedAnswer === questions[currentQuestion].correct ? 'Correct!' : 'Incorrect!'}
                </p>
                <p className="text-gray-300 text-sm">{questions[currentQuestion].explanation}</p>
              </div>
            )}

            {showResult && (
              <div className="text-center">
                <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700">
                  {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElementQuizPage;
