import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// eslint-disable-next-line react/prop-types
export default function RegionCheck({ setRegions }) {
    return (
        <Autocomplete
            multiple
            id="checkboxes"
            limitTags={2}
            /* eslint-disable-next-line no-use-before-define */
            defaultValue={[]}
            /* eslint-disable-next-line no-use-before-define */
            options={province}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => {
                setRegions(newValue);
            }}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option.title}
                </li>
            )}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="请选择地域" placeholder="省份" />}
        />
    );
}
RegionCheck.protoTypes = {
    setRegions: PropTypes.func
};
const province = [
    { title: '北京市' },
    { title: '天津市' },
    { title: '河北省' },
    { title: '山西省' },
    { title: '内蒙古' },
    { title: '辽宁省' },
    { title: '吉林省' },
    {
        title: '黑龙江省'
    },
    {
        title: '上海市'
    },
    {
        title: '江苏省'
    },
    {
        title: '浙江省'
    },
    {
        title: '安徽省'
    },
    {
        title: '福建省'
    },
    {
        title: '江西省'
    },
    {
        title: '山东省'
    },
    {
        title: '河南省'
    },
    {
        title: '湖北省'
    },
    {
        title: '湖南省'
    },
    {
        title: '广东省'
    },
    {
        title: '海南省'
    },
    {
        title: '广西壮族自治区'
    },
    {
        title: '甘肃省'
    },
    {
        title: '陕西省'
    },
    {
        title: '新疆省'
    },
    {
        title: '青海省'
    },
    {
        title: '宁夏省'
    },
    {
        title: '重庆市'
    },
    {
        title: '四川省'
    },
    {
        title: '贵州省'
    },
    {
        title: '云南省'
    },
    {
        title: '西藏省'
    },
    {
        title: '台湾'
    },
    {
        title: '澳门'
    },
    {
        title: '香港'
    }
];
