import React, { useEffect, useState } from "react";
import httpClient from "../services/httpClient";
import {useParams} from "react-router-dom";
import "../App.css"
import "../player.js";
import Pagination from "react-js-pagination";
import FeedContainer from "../containers/FeedContainer";

const NewsComponent = () => {
    const params = useParams();
    const pk = params.pk;
    const [news, setNews] = useState({});
    const [page, setPage] = useState(1);
    const [user, setUser] = useState({});

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

    if (Number(news.count) > 5){
        return(
            <>
            <FeedContainer news={news} user={user} />
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
            <FeedContainer news={news} user={user} />
        )
    }
}

export default NewsComponent;
