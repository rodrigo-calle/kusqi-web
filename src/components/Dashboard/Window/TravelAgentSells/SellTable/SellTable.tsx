import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import touristSellServices from '../../../../../services/touristSells';

import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router'
import { useSelector} from 'react-redux';
import { ReducerState } from '../../../../../features/reducers';
import { TouristSellType } from '../../../../../types';
import './SellTable.scss';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';

interface Data {
  key: string;
  service: string;
  date: Dayjs | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

function createData(
  key: string,
  service: string,
  date: Dayjs | null,
  quantity: number,
  unitPrice: number,
  subtotal: number,
  _id: string,
){
  return {
    key,
    service,
    date,
    quantity,
    unitPrice,
    subtotal,
    _id,
  };
}

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

type Order = 'asc' | 'desc';

  // function getComparator<Key extends keyof any>(
  //   order: Order,
  //   orderBy: Key,
  // ): (
  //   a: { [key in Key]: number | string },
  //   b: { [key in Key]: number | string },
  // ) => number {
  //   return order === 'desc'
  //     ? (a, b) => descendingComparator(a, b, orderBy)
  //     : (a, b) => -descendingComparator(a, b, orderBy);
  // }

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'key',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Servicio',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Fecha',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'N° Personas',
  },
  {
    id: 'unitPrice',
    numeric: true,
    disablePadding: false,
    label: 'Precio Unitario',
  },
  {
    id: 'subtotal',
    numeric: true,
    disablePadding: false,
    label: 'Subtotal',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell 
          padding="checkbox"
          className="table-header"
          >

          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className="table-header"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDelete: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleDelete } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        marginBottom: 2
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <TextField 
              id="search"
              type='search'
              name='search'
              label="Buscar..." 
              variant="outlined" 
              className='search-field'
          />
            <br />
        </>
            
        // <Typography
        //   sx={{ flex: '1 1 100%' }}
        //   variant="h6"
        //   id="tableTitle"
        //   component="div"
        // >
        //   Lista Tours
        // </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => handleDelete()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        null
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
}

const SellTable = () => {
  const navigate = useNavigate()
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sellTours, setSellTours] = React.useState([])
  const user = useSelector((state: ReducerState) => state.user)
  const getTourSells = async () => {
    const response = await touristSellServices.getUserTourSell(user?.id ?? '')
    const data = await response.json();

    if(response.ok) {
      setSellTours(data)
    }
    return [];
  }
 
  React.useEffect(() => {
    getTourSells()
  },[user])
/**
 * 
 * key
service
date
quantity
unitPrice
subtotal

    key,
    service,
    date,
    quantity,
    unitPrice,
    subtotal,
    _id,
 */
  const rows = sellTours.map((sellTour: TouristSellType) => {
    return createData(
      sellTour._id ?? '',
      sellTour.tour,
      sellTour.date,
      sellTour.clientsNumber ?? 0,
      0,
      0,
      sellTour.client,

    )
  }) 

  
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.key);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, key: string) => {
    const selectedIndex = selected.indexOf(key);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const handleDelete = ():void => {
    selected.map((key) => {
      rows.map((row) => {
        if(row.key === key) {
        // touristGuideService.deleteTouristGuide(row._id)
          alert('Por ahora la función eliminar y editar no se encuentran habilitadas, comunicarse con el administrador de "Kusqi" para mayor información')
        }        
      })
    })

    navigate(0)
  } 
  const isSelected = (dni: string) => selected.indexOf(dni) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className='sell-table-container'>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} />
            <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
            >
                <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                />
                <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.sort(getComparator(order, orderBy)).slice() */}
                {
                // stableSort(rows, getComparator(order, orderBy))
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                    const isItemSelected = isSelected(row.key);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.key)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.key}
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                            />
                        </TableCell>
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                        >
                            {row.key.slice(0,5)}
                        </TableCell>
                        <TableCell align="right">{row.service}</TableCell>
                        <TableCell align="right">{row.date?.toString() ?? new Date().getTime().toString()}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.unitPrice}</TableCell>
                        <TableCell align="right">{row.subtotal}</TableCell>
                        </TableRow>
                        
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Compactar Tabla"
        /> */}
    </div>
    
  );
}

export default SellTable;
