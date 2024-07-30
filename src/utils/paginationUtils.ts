interface Pagination<T> {
  limit: T;
  page: T;
}

interface PaginationReturn {
  limit: number;
  skip: number;
}

export const getPaginationOptions = ({
  limit = 20,
  page = 1,
}: Pagination<any>): PaginationReturn => {
  if (Number(limit) > 30) {
    limit = 30;
  }
  const newLimit = Number(limit);
  const skip = (Number(page) - 1) * Number(limit);

  return {
    limit: newLimit,
    skip,
  };
};
