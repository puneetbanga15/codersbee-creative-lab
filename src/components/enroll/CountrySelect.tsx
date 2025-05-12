
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countries = [
  { code: 'US', dialCode: '+1', name: 'United States' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom' },
  { code: 'SE', dialCode: '+46', name: 'Sweden' },
  { code: 'AU', dialCode: '+61', name: 'Australia' },
  { code: 'CA', dialCode: '+1', name: 'Canada' },
  { code: 'IN', dialCode: '+91', name: 'India' },
  { code: 'AE', dialCode: '+971', name: 'UAE' },
  { code: 'KR', dialCode: '+82', name: 'South Korea' },
  { code: 'SG', dialCode: '+65', name: 'Singapore' },
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
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.dialCode}>
            {country.dialCode} {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
