import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
//import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import axios from 'axios';

setConfiguration({ maxScreenClass: 'xl' });

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },

    col: {

        paddingRight: '0px !important',
        paddingLeft: '0px !important'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        backgroundColor: 'lightblue',
        padding: '0px'
    },
    pos: {
        marginBottom: 12,
       // fontSize:'13px',
        textAlign:'center'
    },
});

const cardHeader = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    }
})
export default function MarginAndFluctuation() {
    const classes = useStyles();
    const cardClass = cardHeader();
    const [highMargin, setHighMargin] = useState([]);
    const [lowMargin, setLowMargin] = useState([]);
    const [fluctuation, setFluctuation] = useState([])
    const urlMargin = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/margin-group'
    const urlFluctuation = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/fluctuation-group'
    useEffect(() => {
        axios.get(urlMargin, {
            params: {
                order: 'top'
            }
        })
            .then(res => res.data)
            .then(data => {
                setHighMargin(data.results)
            })
            .catch(err => { throw err })

        axios.get(urlMargin, {
            params: {
                order: 'bottom'
            }
        })
            .then(res => res.data)
            .then(data => {
                setLowMargin(data.results)
            })
            .catch(err => { throw err })

        axios.get(urlFluctuation, {
            params: {
                order: 'top'
            }
        })
            .then(res => res.data)
            .then(data => {
                setFluctuation(data.results)
            })
            .catch(err => { throw err })
    }, [])
    return (
        <Container >
            <Row className={classes.row}>
                <Col sm={4}>
                    <Card className={classes.root}>
                        <CardHeader className={cardClass.root} title={
                            <span gutterBottom variant="h5" component="h2" style={{ fontSize: 'initial' }}>
                                High Margin Recipes
                            </span>
                        } style={{ backgroundColor: '#dae4f5', fontSize: 'initial' }}>

                        </CardHeader>
                        <CardContent>
                            <Row>
                                {
                                    highMargin.length ? (
                                        highMargin.map((data, index) => (
                                            <Col sm={4} key={index}>
                                                <Row style={{fontSize:'13px' }}>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        {data.name}
                                                    </Typography>
                                                </Row>
                                                <Row style={{ paddingLeft: '35px',fontSize:'13px' }}>
                                                    <Box position="relative" display="inline-flex">
                                                        <CircularProgress variant="static" value={data.margin} style={{ color: 'green' }} />
                                                        <Box
                                                            top={0}
                                                            left={0}
                                                            bottom={0}
                                                            right={0}
                                                            position="absolute"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <Typography variant="caption" component="div" color="textSecondary" style={{ color: 'green' }}>
                                                                {`${data.margin}%`}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Row>
                                            </Col>
                                        ))
                                    ) : null
                                }
                            </Row>
                        </CardContent>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className={classes.root}>
                        <CardHeader
                            title={
                                <span gutterBottom variant="h5" component="h2" style={{ fontSize: 'initial' }}>
                                    Low Margin Recipes
                            </span>
                            }
                            style={{ backgroundColor: '#dae4f5' }}>
                        </CardHeader>
                        <CardContent style={{height:'123px'}}>
                            <Row>
                                {
                                    lowMargin.length ? (
                                        lowMargin.map((data, index) => (
                                            <Col sm={4} key={index}>
                                                <Row>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        {data.name}
                                                    </Typography>
                                                </Row>
                                                <Row style={{ paddingLeft: '35px' }}>
                                                    <Box position="relative" display="inline-flex">
                                                        <CircularProgress variant="static" value={data.margin} style={{ color: 'red' }} />
                                                        <Box
                                                            top={0}
                                                            left={0}
                                                            bottom={0}
                                                            right={0}
                                                            position="absolute"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <Typography variant="caption" component="div" color="textSecondary" style={{ color: 'red' }}>
                                                                {`${data.margin}%`}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Row>
                                            </Col>
                                        ))
                                    ) : null
                                }
                            </Row>
                        </CardContent>
                    </Card>
                </Col>

                <Col sm={4}>
                    <Card className={classes.root} title='hiiii'>
                        <CardHeader
                            title={
                                <span gutterBottom variant="h5" component="h2" style={{ fontSize: 'initial' }}>
                                    Top Fluctuating Recipes
                            </span>
                            }
                            style={{ backgroundColor: '#dae4f5', fontSize: 'initial' }}>
                        </CardHeader>
                        <CardContent style={{height:'123px'}}>
                            <Row>
                                {
                                    fluctuation.length ? (
                                        fluctuation.map((data, index) => (
                                            <Col sm={4} key={index}>
                                                <Row>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        {data.name}
                                                    </Typography>
                                                    <LinearProgress variant="determinate" value={0} style={{ backgroundColor: '#dfe2e8', width: '50%', marginLeft: '22px' }} />
                                                </Row>
                                                <Row style={{ paddingLeft: '30px' }}>
                                                    <Typography className={classes.pos} color="textSecondary" style={{ color: 'green' }}>
                                                        {`${data.fluctuation}%`}<ArrowUpwardIcon fontSize='small' />
                                                    </Typography>
                                                </Row>
                                            </Col>

                                        ))
                                    ) : null
                                }

                            </Row>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}
