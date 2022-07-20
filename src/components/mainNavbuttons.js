import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import Button from '@mui/material/Button';


export default function MainNavbuttons() {
    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <AudiotrackRoundedIcon /> {/* just a clickable icon. Assign menu items later */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button component={Link} to="/" color="inherit">Musichub</Button>
            </Typography>
        </>
    )
}
