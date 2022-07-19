import React, { useEffect, useState } from "react";
import httpClient from "../services/httpClient";
import {useParams} from "react-router-dom";
import "../App.css"
import "../player.js";
import Reactions from "../containers/ReactionsContatiner";
import Post from "../containers/PostContainer";
import Pagination from "react-js-pagination";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Player from "./PlayerComponent";

const NewsComponent = () => {
    const params = useParams();
    const pk = params.pk;
    const [news, setNews] = useState({});
    const [page, setPage] = useState(1);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);

    const handlePageNumber = (pageNumber) => {setPage(pageNumber)};

    useEffect(() =>{
        const getNews = async() => {
            httpClient.get(`/feed/${pk}/?page=${page.toString()}`)
                .then((response) => {
                    setNews(response.data);
                    httpClient.get('/profile/')
                        .then((response) => {
                            setUser(response.data);
                        })
            })
        }
        getNews();
    }, [page])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isAuthor = (author) => author !== user.id

    const typeLink = (data, index) => {
        if (data?.type === 'track'){
            return <Player index={index} trackUrl={data?.track} cover={data?.cover} id={data?.id} />
        }else if (data?.type === 'image'){
            return <span><img src={process.env.REACT_APP_BACKEND_URL + data?.link} style={{width: '200px'}} alt="cover"/><br></br><br></br></span>
        }
    }

    const reaction = (author) => {
        if (author != user.id ){
            return ""
        }else{
            return "disabled"
        }
    }

    if (Number(news.count) > 5){
        return(
            <>
                <Box component="div">
                    <Grid container spacing={1}>
                {news.results?.map((post, index) =>(
                        <Grid item xs={9}>
                            <Card sx={{margin: '2%'}}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        <Reactions user={user} post={post} disabled={reaction(post.user)} />
                                    </Typography>
                                    <Typography variant="body2">
                                        {post.text}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        {post.attachments?.map((attach) => (
                                            typeLink(attach, index)
                                        ))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                ))}
                    {reaction(news.results[0].user)
                     ? <></>
                     : <>
                            <Grid item xs={2} sx={{position: 'fixed', top: '10px', left: '90%'}}>
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
                <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
                    totalItemsCount={Number(news.count)}
                    prevPageText={'previous'}
                    nextPageText={'next'}
                    hideFirstLastPages={true}
                    itemClass="page-item"
                    linkClass="page-link"
                    onChange={handlePageNumber}
                />
            </>
        )
    }else{
        return(
            <>
                <Box component="div">
                    <Grid container spacing={1}>
                {news.results?.map((post, index) =>(
                    <Grid item xs={9}>
                        <Card sx={{ margin: '2%'}}>
                            <CardContent>
                                <Typography variant="h5" component="div" key={index}>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" component="div">
                                    <Reactions user={user} post={post} disabled={reaction(post.user)} />
                                </Typography>
                                <Typography variant="body2">
                                    {post.text}
                                </Typography>
                                <Typography variant="body2" component="div">
                                    {post.attachments?.map((attach) => (
                                        typeLink(attach, index)
                                    ))}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                    {reaction(news.results[0].user)
                     ? <></>
                     : <>
                            <Grid item xs={2} sx={{position: 'fixed', top: '10px', left: '90%'}}>
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
            </>
        )
    }
}

export default NewsComponent;
