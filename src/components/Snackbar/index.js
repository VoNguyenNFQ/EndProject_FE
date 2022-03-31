import React from 'react'

const Snackbar = ({ open, type, message }) => {

    let typeClass;
    const getType = () => {
        if (type === "success") {
            typeClass = "green"
        }
        if (type === "error") {
            typeClass = "red"
        }
    }
    getType();

    useEffect(() => {
        let timer1 = setTimeout(() => openSnackbarDispatch({ type: 'SET_CLOSE' }), 30000);
        return () => {
            clearTimeout(timer1);
        };
    }, []);

    return (
        <>
            {
                open &&
                <div className={`animate-slide right-5 top-5 bg-green-100 flex border border-green-400 text-green-700 px-4 py-3 rounded fixed`} role="alert">
                    <span className="block sm:inline">{openSnackbar.message}</span>
                    <span onClick={handleClose}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
            }
        </>
    )
}

export default Snackbar