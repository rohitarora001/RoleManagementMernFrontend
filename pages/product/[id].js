import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import { CircularProgress } from '@material-ui/core';

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState([])
    const [show, setShow] = useState(true)
    const checkLoggedin = () => {
        const token = localStorage.getItem("CC_Token")
        if (token === null) {
            return false;
        }
        else {
            return true
        }
    }

    async function GetProduct() {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/products/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setProduct(res.data.data.data[0]))
            .then(() => setShow(false))

    }
    useEffect(() => {
        const goahead = checkLoggedin()
        if (goahead == false) {
            makeToast("error", "You must be logged in")
            router.push('/login')
        }
        else {
            GetProduct()
        }

    }, [])

    return (
        <>
            {
                show == true ?
                    <div style={{
                        display: "flex",
                        position: "fixed",
                        top: "40%",
                        left: "50%",
                    }}>
                        < CircularProgress disableShrink />
                    </div>
                    :
                    < div >
                        <h1>
                            {product.name}
                        </h1>
                        <Typography color="textSecondary" gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {product.price}
                        </Typography>
                    </div >

            }
        </>
    )
}

export default ProductDetails
