import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function ControllableStates({ value, saveId, Id }) {
    const [inputValue, setInputValue] = React.useState('');
    // const [options, setOptions] = React.useState([]);
    // useEffect(() => {
    //     console.log(value);
    // });
    return (
        <div>
            <Autocomplete
                value={Id !== '' ? Id : null}
                onChange={(event, newValue) => {
                    saveId(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={value}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="请选择模板" />}
            />
        </div>
    );
}

ControllableStates.protoTypes = {
    value: PropTypes.array,
    saveId: PropTypes.func
};
