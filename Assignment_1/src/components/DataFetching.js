import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	table: {
		minWidth: 340,
	},
	tableCell: {
		paddingRight: 4,
		paddingLeft: 5,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textAlign: "center",
		fontWeight: "bolder",
	},
	ticks: {
		fontWeight: "bolder",
		color: "#082c6c",
		fontSize: "25px",
		position: "static !important",
		textAlign: "center",
		backgroundColor: "#878683",
	},
	data: {
		fontSize: "20px",
		color: "#082c6c",
		textAlign: "center",
		backgroundColor: "#878683",
		fontWeight: "bolder",
	},
}));

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

export default function DataFetching() {
	const classes = useStyles();
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((res) => {
				setTodos(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
						></IconButton>
						<Typography variant="h6" className={classes.title}>
							Todo List
						</Typography>
					</Toolbar>
				</AppBar>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className={classes.ticks}>UserID</TableCell>
								<TableCell align="right" className={classes.ticks}>
									ID
								</TableCell>
								<TableCell align="right" className={classes.ticks}>
									Title
								</TableCell>
								<TableCell align="right" className={classes.ticks}>
									Status
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{todos.map((todo) => (
								<TableRow key={todo.id}>
									<TableCell
										component="th"
										scope="row"
										className={classes.data}
									>
										{todo.userId}
									</TableCell>
									<TableCell align="right" className={classes.data}>
										{todo.id}
									</TableCell>
									<TableCell align="right" className={classes.data}>
										{todo.title}
									</TableCell>
									<TableCell align="right" className={classes.data}>
										{!todo.completed ? (
											<span>Pending</span>
										) : (
											<span>Completed</span>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</div>
	);
}
