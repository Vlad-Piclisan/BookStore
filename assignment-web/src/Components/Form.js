import { Box, Button, Typography, Divider, TextField, InputLabel, Select, MenuItem, FormControl, Grid, FormControlLabel, Checkbox, FormGroup, OutlinedInput, InputAdornment, Card, CardMedia } from "@mui/material"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useForm, Controller } from "react-hook-form";
import { createBook, getBookById, updateBook } from "../Services/BookServices"
import { baseURL } from "../Services/Configs"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react"

const Form = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { control, handleSubmit, register, watch, reset } = useForm({
        defaultValues: {
            title: "",
            description: "",
            author: "",
            price: "",
        }
    });

    useEffect(() => {
        if (id) {
            getBookById(id)
                .then(async (r) => {
                    const book = r.data;
                    // const data = await fetch(`${baseURL}/picture/${book.coverImage}`)
                    // const blob = await data.blob();
                    reset({
                        title: book.title,
                        description: book.description,
                        author: book.author,
                        price: book.price,
                        file: book.coverImage
                    })
                }).catch(e => {
                    navigate("404");
                })
            
        }
        return;
    }, [id])

    const onSubmit = async data => {
        try {
            const formData = new FormData();
            if(data.file instanceof FileList){
                formData.append("file", data.file[0]);
            }else if(typeof data.file === "string") {
                    const r = await fetch(`${baseURL}/picture/${data.file}`)
                    const blob = await r.blob();
                    const file = new File([blob], data.file);
                    formData.append("file", file);
            }
            // formData.append("title",data.title)
            for (const key in data) {
                formData.append(key, data[key])
            }

            if (id) {
                const result = await updateBook(formData, id);
                console.log(result);
            } else {
                const result = await createBook(formData)
            }
            navigate("/BookList")
        }
        catch (error) { alert(error) }
    };
    // try{
    //     const result = await createBook(data) dupa ai status de creere 
    // }catch()

    const selectedImage = watch('file');

    console.log({ selectedImage })

    function renderCardImage() {
        if (selectedImage) {
            let currentImageSource;
            if (selectedImage instanceof FileList && selectedImage.length) {
                currentImageSource = URL.createObjectURL(selectedImage[0])
            }
            else if (typeof selectedImage === "string") {
                currentImageSource = `${baseURL}/picture/${selectedImage}`
            }
            if (currentImageSource) {
                return <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={currentImageSource}
                />
            }
        }
    }

    return (

        <Box sx={{ display: "flex", gap: 5, margin: 2 }}>
            <Box>
                <Card>
                    {renderCardImage()}
                </Card>

                <Button variant="contained" component="label">
                    Select Image
                    <input hidden accept="image/*" multiple type="file" {...register("file")} />
                </Button>
            </Box>
            <Box sx={{ width: "100%" }}>


                <Box >
                    <Typography  > Book Details</Typography>
                    <Divider sx={{ margin: "10px 0px" }} />
                    <Grid container spacing={2} columnSpacing={25} >
                        <Grid item xs={6} >

                            <Typography > Book Title</Typography>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => <TextField {...field} label="Enter" variant="outlined" fullWidth />}
                            />




                            <Typography> Author</Typography>


                            <Controller
                                name="author"
                                control={control}
                                render={({ field }) => <TextField {...field} label="Enter" variant="outlined" fullWidth />}
                            />


                            <Typography >Group</Typography>
                            <Box sx={{ display: 'flex' }}>
                                <FormControl sx={{ m: "3px 10px" }} component="fieldset" variant="standard">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="popular" />
                                            }
                                            label="Popular"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="topWriter" />
                                            }
                                            label="Top Writer"
                                        />

                                    </FormGroup>

                                </FormControl>
                                <FormControl
                                    component="fieldset"
                                    sx={{ m: "3px 10px" }}
                                    variant="standard"
                                >
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="recommendation" />
                                            }
                                            label="Recommendation"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox name="bestSeller" />
                                            }
                                            label="Best Seller"
                                        />

                                    </FormGroup>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={6}>

                            <Typography>Category</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="Select">Select</InputLabel>
                                <Select
                                    labelId="Select"
                                    label="Select"
                                >
                                    <MenuItem value={10}>History</MenuItem>
                                    <MenuItem value={20}>Science Fiction</MenuItem>
                                    <MenuItem value={30}>Non-Fiction</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography>Description</Typography>

                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => <TextField
                                    {...field}
                                    label="Enter"
                                    multiline
                                    rows={5}
                                    sx={{ width: "100%" }}
                                />}
                            />



                        </Grid>
                    </Grid>

                    <Typography> Additional Info</Typography>
                    <Divider sx={{ margin: "10px 0px" }} />
                    <Grid container spacing={2} columnSpacing={25} >
                        <Grid item xs={6} >
                            <Typography > Publisher</Typography>
                            <TextField label="Enter" variant="outlined" fullWidth />
                            <Typography>About Author</Typography>
                            <TextField
                                label="Enter"
                                multiline
                                rows={5}
                                sx={{ width: "100%" }}
                            />
                            <Typography>Publication Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>

                                <DesktopDatePicker
                                    inputFormat="MM/DD/YYYY"
                                    // value={value}
                                    onChange={() => { }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                        </Grid>

                        <Grid item xs={6} >
                            <Typography>Pages</Typography>
                            <FormControl variant="outlined">
                                <OutlinedInput

                                    // value={}
                                    // onChange={handleChange('weight')}
                                    endAdornment={<InputAdornment position="end">pg</InputAdornment>}
                                // aria-describedby="outlined-weight-helper-text"
                                // inputProps={{
                                //     'aria-label': 'weight',
                                // }}
                                />
                            </FormControl>
                            <Typography>Grades</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="Select">Select</InputLabel>
                                <Select
                                    labelId="Select"
                                    label="Select"
                                >
                                    <MenuItem value={10}>History</MenuItem>
                                    <MenuItem value={20}>Science Fiction</MenuItem>
                                    <MenuItem value={30}>Non-Fiction</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography>Lexile Level</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="Select">Select</InputLabel>
                                <Select
                                    labelId="Select"
                                    label="Select"
                                >
                                    <MenuItem value={10}>History</MenuItem>
                                    <MenuItem value={20}>Science Fiction</MenuItem>
                                    <MenuItem value={30}>Non-Fiction</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography > Publisher</Typography>
                            <TextField label="Enter" variant="outlined" fullWidth />

                        </Grid>
                    </Grid>
                    <Typography> Price & Discount</Typography>
                    <Divider sx={{ margin: "10px 0px" }} />
                    <Box sx={{ display: "flex", gap: 10 }}>
                        <Box>
                            <Typography>Price</Typography>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => <FormControl variant="outlined">
                                    <OutlinedInput
                                        {...field} endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    />
                                </FormControl>}
                            />
                            {/* <FormControl variant="outlined">
                                <OutlinedInput
                                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                />
                            </FormControl> */}
                        </Box>
                        <Box>
                            <Typography>Discount</Typography>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>{id? "Update book" :"Add Book"}</Button>
                </Box>
            </Box>
        </Box>

    )
}

export default Form;