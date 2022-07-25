const convertDate = (date) => {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = date.toLocaleDateString('ko-KR', options);
    const tmp = dateString.split('.', 3);
    return tmp
}

export default convertDate;
