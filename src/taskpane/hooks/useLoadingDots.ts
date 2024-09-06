import * as React from "react";

export const useLoadingDots = (isLoading: boolean) => {
  const [loadingDots, setLoadingDots] = React.useState(".");

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === "....") return ".";
          return prev + ".";
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return loadingDots;
};