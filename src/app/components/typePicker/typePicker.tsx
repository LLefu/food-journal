import EntryType from "@/app/types/enums/entryType";
import {Select } from "flowbite-react";

interface TypePickerProps {
  setType: Function;
}

const selectTheme = {    
    field: {
    addon: '',
      select: {
        colors: {
          gray: "bg-neutral-500 border-transparent focus:border-transparent focus:ring-transparent",
        },
      },
    },
  };

  const TypePicker: React.FC<TypePickerProps> = ({ setType }) => {
    return (
      <div>
        <Select
          onChange={(item) => {
            setType(EntryType[item.target.value as keyof typeof EntryType]);
          }}
          theme={selectTheme}
          required
        >
          <option value={EntryType.Food}>Food</option>
          <option value={EntryType.Bathroom}>Bathroom</option>
          <option value={EntryType.StomacheStart}>Stomach Start</option>
          <option value={EntryType.StomacheEnd}>Stomach End</option>
        </Select>
      </div>
    );
  };

export default TypePicker;