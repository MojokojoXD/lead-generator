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
  currentDate: Date | undefined;
  onDateChange: ( date: Date | undefined ) => void;

  placeholder?: string;
}

export function DatePicker({ currentDate, onDateChange, placeholder }: DatePickerProps)
{
  const [ open, setOpen ] = React.useState( false );

  return (
    <div className="flex flex-col gap-3">
      <Popover open={ open } onOpenChange={ setOpen }>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="h-14 py-3 px-2 w-48 justify-between font-normal"
          >
            { currentDate ? currentDate.toLocaleDateString() : placeholder ?? 'Select date' }
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={ currentDate }
            captionLayout="dropdown"
            onSelect={ ( date ) =>
            {
              onDateChange( date )
              setOpen( false );
            } }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
