import { useState, useEffect } from "react";
import httpClient from "../services/httpClient";
import FeedContainer from "../containers/FeedContainer";
import Pagination from "react-js-pagination";

const CommonFeed = () =>{
    const [news, setNews] = useState({});
    const [page, setPage] = useState(1);
    const [user, setUser] = useState({});

    const handlePageNumber = (pageNumber) => {setPage(pageNumber)};

    useEffect(() =>{
        const getNews = async() =>{
            const newsData = await httpClient.get(`/subscribe/?page=${page.toString()}`);
            setNews(newsData.data);
            const userData = await httpClient.get('/profile/');
            setUser(userData.data);
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
    }else if (Number(news.count <= 5)){
        return(
            <FeedContainer news={news} user={user} />
        )
    }    
}

export default CommonFeed;