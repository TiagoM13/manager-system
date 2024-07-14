import React from 'react';

interface InputRadioProps {
  required?: boolean;
  label?: string;
  name?: string;
  options: {
    opt1: string;
    opt2: string;
  };
}

export const InputRadio: React.FC<InputRadioProps> = ({
  required,
  label = 'Selecione uma opção',
  options,
  name,
}) => {
  return (
    <>
      <label className="block text-sm text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex gap-6">
        <OptionRadio name={name} id={options.opt1} value={options.opt1} />
        <OptionRadio name={name} id={options.opt2} value={options.opt2} />
      </div>
    </>
  );
};

type OptionRadioProps = {
  name?: string;
  id: string;
  value: string;
};

const OptionRadio = ({ name, id, value }: OptionRadioProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <input
        type="radio"
        name={name}
        id={`opt${id.toLowerCase()}`}
        className="cursor-pointer appearance-none h-[12px] w-[12px] border border-slate-600 rounded-full hover:bg-sky-200 checked:bg-sky-600 checked:hover:bg-sky-500 transition-all ease-in duration-500"
      />
      <label
        htmlFor={`opt${id.toLowerCase()}`}
        className="cursor-pointer text-slate-600"
      >
        {value}
      </label>
    </div>
  );
};
