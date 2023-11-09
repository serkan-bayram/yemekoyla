export default function AddComment({
  setShowPopup,
  setIsEditComment,
  comment,
  userRating,
}) {
  const handleEditComment = () => {
    setShowPopup(true);
    setIsEditComment(true);
  };

  return comment || userRating ? (
    <div className="w-1/2 md:w-1/3 mx-auto min-w-[250px] my-2 mt-6">
      <button
        onClick={handleEditComment}
        className="bg-accent p-1 px-2 font-body text-sm rounded-sm"
        type="button"
      >
        {comment.length > 0 ? "Yorumunu Düzenle" : "Yorum Ekle"}
      </button>
    </div>
  ) : (
    <div className="my-2 mt-6"></div>
  );
}
