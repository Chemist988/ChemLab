
import React, { useState, useMemo } from 'react';
import { QuizData } from '@/data/quizzes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProps {
  quizData: QuizData;
}

const Quiz = ({ quizData }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const selectedAnswerForCurrent = selectedAnswers[currentQuestionIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = useMemo(() => {
    if (!showResults) return 0;
    return quizData.questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? total + 1 : total;
    }, 0);
  }, [showResults, quizData.questions, selectedAnswers]);

  const progress = ((currentQuestionIndex + (showResults ? 1 : 0)) / quizData.questions.length) * 100;

  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results for "{quizData.title}"</CardTitle>
          <CardDescription>
            You scored {score} out of {quizData.questions.length}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quizData.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <div key={index} className={cn("p-4 rounded-lg border", isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10")}>
                <p className="font-semibold">{index + 1}. {question.text}</p>
                <div className="flex items-center gap-2 mt-2">
                  {isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                  <p>Your answer: {question.options[userAnswer]}</p>
                </div>
                {!isCorrect && <p className="text-sm text-green-600 dark:text-green-400 mt-1">Correct answer: {question.options[question.correctAnswer]}</p>}
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{quizData.title}</CardTitle>
        <CardDescription>{quizData.description}</CardDescription>
        <div className="pt-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-lg mb-6">{currentQuestion.text}</p>
        <RadioGroup
          value={selectedAnswerForCurrent?.toString()}
          onValueChange={(value) => handleSelectAnswer(parseInt(value))}
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border has-[:checked]:bg-accent">
              <RadioGroupItem value={index.toString()} id={`q${currentQuestionIndex}-o${index}`} />
              <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={selectedAnswerForCurrent === undefined}>
          {currentQuestionIndex < quizData.questions.length - 1 ? "Next Question" : "Finish Quiz"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
