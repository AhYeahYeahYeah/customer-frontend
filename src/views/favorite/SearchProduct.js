import PropTypes from 'prop-types';
import { Box, shouldForwardProp } from '@mui/system';
import { styled } from '@mui/material/styles';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { useTheme } from '@mui/styles';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

// eslint-disable-next-line react/prop-types
export default function SearchProduct({ updateSearchProduct }) {
    const theme = useTheme();
    return (
        <Box>
            <OutlineInputStyle
                id="input-search-header"
                // value={value}
                onChange={(e) => updateSearchProduct(e.target.value)}
                placeholder="搜索"
                startAdornment={
                    <InputAdornment position="start">
                        <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                    </InputAdornment>
                }
                aria-describedby="search-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
            />
        </Box>
    );
}
SearchProduct.protoTypes = {
    updateSearchProduct: PropTypes.func
};
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
