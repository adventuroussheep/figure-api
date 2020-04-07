import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DAA520'
    } ,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
  typography:{
    fontFamily: [
      'Cardo',
    ]
  }
});

export default theme;