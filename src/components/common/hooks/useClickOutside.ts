import { useEffect, RefObject } from "react";

function useClickOutside(
  refs: RefObject<HTMLElement>[],
  callback: () => void,
  isEnabled: boolean
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.some(ref => ref.current && ref.current.contains(event.target as Node))) {
        return;
      }
      callback();
    };

    if (isEnabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEnabled, refs, callback]);
}

export default useClickOutside;
