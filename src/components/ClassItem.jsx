import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

export class ClassItem extends React.Component {
  render() {
    const { title } = this.props.classSession;
    return (
      <div>
        <CssBaseline />
        <Paper>
          <Typography component="h2" variant="h6" id="modal-title">
            Edit class
          </Typography>
          <form onSubmit={this.createClassForm}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="title">Class title</InputLabel>
              <Input
                id="title"
                name="title"
                autoComplete="title"
                value={title}
                onChange={this.changeInput}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="datetime-local"
                label="Start time"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="datetime-local"
                label="End time"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
                Save
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

ClassItem.propTypes = {
  classSession: PropTypes.objectOf(PropTypes.any).isRequired,
};
