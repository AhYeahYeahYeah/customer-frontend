import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import PropTypes from 'prop-types';

const productSort = ['为您推荐', '通知存款', '定期存款', '活期存款', '大额存单'];
// eslint-disable-next-line react/prop-types
export default function ComboBox({ updateProductSort }) {
    const [value, setValue] = useState(productSort[0]);
    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                updateProductSort(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={productSort}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="产品分类" />}
        />
    );
}
ComboBox.protoTypes = {
    updateProductSort: PropTypes.func
};
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
