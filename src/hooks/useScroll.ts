import {useCallback, useEffect, useState} from "react";

export const useScroll = (offset: number, initial?: number): boolean => {
    const [show, setShow] = useState<boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<number>(initial || 0);
    const handlePrevScrollPos: (pos: number) => void = useCallback<(pos: number) => void>((pos: number): void => setPrevScrollPos(pos), []);
    const handleShowHeader: (val: boolean) => void = useCallback<(val: boolean) => void>((val: boolean): void => setShow(val), []);

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollPos: number = window.scrollY;
            const visible: boolean = prevScrollPos > currentScrollPos;
            const isTop: boolean = currentScrollPos > offset;
            if (visible && isTop) {
                handleShowHeader(true);
            } else if (!visible && isTop) {
                handleShowHeader(false);
            }
            handlePrevScrollPos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);
        return (): void => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, handleShowHeader, handlePrevScrollPos, show, offset])

    return show
}