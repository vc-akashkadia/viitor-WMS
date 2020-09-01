import React,{useState} from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
// import Modal from "../../components/modal"

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#f6f6f6',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '0px 26px 0px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        width: '100%',
        height: 28,
        display: 'flex',
        alignItems: 'center',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Roboto',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

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
        padding: 12,
        marginBottom: 15,
        '&:last-child': {
            marginBottom: 0
        }
    },
    chipMain: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: '2px 1px',
        },
    },
    confirmBtn: {
        backgroundColor: '#40d759',
        minWidth: 37,
        height: 26,
        color: '#fff',
        fontSize: 15,
        fontWeight: 500,
        lineHeight: '20px',
        textTransform: 'uppercase'
    },
    rightBoxArrow: {
        backgroundColor: '#2991d6',
        minWidth: 28,
        height: 61,
        padding: 0

    },
    filterSearch: {
        margin: '12px 10px',
        padding: 10
    },
    searchTitle: {
        fontSize: 15,
        color: '#173a64'
    },
    searchInput: {
        width: '100%'
    },
    searchBtn: {
        minWidth: '100%',
        textTransform: 'capitalize',
        padding: 0,
        height: 26
    }
});

export default function YardOperation() {
    const classes = useStyles();
    const [age, setAge] = useState('');
    const [open,setOpen] =useState(false)
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleOpen =()=>{
      setOpen(!open)
    }
    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Box display="flex" alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                        <Box display="flex" alignItems="center">
                            <IconButton aria-label="back" className={classes.backIcon} size="small">
                                <ArrowBackIcon fontSize="" />
                            </IconButton>
                            <Typography className={classes.backText}>Position Update</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" onClick={handleOpen}>
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
          {open &&(
              <Card className={classes.filterSearch}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                        <Typography className={classes.searchTitle}>Search Here</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={age}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                placeholder="Select Yard Crane"
                                style={{ width: '100%' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={age}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                placeholder="Select Yard Crane"
                                style={{ width: '100%' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={age}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                placeholder="Select Yard Crane"
                                style={{ width: '100%' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField className={classes.searchInput} id="outlined-basic" placeholder="Enter No." label="" variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" className={classes.searchBtn}>Search</Button>
                    </Grid>
                </Grid>
            </Card>
            )}
            <div className={classes.yardMain}>
                <Typography className={classes.yardTitle}>Work Order</Typography>
                <Card className={classes.yardCard}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box className={classes.chipMain}>
                            <Chip label="1234" />
                            <Chip label="1234" />
                            <Chip label="ABCD" />
                            <Chip label="Lorem Ipsu.." />
                            <Chip label="40" />
                            <Button className={classes.confirmBtn}>F</Button>
                        </Box>
                        <Box>
                            <Button className={classes.rightBoxArrow}><ArrowDownwardIcon color="secondary" /></Button>
                        </Box>
                    </Box>
                </Card>
                <Card className={classes.yardCard}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box className={classes.chipMain}>
                            <Chip label="1234" />
                            <Chip label="1234" />
                            <Chip label="ABCD" />
                            <Chip label="Lorem Ipsu.." />
                            <Chip label="40" />
                            <Button className={classes.confirmBtn}>F</Button>
                        </Box>
                        <Box>
                            <Button className={classes.rightBoxArrow}><ArrowUpwardIcon color="secondary" /></Button>
                        </Box>
                    </Box>
                </Card>
                <Card className={classes.yardCard}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box className={classes.chipMain}>
                            <Chip label="1234" />
                            <Chip label="1234" />
                            <Chip label="ABCD" />
                            <Chip label="Lorem Ipsu.." />
                            <Chip label="40" />
                            <Button className={classes.confirmBtn}>F</Button>
                        </Box>
                        <Box>
                            <Button className={classes.rightBoxArrow}><ArrowUpwardIcon color="secondary" /></Button>
                        </Box>
                    </Box>
                </Card>
            </div>
            {/* <Modal /> */}
        </>
    );
}