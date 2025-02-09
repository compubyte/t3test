export const LoadingSpinner = () => {
  return (
    <div className="flex h-32 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-b-violet-700"></div>
    </div>
  );
};

export const LoadingSpinnerMini = () => {
  return (
    <div className="flex h-24 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-b-4 border-b-violet-600"></div>
    </div>
  );
};
