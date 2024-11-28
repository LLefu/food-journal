import {Select } from "flowbite-react";

interface TypePickerProps {
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

const TypePicker: React.FC<TypePickerProps> = ({}) => {

  return <div >
        <Select onChange={(item)=>{console.log("click" + item.target.value)}} theme={selectTheme} required>
            <option>Food</option>
            <option>Toilet</option>
            <option>Stomacheache start</option>
            <option>Stomacheache end</option>
        </Select>
    </div>;
};

export default TypePicker;