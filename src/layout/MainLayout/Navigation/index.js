import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { Chip, Slide } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

export default function Navigation() {
    // const theme = useTheme();
    const [value, setValue] = React.useState('recents');
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
                        sx={{ position: 'fixed', width: '30%', left: '37%', top: '89%' }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction component={Link} to="/dashboard" label="Recents" value="recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction
                            component={Link}
                            to="/dashboard"
                            label="Favorites"
                            value="favorites"
                            icon={<FavoriteIcon />}
                        />
                        {/* <BottomNavigationAction */}
                        {/*    component={Link} */}
                        {/*    to={'/test2'} */}
                        {/*    label="Nearby" */}
                        {/*    value="nearby" */}
                        {/*    icon={<LocationOnIcon />} */}
                        {/* /> */}
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
