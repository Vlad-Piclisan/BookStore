import { Button, Box, Typography, Paper, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import axios from 'axios';
import { baseURL, headers } from "../Services/Configs";
import { ReactComponent as Edit } from "../Images/edit.svg"
import { ReactComponent as Trash } from "../Images/trash-2.svg"
import { deleteBook } from "../Services/BookServices";

import {getAllBooks} from "../Services/BookServices"
import {useNavigate} from "react-router-dom"

const BookList = () => {
    const navigate = useNavigate();
    
    const [list, setList] = useState([])

    async function fetchSetBooks(){
        try{
            const result = await getAllBooks();
            setList(result.data.map(e => ({
                id: e._id,
                ...e,
            })));
        }catch(e){

        }
    }
    useEffect(() => {
        fetchSetBooks();
    }, [])

    const [value, setValue] = useState("1");
    const [open, setOpen] = useState(false)
    const [selectedBook,setSelectedBook]=useState();
    const handleOpen = () => {
        setOpen(true)
        
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleDeleteBook=()=>{
        deleteBook(selectedBook.id).then(() => {
            fetchSetBooks().then(handleClose);
        }).catch(e => alert(e));
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const rows /*: GridRowsProp */ = list;

    const columns/*: GridColDef[]*/ = [
        {
            field: 'coverImage', headerName: 'Book Title', width: 250, renderCell: (elem) => {
                return <div>
                    {elem.row.coverImage ? <img width={100} src={`${baseURL}/picture/${elem.row.coverImage}`} alt={elem.row.title} /> : "No image ..."}
                    {/* {elem.row.coverImage} */}
                    {console.log(elem)}
                </div>
            }
        },
        { field: 'title', headerName: 'Book Title', width: 150 },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'col4', headerName: 'Group', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'col6', headerName: 'Discount', width: 150 },
        { field: 'col7', headerName: 'Quantity', width: 150 },
        {
            field: 'action', headerName: 'Action', sortable: false,

            renderCell: (params) => {
                console.log(params);
                function confirmDelete(e) {
                    e.stopPropagation();
                    const confirmation = window.confirm(`Are you sure you want to delete ${params.row.title}?`)
                    if (confirmation) {
                        alert("Deleted")
                    } else {
                        alert("Not deleted")
                    }
                }

                return <>
                    <IconButton title="Edit" onClick={() => {
                        navigate(`/Form/${params.row.id}`)
                    }} >
                        <Edit  />
                    </IconButton>

                    <IconButton title="Delete" onClick={()=>{
                        handleOpen();
                        setSelectedBook(params.row)
                    }}>
                        <Trash />
                    </IconButton>



                </>

            }
        },
    ];


    return (
        <Box sx={{ width: "100%", height: "100%" }}>

            <Dialog onClose={handleClose} open={open}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <DialogTitle>Delete Book</DialogTitle>
                    <Trash style={{ height: "50px", width: "50px" }} />
                    <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography>{`Are you sure you want to delete this book?`}</Typography>
                        <Typography >{selectedBook?.title}</Typography>
                        <Typography>{`by ${selectedBook?.author}`}</Typography>
                    </DialogContent>

                </Box>
                <DialogActions>

                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleDeleteBook} variant="contained">Yes</Button>
                </DialogActions>
            </Dialog>

            <Box>
                <TabContext value={value}>
                    <TabList onChange={handleChange}>
                        <Tab label="All Books" value="1" />
                        <Tab label="Top Writer" value="2" />
                        <Tab label="Popular" value="3" />
                        <Tab label="Recomendation" value="4" />
                    </TabList>
                    <TabPanel value="1">
                        <Box sx={{ display: "flex", width: "100%", height: "100%", justifyContent: "center" }}>
                            <Paper sx={{ width: "85%", height: "100%" }} >
                                <Box sx={{ display: "flex", justifyContent: "space-between", margin: "30px" }}>
                                    <TextField sx={{ width: "30%", marginBottom: 2 }} label="Search" type="search" />
                                    <Link to="/Form" style={{ textDecoration: "none", color: "inherit" }}>
                                        <Button variant="contained">+ Add New Book</Button>
                                    </Link>
                                </Box>
                                <div style={{ height: 500, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns}  getRowHeight={() => 'auto'} />
                                </div>

                            </Paper>
                        </Box>
                    </TabPanel>
                    <TabPanel value="2"><Box> Tab 2 </Box></TabPanel>
                    <TabPanel value="3"><Box> Tab 3 </Box></TabPanel>
                    <TabPanel value="4"><Box> Tab 4 </Box></TabPanel>
                </TabContext>
            </Box>


        </Box>

    )
}

export default BookList;