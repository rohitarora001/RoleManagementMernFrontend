import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from '../../next.config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../Layout/Layout'
import makeToast from '../../Toaster';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const AllCategory = () => {
    const router = useRouter()
    const classes = useStyles();
    const [category, setCategory] = useState([])
    const [show, setShow] = useState(false)
    const Getcategory = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/category/`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setCategory(res.data))
            .then(() => setShow(true))
    }
    const checkLoggedin = () => {
        const token = localStorage.getItem("CC_Token")
        if (token === null) {
            return false;
        }
        else {
            return true
        }
    }
    useEffect(() => {

        const goahead = checkLoggedin()
        if (goahead == false) {
            makeToast("error", "You must be logged in")
            router.push('/login')
        }
        else {
            Getcategory()
        }
    }, [])
    return (
        <Layout>
            <div style={{
                height: "auto",
                width: "100%"
            }}>
                <div
                    style={{
                        display: "flex",
                        margin: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <h1>Categories</h1>

                </div>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {
                        show == false ?
                            <div style={{
                                display: "flex",
                                position: "fixed",
                                top: "40%",
                                left: "50%",
                            }}>
                                <CircularProgress disableShrink />
                            </div>
                            :
                            category.length === 0 || category === [] ?
                                <h1>No products found</h1>
                                :
                                category.map((cat, index) => {
                                    return (
                                        <>
                                            <Card className={classes.root}
                                                variant="outlined"
                                                key={cat._id}
                                                style={{
                                                    margin: "7px",
                                                    width: "23vw"
                                                }} >
                                                <CardContent key={category.id}>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        {cat.name}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2">
                                                        {cat.description}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions key={category.id}>
                                                    <Link href={'/category/' + cat._id} key={category._id}>
                                                        <Button size="small"
                                                            variant="outlined"
                                                            color="secondary">
                                                            View Category
                                                        </Button>
                                                    </Link>
                                                    <Link href={'/products/' + cat._id} key={category._id}>
                                                        <Button size="small"
                                                            variant="outlined"
                                                            color="secondary">
                                                            View Products
                                                        </Button>
                                                    </Link>
                                                </CardActions>
                                            </Card>

                                        </>
                                    )
                                })
                    }
                </Grid>
            </div>
        </Layout>
        // <>
        // {
        //     category.map((i)=>{
        //         console.log(i.name)
        //     })
        // }
        // </>
    )
}

export default AllCategory
