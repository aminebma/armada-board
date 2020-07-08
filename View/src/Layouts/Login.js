import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.github.com/aminebma/armada-board">
      Armada-Board
      </Link>{' '}
  {new Date().getFullYear()}
  {'.'}
</Typography>
);
}

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#2196f3'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2196f3',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const handleLogin = () => {
  const body = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }
  axios.post('http://localhost:3001/api/accounts/sign-in', body)
      .then(res => {
        alert(`Bienvenu ${res.data.nom} ${res.data.prenom}`);
        localStorage.setItem('jwt', res.data.jwtToken);
        localStorage.setItem('type', res.data.type);
        localStorage.setItem('affectation', res.data.affectation);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('nom', res.data.nom);
        localStorage.setItem('prenom', res.data.prenom);
        localStorage.setItem('dateNaiss', res.data.dateNaiss);
        localStorage.setItem('sexe', res.data.sexe);
        localStorage.setItem('adresse', res.data.adresse);
        localStorage.setItem('mail', res.data.mail);
        localStorage.setItem('numTel', res.data.numTel);
        if(res.data.type===0)
          window.location='/admin'
        else
          window.location='/'
      })
      .catch((error)=>{
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      })
};

export default function Login() {
  const classes = useStyles();
  return (
      <MuiThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      Connectez-vous
      </Typography>
      <form className={classes.form} noValidate>
  <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="username"
  label="Username"
  name="username"
  autoComplete="username"
  autoFocus
  color="secondary"
      />
      <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  name="password"
  label="Mot de passe"
  type="password"
  id="password"
  autoComplete="current-password"
  color="secondary"
      />
      <FormControlLabel
  control={<Checkbox value="remember" color="secondary" />}
  label="Se souvenir de moi"
      />
      <Button
  fullWidth
  variant="contained"
  color="primary"
  style={{background : '#2196f3'}}
  onClick={handleLogin}
      >
      Se connecter
  </Button>
  <Grid container>
  <Grid item xs>
  <Link href="#" variant="body2" style={{color : '#2196f3'}}>
  Mot de passe oublié ?
</Link>
  </Grid>
  </Grid>
  </form>
  </div>
  <Box mt={8}>
      <Copyright />
      </Box>
      </Container>
      </MuiThemeProvider>
);
}