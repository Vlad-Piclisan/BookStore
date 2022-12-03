import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from "@mui/material";
const BackArrow = () => {
    const navigate = useNavigate();

    return (
        <IconButton size="small" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon/>
        </IconButton>
    )

}

export default BackArrow;