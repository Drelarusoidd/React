import React, {useState} from "react";
import Post from './PostContainer';
import Reactions from './ReactionsContatiner';
import Player from "../components/PlayerComponent";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const FeedContainer = ({news, user}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isAuthor = (author) => author !== user.id

    const typeLink = (data) => {
        if (data?.type === 'track'){
            return <Player id={data?.id} />
        }else if (data?.type === 'image'){
            return <span><img src={process.env.REACT_APP_BACKEND_URL + data?.link} style={{width: '200px'}} alt="cover"/><br></br><br></br></span>
        }
    }

    return(
        <Box component="div">
            <Grid container spacing={1}>
            {news.results?.map((post) =>(
                <Grid item xs={9} key={post.id}>
                    <Card sx={{margin: '2%'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <Reactions userId={user.id} post={post} postUser={post.user} />
                            </Typography>
                            <Typography variant="body2">
                                {post.text}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {post.attachments?.map((attach) => (
                                    typeLink(attach)
                                ))}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {isAuthor(news.results[0].user)
             ? null
             : <>
                    <Grid item xs={2} sx={{position: 'fixed', top: '70px', left: '90%'}}>
                        <Button variant="outlined" onClick={handleOpen}>Add post</Button>
                    </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <Post />
                </Modal>
                </>
            }
            </Grid>
        </Box>
    )
}

export default FeedContainer;
