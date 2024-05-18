import React from 'react';

import { OptionsProps, SelectProps } from './types';
import { SelectContent, SelectLabel, SelectTrigger, SelectValue } from './ui';

import { SelectContainer } from './styles';

export type Props = React.ComponentProps<'button'> & SelectProps;

export const Select: React.FC<Props> = ({
  label,
  placeholder = 'Selecione um item',
  options,
  multiSelect,
  required,
  ...rest
}) => {
  // states
  const [active, setActive] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<OptionsProps[]>(
    [],
  );
  const [values, setValues] = React.useState<OptionsProps[]>(options);

  // ref
  const selectRef = React.useRef<HTMLDivElement>(null);

  // memo
  const initialOrder = React.useMemo(
    () => options.map((option) => option.id),
    [options],
  );

  // callbacks
  const handleActiveSelectOptions = React.useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleSelectOption = React.useCallback(
    (option: OptionsProps) => {
      if (multiSelect) {
        setSelectedOptions((prevSelected) =>
          prevSelected.find((item) => item.id === option.id)
            ? prevSelected.filter((item) => item.id !== option.id)
            : [...prevSelected, option],
        );
        setValues((prevValues) =>
          prevValues.find((item) => item.id === option.id)
            ? prevValues
            : prevValues.filter((item) => item.id !== option.id),
        );
      } else {
        setSelectedOptions([option]);
        // setValues((prevValues) =>
        //   prevValues.filter((item) => item.id !== option.id),
        // );
        setActive(false);
      }
    },
    [multiSelect],
  );

  const handleRemoveSelectedOption = React.useCallback(
    (option: OptionsProps, event: React.MouseEvent) => {
      event.stopPropagation();
      if (multiSelect) {
        setSelectedOptions((prevSelected) =>
          prevSelected.filter((item) => item.id !== option.id),
        );
        setValues((prevValues) => [...prevValues, option]);
      } else {
        setSelectedOptions([]);
        // setValues((prevValues) => {
        //   const newValues = [...prevValues, option];
        //   return newValues.sort(
        //     (a, b) => initialOrder.indexOf(a.id) - initialOrder.indexOf(b.id),
        //   );
        // });
      }
      setActive(false);
    },
    [multiSelect],
  );

  // effects
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [active]);

  return (
    <div>
      {label && (
        <label className="font-medium text-sm text-slate-600 text-wrap block mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <SelectContainer ref={selectRef}>
        <SelectTrigger {...rest} onClick={handleActiveSelectOptions}>
          <SelectValue
            placeholder={placeholder}
            label={label}
            selectedOptions={selectedOptions}
            multiSelect={multiSelect}
            onRemove={handleRemoveSelectedOption}
          />
        </SelectTrigger>

        {active === true && (
          <SelectContent values={values}>
            {values.map((option) => (
              <SelectLabel
                key={option.id}
                selected={selectedOptions.some(
                  (selected) => selected.id === option.id,
                )}
                onSelect={() => handleSelectOption(option)}
              >
                {option.label}
              </SelectLabel>
            ))}
          </SelectContent>
        )}
      </SelectContainer>
    </div>
  );
};
