import { useEffect } from "react";
import Layout from "../components/Layout";
import { useParams} from "react-router-dom";
function Products(){
    const { pr } = useParams();
    return(

        <Layout>
            <h1 className="text-4xl font-bold">{pr.toUpperCase()}</h1>
        </Layout>
    )

}
export default Products;