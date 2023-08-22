import css from './MultipleSelectChip.module.css';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();

  return (
    <div className={css['fields__column']}>
      <div className={css['fields__label']}>
        {props.requredField && <label className={css['fields__label--required']}>*</label>}
        <label
          className={`${css['fields__label--text']} ${!props.requredField && css['fields__field--notrequired']}`}
        >
          {props.label}
        </label>
      </div>
      <FormControl sx={{ width: 257 }}>
        <InputLabel id="demo-multiple-chip-label">{props.defaultValue}</InputLabel>
        <Select
          name={props.name}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.value}
          onChange={props.updateHandler}
          input={<OutlinedInput id="select-multiple-chip" label={props.defaultValue} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.options.map((option) => (
            <MenuItem
              key={option.name}
              value={option.name}
              style={{
                ...getStyles(option.name, props.value, theme),
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                letterSpacing: '-0.01em',
                backgroundColor: props.value.includes(option.name) && '#1890FF',
                color: props.value.includes(option.name) && 'white',
              }}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {props.requredField &&
        <div className={css['error-message']}>
          {props.error}
        </div>
      }
    </div>
  );
}