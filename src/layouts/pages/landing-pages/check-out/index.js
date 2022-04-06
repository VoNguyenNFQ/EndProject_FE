// Practise React React pages
import Layout from "components/Layout";
import CheckOut from "pages/LandingPages/CheckOut";
import { Navigate } from "react-router-dom";
const CheckOutPage = () => {
    if (localStorage.getItem('tokenUser')) {
        return(
            <Layout><CheckOut /></Layout>
        )
    }
    else {
        return <Navigate to="/sign-in" replace />;
    }

}
export default CheckOutPage
