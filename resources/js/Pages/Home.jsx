import Authenticated from "@/Layouts/AuthenticatedLayout";


const Home = () => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}


Home.layout = page => <Authenticated children={page} header="Home" />

export default Home;
