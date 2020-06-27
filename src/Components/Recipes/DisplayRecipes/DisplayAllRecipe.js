import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios';
import moment from 'moment';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "NAME" },
  { id: "lastUpdated", numeric: true, disablePadding: false, label: "LAST UPDATED" },
  { id: "cogs", numeric: true, disablePadding: false, label: "COGS%" },
  { id: "costprice", numeric: true, disablePadding: false, label: "COST PRICE()" },
  { id: "saleprice", numeric: true, disablePadding: false, label: "SALE PRICE" },
  { id: "grossmargin", numeric: true, disablePadding: false, label: "GROSS MARGIN" },
  { id: "tags_action", numeric: false, disablePadding: false, label: "TAGS/ACTIONS" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.label==='NAME' ? "left" : "center"}
           // align={"center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <div style={{padding:'initial'}}> 
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (null
          // <Typography
          //   className={classes.title}
          //   variant="h6"
          //   id="tableTitle"
          //   component="div"
          // >
          //   Nutrition
          // </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (null
          // <Tooltip title="Filter list">
          //   <IconButton aria-label="filter list">
          //     <FilterListIcon />
          //   </IconButton>
          // </Tooltip>
        )}
    </Toolbar>
    </div>
  );

};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding:'initial !important'
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
   // padding:'inherit'
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  tablerow:{
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }
  
}));

export default function DisplayAllRecipe() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("lastUpdated");
  const [selected, setSelected] = React.useState([]);

  const url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes';
  const [recipe, setRecipe] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)


  useEffect(() => {
    axios.get(url, {
      params: {
        page: pageNumber,
        is_incorrect: false,
        is_untagged:false,
        id_disabled:false
      }
    }).then(res => res.data)
      .then(data => {
        setRecipe(prevRecipe => {
          return [...new Set([...prevRecipe, ...data.results])]
        })
        setHasMore(data.results.length > 0)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [pageNumber])

  const observer = useRef()
  const lastRecipeElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading, hasMore])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = recipe.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer >
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={recipe.length}
            />
            <TableBody >
              {stableSort(recipe, getComparator(order, orderBy)).map(
                (data, index) => {
                  const isItemSelected = isSelected(data.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  if (recipe.length === index + 1) {
                    return (
                      
                      <TableRow
                        ref={lastRecipeElementRef}
                        hover
                        onClick={event => handleClick(event, data.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={data.id}
                        selected={isItemSelected}
                        className={classes.tablerow}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {data.name}
                        </TableCell>
                        <TableCell align="center">{moment(data.last_updated.date).format('ll')}</TableCell>
                        <TableCell align="center">{`${data.cogs}%`}</TableCell>
                        <TableCell align="center">{data.cost_price.toFixed(2)}</TableCell>
                        <TableCell align="center">{data.sale_price.toFixed(2)}</TableCell>
                        {data.gross_margin < 0 ?
                          <TableCell align="center" style={{ color: 'red' }}>{
                            (data.gross_margin.toFixed(2))}%</TableCell>
                          :
                          <TableCell align="center">{
                            (data.gross_margin.toFixed(2))}%</TableCell>
                        }
                          <TableCell align="center"><mark style={{borderRadius:"25px"}}>{`Indian Ma...`}</mark></TableCell>
                      </TableRow>
                    );
                  }
                  else {
                    return (

                      <TableRow
                        className={classes.tablerow}
                        hover
                        onClick={event => handleClick(event, data.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={data.id}
                        selected={isItemSelected}
                        
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {data.name}
                        </TableCell>
                        <TableCell align="center">{moment(data.last_updated.date).format('ll')}</TableCell>
                        <TableCell align="center">{`${data.cogs}%`}</TableCell>
                        <TableCell align="center">{data.cost_price.toFixed(2)}</TableCell>
                        <TableCell align="center">{data.sale_price.toFixed(2)}</TableCell>
                        {data.gross_margin < 0 ?
                          <TableCell align="center" style={{ color: 'red' }}>{
                            (data.gross_margin.toFixed(2))}%</TableCell>
                          :
                          <TableCell align="center">{
                            (data.gross_margin.toFixed(2))}%</TableCell>
                        }
                          <TableCell align="center"><mark style={{borderRadius:"25px"}}>{`Indian Ma...`}</mark></TableCell>
                      </TableRow>
                    )
                  }
                }
              )}<div>{loading && 'Loading...'}</div>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
