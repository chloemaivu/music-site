// small component to reroute the user back home 
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeRouter() {
    const navigate = useNavigate()

    useEffect(() => {
        async function wait() {
            setInterval((console.log("waiting"), 2000))
        }
        wait()
        navigate("/home")
    }, [])

    return (
        <>
            <p className="white-text text-5xl text-align-center"> Are you lost?</p>
            <Spinner />
        </>
    )
}

export default HomeRouter
