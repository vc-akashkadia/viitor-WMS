import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import OperationIcon from './../../@assests/img/dashboard1.svg';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        width: '100%',
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
    mainContainer: {
        margin: '20px 10px'
    },
    mainTitle: {
        paddingLeft: 14
    },
    operationDetails: {
        width: '100%',
        display: 'flex'
    },
    operationBtn: {
        minWidth: 31,
        marginLeft: 5
    },
    operationCard: {
        marginBottom: 10,
        '&:last-child': {
            marginBottom: 0
        }
    }
});

export default function Dashboard() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            <div className={classes.mainContainer}>
                <Card className={classes.operationCard}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Box display="flex" alignItems="center">
                                <img src={OperationIcon} alt="" />
                                <Typography color="primary" className={classes.mainTitle}>Yard Operation</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className={classes.operationDetails}>
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
                                <Button className={classes.operationBtn} variant="contained" color="primary">
                                    Ok
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Card>
                <Card className={classes.operationCard}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Box display="flex" alignItems="center">
                                <img src={OperationIcon} alt="" />
                                <Typography color="primary" className={classes.mainTitle}>Position Update</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className={classes.operationDetails}>
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
                                <Button className={classes.operationBtn} variant="contained" color="primary">
                                    Ok
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Card>
                <Card className={classes.operationCard}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Box display="flex" alignItems="center">
                                <img src={OperationIcon} alt="" />
                                <Typography color="primary" className={classes.mainTitle}>Gate In</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className={classes.operationDetails}>
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
                                <Button className={classes.operationBtn} variant="contained" color="primary">
                                    Ok
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Card>
                <Card className={classes.operationCard}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <Box display="flex" alignItems="center">
                                <img src={OperationIcon} alt="" />
                                <Typography color="primary" className={classes.mainTitle}>Gate Out</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className={classes.operationDetails}>
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
                                <Button className={classes.operationBtn} variant="contained" color="primary">
                                    Ok
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            </div>
        </>
    )
}