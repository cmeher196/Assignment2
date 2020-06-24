import React from 'react'
import Box from '@material-ui/core/Box';
import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

setConfiguration({ maxScreenClass: 'xl' });

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
        backgroundColor: 'lightblue',
        padding: '0px'
    },
    pos: {
        marginBottom: 12,
    },
});
export default function MarginAndFluctuation() {
    const classes = useStyles();
    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <Card className={classes.root}>
                        <CardHeader title='High Margin Receipes' style={{ backgroundColor: '#dae4f5' }}>
                        </CardHeader>
                        <CardContent>
                        <Row>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Ambur Biryani
                                </Typography>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress variant="static" value={80} style={{color:'green'}}/>
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
                                    <Typography variant="caption" component="div" color="textSecondary" style={{color:'green'}}>
                                    {`${80}%`}
                                    </Typography>
                                    </Box>
                                </Box>
                    
                            </Col>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Palak Tikka<br/>
                                Masala
                                </Typography>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress variant="static" value={80} style={{color:'green'}}/>
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
                                        <Typography variant="caption" component="div" color="textSecondary" style={{color:'green'}}>
                                        {`${80}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Col>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Palak Paneer 
                                </Typography>
                                
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress variant="static" value={80} style={{color:'green'}} />
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
                                        <Typography variant="caption" component="div" color="textSecondary" style={{color:'green'}}>
                                        {`${80}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Col>  
                        </Row>
                        </CardContent>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className={classes.root}>
                        <CardHeader title='Low Margin Receipes' style={{ backgroundColor: '#dae4f5' }}>
                        </CardHeader>
                        <CardContent>
                        <Row>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Ambur Biryani
                                </Typography>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress variant="static" value={48} style={{color:'red'}} />
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
                                    <Typography variant="caption" component="div" color="textSecondary" style={{color:'red'}}>
                                        {`${48}%`}
                                    </Typography>
                                    </Box>
                                </Box>
                    
                            </Col>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Palak Tikka<br/>
                                Masala
                                </Typography>
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress variant="static" value={25} style={{color:'red'}}/>
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
                                        <Typography variant="caption" component="div" color="textSecondary" style={{color:'red'}}>
                                        {`${25}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Col>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Palak Paneer 
                                </Typography>
                                
                                <Box position="relative" display="inline-flex">
                                    <CircularProgress variant="static" value={15} style={{color:'red'}}/>
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
                                        <Typography variant="caption" component="div" color="textSecondary" style={{color:'red'}}>
                                        {`${15}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Col>  
                        </Row>
                        </CardContent>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card className={classes.root} title='hiiii'>
                        <CardHeader title='Top Fluctuating Receipes' style={{ backgroundColor: '#dae4f5' }}>
                        </CardHeader>
                        <CardContent>
                        <Row>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Ambur Biryani
                                </Typography>
                                <LinearProgress variant="determinate" value={0} style={{backgroundColor:'#dfe2e8',width:'50%',marginLeft:'22px'}}/>
                                <Typography className={classes.pos} color="textSecondary" style={{color:'green'}}>
                                {`${5}%`}<ArrowUpwardIcon fontSize='small'/>
                                </Typography>
                            </Col>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Palak Tikka<br/>
                                Masala
                                </Typography>
                                <LinearProgress variant="determinate" value={0} style={{backgroundColor:'#dfe2e8',width:'50%',marginLeft:'22px'}}/>
                                <Typography className={classes.pos} color="textSecondary" style={{color:'red'}}>
                                {`${3}%`}<ArrowDownwardIcon fontSize='small' />
                                </Typography>
                            </Col>
                            <Col sm={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                Palak Paneer 
                                </Typography>
                                <LinearProgress variant="determinate" value={0} style={{backgroundColor:'#dfe2e8',width:'50%',marginLeft:'22px'}}/>
                                <Typography className={classes.pos} color="textSecondary" style={{color:'red'}}>
                                {`${8}%`}<ArrowDownwardIcon fontSize='small'/>
                                </Typography>
                                
                            </Col>  
                        </Row>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}
