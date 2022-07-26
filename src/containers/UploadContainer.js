import { useEffect, useState } from 'react';
import httpClient from '../services/httpClient';
import convertDate from '../utils/convertDate';
import PlaylistContainer from './PlaylistContainer';
import TrackService from '../services/TrackService';
import { FileUploader } from "react-drag-drop-files";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UploadContainer = () =>{
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [visibility, setVisibility] = useState("");
    const [track, setTrack] = useState(null);
    const [cover, setCover] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [recentPlaylists, setRecentPlaylists] = useState("");
    const [empty, setEmpty] = useState(false);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [update, setUpdate] = useState("");

    useEffect(() => {
        const getPlaylists = () =>{
            httpClient.get('/playlist/user/')
            .then((response) => {
                setPlaylists(response.data);
            })
            .catch((error) => {
                setEmpty(!empty);
            })
        }
        getPlaylists();
    }, [update])

    const boxStyle = {
        position: 'absolute',
        top: '20%',
        left: '35%',
        width: '30%'
    }
    const typeTracks = ["MP3"]
    const typeImages = ["JPG", "PNG", "JPEG"]

    const handleTrack = (track) => setTrack(track)
    const handleCover = (cover) => setCover(cover)
    const handleName = (event) => setName(event.target.value)
    const handleGenre = (event) => setGenre(event.target.value)
    const handleVisibility = (event) => setVisibility(event.target.value)
    const handleDate = (dateValue) => setDate(dateValue)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleUpdate = (flag) => setUpdate(flag)

    const handleUpload = async() => {
        const formField = new FormData();

        formField.append('name', name);
        formField.append('genre', genre);
        formField.append('visibility', visibility);
        formField.append('track', track);
        formField.append('cover', cover);
        if (date) {
            formField.append('year', convertDate(date));
        }
        recentPlaylists.forEach(playlist => {
            formField.append('recent_playlists', playlist);
        })
        await TrackService(formField)
    }

    const handlePlaylists = (event) => {
        const optionsArray = []
        Array.from(event.target.options).forEach(option => {
            if (option.selected){
                optionsArray.push(option.value)
            }
        })
        if (optionsArray.length > 0) {
            setDisabled(false);
        }else{
            setDisabled(true);
        }
        setRecentPlaylists(optionsArray);
    }
 
    return (
        <Box sx={boxStyle}>
            <TextField
                fullWidth
                sx={{paddingBottom: '2%'}}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleName}
            />
            <br></br>
            <TextField
                fullWidth
                sx={{paddingBottom: '2%'}}
                id="outlined-basic"
                label="Genre"
                variant="outlined"
                value={genre}
                onChange={handleGenre}
            />
            <br></br>
            <Typography variant='h7'>Upload track</Typography>
            <FileUploader
                label="Upload track or drop a file right here"
                handleChange={handleTrack}
                name="track"
                types={typeTracks}
            />
            <p style={{textAlign: 'center'}}>{track ? `File name: ${track.name}` : "no files uploaded yet"}</p>
            <Typography variant='h7'>Upload cover</Typography>
            <FileUploader
                label="Upload images or drop a file right here"
                handleChange={handleCover}
                name="cover"
                types={typeImages}
            />
            <p style={{textAlign: 'center'}}>{cover ? `File name: ${cover.name}` : "no files uploaded yet"}</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Relise date"
                    value={date}
                    maxDate={new Date()}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <br></br>
            <label htmlFor="visibility">Visibility:</label>
            <br></br>
            <select name="visibility" style={{width: '100%'}} onChange={handleVisibility}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            {empty
                ?
                <>
                <Button variant="outlined" onClick={handleOpen}>Create playlist</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <PlaylistContainer updatePlaylist={handleUpdate}/>
                </Modal>
                {disabled && <h6 style={{opacity: '0.4'}}>*requried field</h6>}
                </>
                :
                <>
                <label htmlFor="recent_playlists">Recent playlists:</label>
                <br></br>
                <select name="recent_playlists" style={{width: '100%'}} onChange={handlePlaylists} multiple>
                {playlists.map((playlist) => (
                    <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
                ))}
                </select>
                {disabled && <h6 style={{opacity: '0.4'}}>*requried field</h6>}
                <br></br><br></br>
                <Button variant="outlined" onClick={handleOpen}>Create playlist</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <PlaylistContainer updatePlaylist={handleUpdate}/>
                </Modal>
                </>
            }
            <br></br><br></br>
            <Button variant="outlined" onClick={handleUpload} disabled={disabled && disabled}>Upload</Button>
            <br></br><br></br>
        </Box>
    )
}

export default UploadContainer;
