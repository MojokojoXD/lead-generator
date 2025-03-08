'use client';

import { Video, Bug, TreePalm, WavesLadder } from 'lucide-react';
import { CategoryButton } from '../CategoryButton';

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
    <div className='grid grid-cols-4 h-full w-fit gap-8 items-center'>
      { catInfo.map( b => (
        <CategoryButton key={b.id} name={ b.name } destination={b.href}>
          <b.icon className='h-1/2 w-1/3 stroke-1 fill-rose-500 stroke-rose-500'/>
        </CategoryButton>
      ) ) }
    </div>
  )
}