import { useCallback, useEffect, useState } from 'react';

export const useCountdown = (initial = 60) => {
  const [countdown, setCountdown] = useState(0);

  const start = useCallback(() => {
    setCountdown(initial);
  }, [initial]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return { countdown, start };
};
