import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
const useStyles = makeStyles({
    backIcon: {
        color: '#173a64'
    },
    backText: {
        color: '#173a64',
        fontSize: 15
    },
    yardTitle: {
        margin: '12px 10px',
        fontSize: 15,
        color: '#173a64'
    },
    yardCard: {
        padding: 12
    },
    chipMain: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: '0 2px',
        },
    }
});

export default function YardOperation() {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Box display="flex" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                        <Box display="flex" alignItems="center">
                            <IconButton aria-label="back" className={classes.backIcon} size="small">
                                <ArrowBackIcon fontSize="" />
                            </IconButton>
                            <Typography className={classes.backText}>Yard Operation</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <IconButton aria-label="back" className={classes.backIcon} size="small" style={{ paddingRight: 10 }}>
                                <SearchIcon fontSize="" />
                            </IconButton>
                            <IconButton aria-label="back" className={classes.backIcon} size="small">
                                <FilterListIcon fontSize="" />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className={classes.yardMain}>
                <Typography className={classes.yardTitle}>Work Order</Typography>
                <Card className={classes.yardCard}>
                    <Box className={classes.chipMain}>
                        <Chip label="1234" />
                        <Chip label="1234" />
                        <Chip label="1234" />
                    </Box>
                </Card>
            </div>
        </>
    );
}