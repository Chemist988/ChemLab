
import React from 'react';
import ReactionBalancer from '@/components/ReactionBalancer';

const ReactionBalancerPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-orbitron">Reaction Balancer</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Enter a chemical equation to see it balanced.
        </p>
      </header>
      <main>
        <ReactionBalancer />
      </main>
    </div>
  );
};

export default ReactionBalancerPage;
