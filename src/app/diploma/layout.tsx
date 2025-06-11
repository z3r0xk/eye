import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eyes on Diploma',
  description: 'Visualize and explore Computer Science Diploma course prerequisites and relationships.',
};

export default function DiplomaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 