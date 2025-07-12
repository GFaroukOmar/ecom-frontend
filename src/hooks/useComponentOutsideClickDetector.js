import {useEffect } from "react";

/**
 * Hook that alerts clicks outside the passed ref
 */
function useComponentOutsideClickDetector(ref,callBack) {
    useEffect(() => {

        // Bind the event listener
        document.addEventListener("click", callBack);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", callBack);
        };
    }, [ref]);
}
export default useComponentOutsideClickDetector