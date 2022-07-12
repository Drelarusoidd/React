import React, { useEffect, useState } from "react";
import httpClient from "../services/httpClient";
import {useParams} from "react-router-dom";
import "../App.css"
import Pagination from "react-js-pagination";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const NewsComponent = () => {
    const params = useParams()
    const pk = params.pk
    const [news, setNews] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() =>{
        const getNews = async() => {
            await httpClient.get(`/feed/${pk}/?page=${page.toString()}`)
                .then((response) => {
                    setNews(response.data);
            })
        }
        getNews();
    }, [page])

    const handlePageNumber = (pageNumber) => {setPage(pageNumber)}

    if (Number(news.count) > 5){
        return(
            <>
                {news.results?.map((post, index) =>(
                    <Card sx={{ width: '50%', margin: '2%'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2">
                                {post.text}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
                
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
                {news.results?.map((post, index) =>(
                    <Card sx={{ width: '50%', margin: '2%'}}>
                        <CardContent>
                            <Typography variant="h5" component="div" key={index}>
                                {post.title}
                            </Typography>
                            <Typography variant="body2">
                                {post.text}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </>
        )
    }
}

export default NewsComponent;