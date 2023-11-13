import Rating from "@mui/material/Rating";

export default function SmallStars({ rating }) {
  return (
    <Rating
      size="small"
      value={rating}
      precision={0.5}
      sx={{
        "& .MuiRating-iconEmpty": {
          color: "#d1d5db",
        },
      }}
      readOnly
    />
  );
}
