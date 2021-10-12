

const SortPages=(movies,page,rowsPerPage)=>{
    const sortData= movies.slice(page,rowsPerPage)
    return sortData
}
export default SortPages