import { Spinner } from "flowbite-react";

function LoadingSpinner() {
    return (
        <div className="text-center">
            <Spinner
                aria-label="Center-aligned spinner example"
                color="success"
                size="xl" />
        </div>
    )
}

export default LoadingSpinner;