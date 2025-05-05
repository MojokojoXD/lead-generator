'use client';

import { Video, Bug, TreePalm, WavesLadder } from 'lucide-react';
import { CategoryButton } from '../category-button';

const catInfo = [
  {
    id: 0,
    name: 'Security, Cameras & Home Automation',
    icon: Video,
    href: '/survey/security'
  },
  {
    id: 1,
    name: 'Pest Control',
    icon: Bug,
    href: '/survey/pest-control'
  },
  {
    id: 2,
    name: 'Landscaping',
    icon: TreePalm,
    href: '/survey/landscaping'
  },
  {
    id: 3,
    name: 'Pools',
    icon: WavesLadder,
    href: '/survey/pools'
  }
];

export function CategoryPanel()
{
  return (
    <div className='grid grid-cols-4 gap-8 h-full max-w-7xl mx-auto items-center px-24'>
      { catInfo.map( b => (
        <div key={ b.id } className='h-full flex items-center'>
          <CategoryButton name={ b.name } destination={ b.href }>
            <b.icon className='h-1/4 w-1/4 stroke-1 fill-rose-500 stroke-rose-500' />
          </CategoryButton>
        </div>
      ) ) }
    </div>
  );
}