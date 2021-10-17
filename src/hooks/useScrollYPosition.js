import { useState, useEffect, useRef } from "react";

const useScrollYPosition = () => {
	
	const [prevScrollY, setPrevScrollY] = useState([0])

	const windowRef = useRef(null)
	const documentRef = useRef(null)

	useEffect(() => {

		const thresholdPixels = 120 // 距離上次scroll的位置，至少要大於120px，才更新
    let isLock = false


		function handleScroll() {
			if (Math.abs(windowRef.current.pageYOffset - prevScrollY) < thresholdPixels) {
        // 若沒有超過【上次scroll的距離】，就不要繼續
        isLock = false
        return
      }

			setPrevScrollY(window.pageYOffset) // 儲存Y的位置

			isLock = false
		}

		function onScroll() {
			// 正在scroll
			if (!isLock) {
        windowRef.current.requestAnimationFrame(handleScroll)
        isLock = true
      }
		}

		if (window && document) {
			windowRef.current = window;
			documentRef.current = document;
			documentRef.current.addEventListener('scroll', onScroll);
		}
		return () => {
			documentRef.current.removeEventListener('scroll', onScroll);
		}
  }, []);

	return prevScrollY
}

export default useScrollYPosition