import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function SelectTag() {
  return (
    <div className="flex w-1/2 gap-6 text-gray-400">
      <Select>
        <SelectTrigger className="w-1/3 rounded-md border-0 !p-0">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt">Português</SelectItem>
          <SelectItem value="en">Inglês</SelectItem>
          <SelectItem value="es">Espanhol</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-1/3 rounded-md border-0 !p-0">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tech">Tech</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          {/* Add more categories as needed */}
        </SelectContent>
      </Select>
    </div>
  );
}
