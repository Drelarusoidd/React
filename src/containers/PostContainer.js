import httpClient from '../services/httpClient';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostService from '../services/PostService';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Post = () => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [images, setImages] = useState(null);
    const [recentTracks, setRecentTracks] = useState([]);
    const [trackId, setTrackId] = useState("");

    useEffect (() => {
        httpClient.get('/track/')
            .then((response) => {
                setRecentTracks(response.data);
            })
    }, [])

    const addPost = async () => {
        var formField = new FormData();

        formField.append('title', title);
        formField.append('text', text);
        if (trackId) {
            formField.append('recent_tracks', trackId);
        }
        if (images) {
            images.forEach(element => {
                formField.append('images', element)
            })
        }
        const response = await PostService(formField);
    }

    const boxStyle = {
        position: 'absolute',
        top:'50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '500px', 
        bgcolor: 'background.paper', 
        padding: '2%',
    }

    const handleRecentTracks = (event) => {setTrackId(event.target.value)}
    const handleTitle = (event) => {setTitle(event.target.value)}
    const handleText = (event) => {setText(event.target.value)}
    const handleImages = (event) => {
        const imagesArray = []
        if (event.target.files) {
            Array.from(event.target.files).forEach(element => {
                imagesArray.push(element);
            })
        }
        setImages(imagesArray);
    }

    const haveTracks = (tracks) => tracks.length != 0

    console.log(recentTracks);

    return (
        <Box sx={boxStyle}>
            <Typography variant="h6" id="modal-modal-title" sx={{paddingBottom: '2%'}}>
                Add post:
            </Typography>
            <TextField 
                sx={{paddingBottom: '2%'}}
                fullWidth id="outlined-basic"
                label="Title" 
                variant="outlined"
                name="title"
                value={title}
                onChange={handleTitle}
            />
            <TextareaAutosize
                minRows={4}
                placeholder="Text post"
                style={{width: '100%', paddingBottom: '2%'}}
                name="text"
                value={text}
                onChange={handleText}
            />
            <h4>Upload images</h4>
            <input accept="image/*" multiple type="file" onChange={handleImages}/>
            <br></br>
            <br></br>
            {haveTracks(recentTracks)
                ?<><label for="recent_tracks">Choose recent track :</label> <br></br>
                <select name="recent_tracks" id="recent_tracks" onChange={handleRecentTracks} style={{width: '50%'}}>
                    <option value=''>List of tracks</option>
                    {recentTracks.map((track) => (
                        <option value={track.id}>{track.name}</option>
                    ))}
                </select>
                <br></br>
                </>
                :<Link to="/upload">Upload track</Link>
            }
            
            <br></br>
            <Button 
                type="submit"
                sx={{marginTop: '2%'}}
                variant="contained"
                onClick={addPost}
            >
                Add
            </Button>
        </Box>
    )
}

export default Post;
