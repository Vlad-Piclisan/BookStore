import { Card, CardMedia, Typography, CardActions, CardContent } from "@mui/material";
import { baseURL, headers } from "../Services/Configs";
import { CardProps } from "@mui/material"
/**
 * @param {CardProps} props Book card props
 */
export default function BookCard({

  imgProps = {},
  coverImage,
  ...props
}) {
  return (
    <Card {...props} sx={{

      display: "flex", height: "130px", overflow: "unset",
      cursor: "pointer",
      ...(props.sx ?? {})
    }}>
      <img {...imgProps}
        style={{
          width: 100, height: 130, transform: "translate(10px, -15px)",
          ...(imgProps.style ?? {})
        }}
        src={`${baseURL}/picture/${coverImage}`}
        alt={`${props.title} by ${props.author}`}
      />
      <CardContent sx={{}}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.author}
        </Typography>
      </CardContent>
      {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
}
