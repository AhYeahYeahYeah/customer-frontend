import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { Chip, Slide } from '@mui/material';
import { FeaturedPlayList, LocalMall } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';

export default function Navigation() {
    // const theme = useTheme();
    const [value, setValue] = React.useState('产品');
    const [isHover, setHover] = React.useState(false);
    // const [unHover,setUnhover]= React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {isHover ? '' : <Chip sx={{ position: 'fixed', width: '30%', height: '1%', left: '37%', top: '93%' }} />}
            </div>
            <div onMouseLeave={() => setHover(false)} sx={{ display: 'flex' }}>
                <Slide direction="up" in={isHover} mountOnEnter unmountOnExit>
                    <BottomNavigation
                        sx={{ position: 'fixed', width: '30%', left: '37%', top: '89%', borderRadius: 20 }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction component={Link} to="/product" label="产品" value="产品" icon={<LocalMall />} />
                        <BottomNavigationAction component={Link} to="/favorite" label="收藏" value="收藏" icon={<FavoriteIcon />} />
                        <BottomNavigationAction component={Link} to="/order" label="订单" value="订单" icon={<FeaturedPlayList />} />
                        {/* <BottomNavigationAction */}
                        {/*    component={Link} */}
                        {/*    to={'/test2'} */}
                        {/*    label="Folder" */}
                        {/*    value="folder" */}
                        {/*    icon={<FolderIcon />} */}
                        {/* /> */}
                    </BottomNavigation>
                </Slide>
            </div>
        </>
    );
}
