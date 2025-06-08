"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import
  {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover";
  

interface DatePickerProps
{
  currentDate: string;
  onDateChange: ( date: string ) => void;

  placeholder?: string;
}

export function DatePicker({ currentDate, onDateChange, placeholder }: DatePickerProps)
{
  const [ open, setOpen ] = React.useState( false );

  const currentDateObj = !Number.isNaN( Date.parse( currentDate ) ) ?
    new Date( currentDate ) : undefined;

  return (
    <div className="flex flex-col gap-3">
      <Popover open={ open } onOpenChange={ setOpen }>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="h-14 py-2 px-3 w-full justify-between font-normal"
          >
            { currentDate || (placeholder ?? 'Select date') }
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={ currentDateObj }
            captionLayout="dropdown"
            onSelect={ ( date ) =>
            {
              onDateChange( date?.toLocaleDateString() ?? '' )
              setOpen( false );
            } }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
