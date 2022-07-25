import { useState } from 'react';
import PlaylistService from '../services/PlaylistService';
import convertDate from '../utils/convertDate';
import { FileUploader } from "react-drag-drop-files";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const PlaylistContainer = () => {

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState(null);
    const [cover, setCover] = useState(null);

    const playlistContainerStyle =  {
        position: 'absolute',
        top:'50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '500px', 
        bgcolor: 'background.paper', 
        padding: '2%',
        paddingBottom: '2%'
    }

    const textStyle = {paddingBottom: '2%'}

    const createPlaylist = async() => {
        const formField = new FormData();

        formField.append('name', name);
        formField.append('genre', genre);
        formField.append('year', convertDate(date));
        formField.append('cover', cover);
        await PlaylistService(formField);
    }
    
    const handleName = (event) => setName(event.target.value)
    const handleGenre = (event) => setGenre(event.target.value)
    const handleDate = (dateValue) => setDate(dateValue)
    const handleCover = (file) => setCover(file)

    const fileTypes = ["JPEG", "JPG", "PNG"]

    return (
        <Box sx={playlistContainerStyle}>
            <Typography variant="h6" id="modal-modal-title" sx={textStyle}>
                Create playlist
            </Typography>
            <TextField
                sx={textStyle}
                fullWidth
                id="outlined-basic"
                label="name"
                variant="outlined"
                value={name}
                onChange={handleName}
            />
            <TextField
                sx={textStyle}
                fullWidth
                id="outlined-basic"
                label="genre"
                variant="outlined"
                value={genre}
                onChange={handleGenre}
            />
            <FileUploader
                handleChange={handleCover}
                name="cover"
                types={fileTypes}
            />
            <p style={{textAlign: 'center'}}>{cover ? `File name: ${cover.name}` : "no files uploaded yet"}</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Year of playlist"
                    value={date}
                    maxDate={new Date()}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <br></br><br></br>
            <Button variant="contained" onClick={createPlaylist}>Create</Button>
        </Box>
    )
}

export default PlaylistContainer;
