import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function SearchQuote() {
  return (
    <>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 bg-gray-200 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="h-9 border-0 bg-gray-200 p-0 pl-8 outline-none"
        />
      </div>
    </>
  );
}
