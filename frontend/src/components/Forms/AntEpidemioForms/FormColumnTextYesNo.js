import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { onEpidemioChange } from 'redux/Forms';
import React from 'react';

const FormColumnTextYesNo = (props) => {
  const {
    classes,
    question,
    radioLabel,
    radioName,
    radioValue,
    children,
    form,
  } = props;
  const dispatch = useDispatch();
  return (
    <div className={classes.formContent}>
      <div className={`${classes.formColumn} ${classes.formColumnBig}`}>
        <Typography>{question}</Typography>
      </div>

      <div className={`${classes.formColumn} ${classes.formColumnSmall}`}>
        <FormControl component="fieldset">
          <RadioGroup
            style={{ justifyContent: 'center' }}
            row
            aria-label={radioLabel}
            name={radioName}
            value={radioValue}
            onChange={(e) =>
              dispatch(
                onEpidemioChange({
                  name: e.target.name,
                  value: e.target.value,
                  form: form,
                })
              )
            }
          >
            <FormControlLabel value="0" control={<Radio />} label="No" />
            <FormControlLabel value="1" control={<Radio />} label="Si" />
          </RadioGroup>
        </FormControl>
      </div>
      {children}
    </div>
  );
};

export default FormColumnTextYesNo;
