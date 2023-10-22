import Rating from "@mui/material/Rating";

export default function SmallStars({ rating, index }) {
  return (
    <Rating
      value={rating}
      precision={0.5}
      sx={{
        "& .MuiRating-iconEmpty": {
          color: index % 2 == 0 ? "#282932" : "#111214",
        },
      }}
      readOnly
    />
  );
}
