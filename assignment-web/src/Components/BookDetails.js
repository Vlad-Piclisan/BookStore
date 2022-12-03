import { Box, Button, Divider, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../Services/BookServices";
import { baseURL } from "../Services/Configs";
export default function (props) {

    const { id } = useParams();
    const [book, setBook] = useState(null)
    useEffect(() => {
        if (id) {
            getBookById(id)
                .then(async (r) => {
                    const book = r.data;
                    console.log(book)

                    setBook(book);

                }).catch(e => {
                    // navigate("404");
                })

        }
        return;
    }, [id])
    if(!book){
        return null;
    }
    return (
        <Box sx={{ display: "flex", columnGap: "100px", margin: "20px" }}>
            <Box >
                <img style={{ height: "400px", width: "250px", }}
                   src={`${baseURL}/picture/${book.coverImage}`}
                    alt="da" />

            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: '10px' }}>
                <Typography sx={{ fontWeight: 'medium', fontSize: "2.5rem" }} >
                    {book.title}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }} >
                    by <span style={{ color: "#31c9cc" }}>{book.author}</span>
                </Typography>
                <Typography>
                    {book.description}

                </Typography>
                <Divider sx={{ margin: " 20px 0" }} />
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: '10px' }}>
                    <Typography>
                        {`Publisher:`}
                    </Typography>
                    <Typography>
                        Publication Date
                    </Typography>
                    <Typography>
                        Pages
                    </Typography>
                    <Typography>
                        Dimension
                    </Typography>
                    <Typography>
                        Grades
                    </Typography>
                    <Typography>
                        Lexile Level
                    </Typography>
                    <Typography>
                        Award
                    </Typography>
                    <Typography>
                        About Author
                    </Typography>

                </Box>
                <Divider sx={{ margin: " 20px 0" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography>
                            Price
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {book.price}$
                        </Typography>
                    </Box>
                    <Button variant="contained" sx={{ color: "white", fontWeight: "bold", height: "50px" }}>Add to cart</Button>
                </Box>
            </Box>
        </Box>
    )

}