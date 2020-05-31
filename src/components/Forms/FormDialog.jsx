import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextInput";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    };

    this.InputName = this.InputName.bind(this);
    this.InputEmail = this.InputEmail.bind(this);
    this.InputDescription = this.InputDescription.bind(this);
  }

  InputName = (event) => {
    this.setState({ name: event.target.value });
  };

  InputEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  InputDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "") {
        isBlank = true;
      }
      return isBlank;
    }
  };

  submitFrom = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

    const isBlank = this.validateRequiredInput(name, email, description);
    const isValidEmail = this.validateEmailFormat(email);

    if (isBlank) {
      alert("必須入力欄が空白です。");
      return false;
    } else if (!isValidEmail) {
      alert("メールアドレスの書式が異なります。");
      return false;
    } else {
      const payload = {
        text:
          "お問い合わせがありました\n" +
          "お名前: " +
          name +
          "\n" +
          "メールアドレス: " +
          email +
          "\n" +
          "【問い合わせ内容】\n" +
          description,
      };

      const url =
        "https://hooks.slack.com/services/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";

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).then(() => {
        alert("送信が完了しました。追ってご連絡します！");
        this.setState({
          name: "",
          email: "",
          description: "",
        });
        return this.props.handleClose();
      });
    }
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前必須(必須)"}
            multiline={false}
            rows={1}
            value={this.state.name}
            type={"text"}
            onChange={this.InputName}
          />
          <TextInput
            label={"メールアドレス(必須)"}
            multiline={false}
            rows={1}
            value={this.state.email}
            type={"text"}
            onChange={this.InputEmail}
          />
          <TextInput
            label={"お問い合わせ(必須)"}
            multiline={true}
            rows={5}
            value={this.state.description}
            type={"text"}
            onChange={this.InputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitFrom} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
