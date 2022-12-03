import { Box, Drawer, Toolbar, List, ListItemButton, ListItemText, Typography, TextField, AppBar, Button, Paper } from "@mui/material"
import { width } from "@mui/system"
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/Contexts/authContext";
import UserMenu from "./UserMenu";
import BookCard from "./BookCard";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import { getAllBooks } from "../Services/BookServices"
import LateralCard from "./LateralCard";
const MainPage = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        getAllBooks().then(result => {
            setList(result.data.map(e => ({
                id: e._id,
                ...e,

            })));
        })
    }, [])
    const navigate = useNavigate();
    function generateRandomBooks(numberOfBooks) {
        if (!list.length) {
            return [];
        }
        let m = numberOfBooks

        const randomBooks = [];
        while (m) {
            const random = Math.floor(Math.random() * list.length);
            if (!randomBooks.includes(list[random])) {
                randomBooks.push(list[random])
                m--;
            }



        }

        return randomBooks;
    }


    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

        <Box display="flex" gap="20px">
            <Box>
                <TextField sx={{ width: "100%", marginBottom: 2, backgroundColor: "white" }} label="Search" type="search" />
                <Box id="image" >
                    <Box id="imageCover" />
                    <Typography color="white" variant="h3" sx={{ zIndex: 2, position: "relative", padding: "30px", fontWeight: "bold" }}>Reading for life</Typography>


                </Box>
                <Box>
                    <TabContext value={value}>
                        <TabList onChange={handleChange}>
                            <Tab label="Popular" value="1" />
                            <Tab label="Top Writer" value="2" />
                            <Tab label="Business" value="3" />
                            <Tab label="Fiction" value="4" />
                            <Tab label="Science" value="5" />
                        </TabList>
                        <TabPanel value="1">
                            <Box sx={{ flexDirection: "column", display: "flex", width: "100%", height: "100%", justifyContent: "center" }}>

                                <Box sx={{ display: "grid", gap: "2rem 1rem", gridTemplateColumns: " repeat(3, 1fr)" /*"repeat(auto-fill,minmax(240px,1fr 1fr 1fr))"*/, }}>
                                    {list.slice(0, 6).map(book => <BookCard onClick={() => {
                                        navigate(`/BookDetails/${book.id}`)
                                    }} key={book.id} {...book}></BookCard>)}

                                </Box>


                            </Box>
                        </TabPanel>
                        <TabPanel value="2"><Box> Tab 2 </Box></TabPanel>
                        <TabPanel value="3"><Box> Tab 3 </Box></TabPanel>
                        <TabPanel value="4"><Box> Tab 4 </Box></TabPanel>
                        <TabPanel value="5"><Box> Tab 5 </Box></TabPanel>
                    </TabContext>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Paper sx={{ display: "flex", flexDirection: "column", gap: "20px", padding: "15px" }}>
                    <Typography>Books of the Year</Typography>
                    {generateRandomBooks(3).map(randomBooks => <LateralCard onClick={() => {
                        navigate(`/BookDetails/${randomBooks.id}`)
                    }} key={randomBooks.id} {...randomBooks}></LateralCard>)}
                </Paper>
                <Paper sx={{ display: "flex", flexDirection: "column", gap: "20px", padding: "15px" }}>
                <Typography>Reader Choices</Typography>
                    {generateRandomBooks(3).map(randomBooks => <LateralCard onClick={() => {
                        navigate(`/BookDetails/${randomBooks.id}`)
                    }} key={randomBooks.id} {...randomBooks}></LateralCard>)}
                </Paper>

            </Box>
        </Box>
    )
}

export default MainPage