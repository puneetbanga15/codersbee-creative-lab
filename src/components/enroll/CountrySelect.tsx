
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countries = [
  { code: 'US', dialCode: '+1', name: 'United States' },
  { code: 'CA', dialCode: '+1', name: 'Canada' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom' },
  { code: 'AU', dialCode: '+61', name: 'Australia' },
  { code: 'SE', dialCode: '+46', name: 'Sweden' },
  { code: 'IN', dialCode: '+91', name: 'India' },
  { code: 'AE', dialCode: '+971', name: 'UAE' },
  { code: 'SG', dialCode: '+65', name: 'Singapore' },
  { code: 'KR', dialCode: '+82', name: 'South Korea' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia' }
];

interface CountrySelectProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export const CountrySelect = ({ value, onValueChange }: CountrySelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[140px] h-12 text-base">
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.dialCode}>
            <span className="font-medium">{country.dialCode}</span>
            <span className="ml-2 text-gray-600">{country.name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
