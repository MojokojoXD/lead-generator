'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '../../ui/badge';
import { Button } from '../../shadcnUI/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  'security',
  'pest control',
  'landscaping',
  'pools',
  'furniture, appliances & decor',
  'hvac & plumbing',
  'security & cameras',
  'medical services',
  'restaurants & dining',
  'automotive',
  'health & beauty',
  'education',
  'general shopping',
  'entertainment',
  'insurance'
];



export function CategoryFilterBar()
{
  const router = useRouter();
  const [ filterOffset, setFilterOffset ] = useState( 0 );
  const [ filterShiftCounter, setFilterShiftCounter ] = useState( 0 );
  const [ selectedCategories, setSelectedCategories ] = useState<string[]>( [] );

  const prevSelectedCategoriesCount = useRef<number>( selectedCategories.length )
  
  useEffect( () =>
  {
    if (selectedCategories.length !== prevSelectedCategoriesCount.current )
    {

      const searchParamsIterable = selectedCategories.map( c => [ 'filters', c ] );
      
      const marketplaceSearchParams = new URLSearchParams( searchParamsIterable );

      console.log( window.location.protocol )

      router.push( `${window.location.protocol}//${ window.location.host }/marketplace?${ marketplaceSearchParams.toString() }` );

    }

  }, [selectedCategories, router] )
  

  return (
    <div className='w-full flex space-x-1.5 items-center bg-white px-2 py-4 rounded' id='__filter-box-wrapper'>
      <Button
        id='__next-category-btn'
        variant={ 'ghost' }
        size={ 'icon' }
        className='[&_svg]:h-8 [&_svg]:w-8 [&_svg]:stroke-2'
        onClick={ () =>
        {
          const filterCarousel = document.getElementById( '__filter-carousel' )!;

          if ( filterShiftCounter === filterCarousel.children.length - 1 ) return;

          const categoriesClientBox = document.getElementById( '__filter-box' )?.getBoundingClientRect() as DOMRect;

          const firstVisibleElementInLineWidth = filterCarousel.children[ filterShiftCounter ].getBoundingClientRect().width;

          const lastElementClientRect = filterCarousel.lastElementChild?.getBoundingClientRect() as DOMRect;

          const isLastFilterCategoryVisible =
            lastElementClientRect.left >= categoriesClientBox.left &&
            lastElementClientRect.right <= categoriesClientBox.right;

          if ( !isLastFilterCategoryVisible )
          {
            setFilterOffset( prevState => prevState - ( firstVisibleElementInLineWidth + 4 ) );
            setFilterShiftCounter( prevState => prevState + 1 );
          }
        } }
      >
        <ChevronLeft className='stroke-slate-900' />
      </Button>
      <div className={ `h-full w-full overflow-hidden w-full` } id='__filter-box'>
        <div
          id='__filter-carousel'
          className={ 'w-full whitespace-nowrap space-x-1 transition-[transform] ease-out duration-500' }
          style={ {
            transform: `translate(${ filterOffset }px)`
          } }
        >
          { categories.sort( ( a, b ) => a.localeCompare( b ) ).map( c =>
            <Badge
              key={ c }
              label={ c }
              variant={ selectedCategories.includes( c ) ? 'outline' : 'base' }
              className='inline-block cursor-pointer transition-colors ease-out'
              onClick={ (  ) =>
              {

                prevSelectedCategoriesCount.current = selectedCategories.length;

                if ( selectedCategories.includes( c ) )
                {
                  const filteredCategories = selectedCategories.filter( d => c !== d );
                  setSelectedCategories( [ ...filteredCategories ] );
                  return;
                }

                setSelectedCategories( prevState => [ ...prevState, c ] );

              } }
            /> )
          }
        </div>
      </div>
      <Button
        variant={ 'ghost' }
        size={ 'icon' }
        disabled={ filterShiftCounter === 0 }
        className='[&_svg]:h-8 [&_svg]:w-8 [&_svg]:stroke-2'
        onClick={ () =>
        {

          if ( filterShiftCounter === 0 ) return;

          const filterCarousel = document.getElementById( '__filter-carousel' );

          const firstElementInViewClientBox = filterCarousel?.children[ filterShiftCounter - 1 ].getBoundingClientRect() as DOMRect;

          setFilterOffset( prevState => prevState + ( firstElementInViewClientBox?.width + 4 ) );

          setFilterShiftCounter( prevState => prevState - 1 );

        } }
      >
        <ChevronRight className='stroke-slate-900' />
      </Button>
    </div>
  );
}