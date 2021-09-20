import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useGetServices } from '../api/services';
import Skeleton from '@mui/material/Skeleton';

type Props = {
  checked: number[];
  onChange: (value: number[]) => void;
};

const ServicesCheck = ({ checked, onChange }: Props) => {
  const [value, setValue] = useState(checked);
  const { data, isLoading } = useGetServices();

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setValue((prevValue) => [...prevValue, id]);
    } else {
      setValue((prevValue) => prevValue.filter((item) => item !== id));
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Services</FormLabel>
      {isLoading ? (
        <Skeleton variant="text" animation="wave" />
      ) : (
        <FormGroup>
          {data!.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checked={value.includes(item.id)}
                  onChange={(_, isChecked) => {
                    handleChange(item.id, isChecked);
                  }}
                  name={String(item.id)}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default ServicesCheck;
