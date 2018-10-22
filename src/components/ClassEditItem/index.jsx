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

export class ClassEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.classSession.title || '',
      startTime: '2018-10-21T22:00',
      endTime: '2018-10-21T22:00'
    };
  }

  changeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  editClassForm = (e) => {
    e.preventDefault();
    const formData = {
      id: this.props.classSession.id,
      newData: {
        title: this.state.title,
        start_time: this.state.startTime,
        endTime: this.state.endTime,
      }
    };
    this.props.onSubmitEditForm(formData);
  }

  render() {
    const { title, startTime, endTime } = this.state;
    return (
      <div>
        <CssBaseline />
        <Paper>
          <Typography component="h2" variant="h6">
            Edit class
          </Typography>
          <form onSubmit={this.editClassForm}>
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
                defaultValue={startTime}
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
                defaultValue={endTime}
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

ClassEditItem.propTypes = {
  classSession: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmitEditForm: PropTypes.func.isRequired
};
