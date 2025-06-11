'use client';

import { useState } from 'react';
import CourseGraph from '@/components/CourseGraph';
import Header from '@/components/Header';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <CourseGraph searchQuery={searchQuery} />
      </div>
    </main>
  );
}
