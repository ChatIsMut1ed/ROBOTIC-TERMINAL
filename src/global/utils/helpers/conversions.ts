// Helper function to convert bytes to GB safely
export const bytesToGB = (bytes?: number): string => {
  if (bytes === undefined) return "N/A";
  return (bytes / 1_073_741_824).toFixed(2) + " GB";
};
