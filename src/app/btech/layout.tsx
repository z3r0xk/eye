import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eyes on Bachelor',
  description: 'Navigate through Bachelor of Technology course requirements and dependencies.',
};

export default function BTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 