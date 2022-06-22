import Directory from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <>
            <Directory />
            <Outlet />
        </>
    )
}

export default Home;
