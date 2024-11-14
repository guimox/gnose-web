'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

export default function PaginationPage({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const correctPage = currentPage + 1;
  const previousPage = correctPage > 1 ? correctPage - 1 : 1;
  const nextPage = correctPage < totalPages ? correctPage + 1 : totalPages;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (pages.length == 1) return;

  return (
    <Pagination className="py-20">
      <PaginationContent>
        {correctPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={correctPage > 2 ? `?page=${previousPage}` : '/'}
            />
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={page === 1 ? '/' : `?page=${page}`}
              className={
                page === correctPage
                  ? 'rounded-md bg-primary font-bold text-white hover:opacity-50'
                  : ''
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {correctPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`?page=${nextPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
