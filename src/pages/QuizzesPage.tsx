
import React from 'react';
import Quiz from '@/components/Quiz';
import { quizzes } from '@/data/quizzes';
import { BrainCircuit } from 'lucide-react';

const QuizzesPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <BrainCircuit className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Chemistry Quizzes</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Test your knowledge with these interactive quizzes.
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        {quizzes.map((quiz, index) => (
          <Quiz key={index} quizData={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizzesPage;
