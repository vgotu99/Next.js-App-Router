import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";

const BookListSkeleton = ({ count }: { count: number }) => {
  return new Array(count)
    .fill(0)
    .map((_, index) => <BookItemSkeleton key={`BookItemSkeleton-${index}`} />);
};

export default BookListSkeleton;
