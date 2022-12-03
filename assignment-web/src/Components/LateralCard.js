import { Box, Typography } from "@mui/material";
import { baseURL, headers } from "../Services/Configs";
import { BoxProps } from "@mui/material"
/**
 * @param {BoxProps} props Book card props
 */
export default function LateralCard(props) {
    return (
        <Box {...props} sx={{ display: "flex", gap: "10px", margin:0,padding:0, cursor: "pointer"}} >
            <img style={{
                width: 60, height: 90,
            }}
                src={`${baseURL}/picture/${props.coverImage}`}
                alt={`${props.title} by ${props.author}`} />

            <Box sx={{display:"flex",flexDirection:"column",rowGap:"20px"}}>
                <Typography sx={{fontSize:"1.5rem"}}>
                    {props.title}
                </Typography>
                <Typography >
                    {props.author}
                </Typography>
            </Box>
        </Box>
    )
} 