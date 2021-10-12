import { Component } from "react";
import {getMovies} from "./MoviesStock"
// import {Button} from "reactstrap"
import { TablePagination } from "@material-ui/core";
// import ReactTable from "react-table"
import {Button,TableHead,TableRow,Table,TableCell} from '@material-ui/core';
import SortPages from "./SortPages"
import { withStyles } from "@material-ui/styles";


class Movie extends Component{
   state={
        movies:getMovies(),
        getdata : getMovies(),
        rowsPerPage:3,
        page:0,
        
        sort:"ASC",
    }

    render(){
         
       const onClickTitle=()=>{
            if(this.state.sort==="ASC"){
                this.setState({sort:"DSC"})
            }else{
                this.setState({sort:"ASC"})
            }

            movies.sort((a,b)=>{
               const reverseOrder= (this.state.sort==="ASC")?1:-1
                 return reverseOrder * a.title.localeCompare(b.title)
            })
        }
        
       const StyleTableCell = withStyles(()=>{
           return ({ head:{
                color:"white",
                backgroundColor : "black",
                fontWeight:"20px",
                fontSize:"20px"
           }
            })
        })(TableCell)

      const{page,rowsPerPage}=this.state
        const{movies}=this.state
        const{getdata}=this.state
    
    
        const updateMovies=SortPages(movies,page,rowsPerPage)

   const  handleclick=(arg)=>{
        var filtarray=  movies.filter((ar1)=>{
             return ar1._id !== arg._id
             
        })
        this.setState({movies:filtarray})
     }

     const handleevent=(e)=>{
       
        const genre=e.target.value;

        if(genre!=="All"){
         var getarray=getdata.filter((ar2)=>{
             return ar2.genre.name === genre
         }
         )
        }else{
             getarray=getdata.map((ar2)=>{
                return ar2
            })
        }
         console.log(getarray)
         this.setState({movies:getarray})
     }


     const handelPageChange=(event,newpage)=>{
      this.setState({page:newpage})
     }

     const handelRowChange=(event)=>{
         this.setState({rowsPerPage:parseInt(event.target.value)})
     }

        return(
           <div><br /> 
               <select name="select" onChange={handleevent}>
                   <option value="All">All</option>
                   <option value="Comedy" >Comedy</option>
                   <option value="Action">Action</option>
                   <option value="Thriller">Thriller</option>
               </select><br /> 
               {movies.length===0?<h2>no  movie exit</h2>:
                <Table hover>
                    <TableHead>
                         <TableRow>
                                <StyleTableCell>s/n</StyleTableCell>
                                <StyleTableCell onClick={onClickTitle}>Name</StyleTableCell>
                                <StyleTableCell >title</StyleTableCell>
                                <StyleTableCell>dailyRentalRate</StyleTableCell>
                                <StyleTableCell>Delete</StyleTableCell>
                            </TableRow>
                    </TableHead>

                    

                    <tbody>
                        {
                          updateMovies.map((ar,index)=>{
                         return(
                             <>
                            <TableRow key={index}>
                                <TableCell> {index+1}</TableCell>
                                <TableCell>{ar.title}</TableCell>
                                <TableCell>{ar.genre.name}</TableCell>
                                <TableCell>{ar.dailyRentalRate}</TableCell>
                                <TableCell><Button  variant="contained" color="primary" onClick={()=>{handleclick(ar)}}>Delete</Button></TableCell>
                             </TableRow>
                            </>
                                 
                          )})

                           
                        }
                        
                    </tbody>
                </Table>
    }         
               
                                  <TablePagination
                             
                                  rowsPerPageOptions={[3,6,9]}
                                  component="div"
                                  count={movies.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handelPageChange}
                                  onRowsPerPageChange={handelRowChange}
                              
                              />

           </div>
        )
    }
}
export default Movie