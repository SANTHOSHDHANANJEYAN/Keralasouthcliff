// app/villas/[id]/page.tsx  (Server Component)
import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import VillaClient from './VillaClient';

export default function VillaPage({ params }: { params: { id: string } }) {
  const villa = getVillaById(params.id);

  if (!villa) {
    notFound();
  }

  return <VillaClient villa={villa} />;
}

// Generate static pages foreach villa
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
