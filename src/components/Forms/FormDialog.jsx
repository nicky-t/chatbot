import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextInput";

const FormDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const InputName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const InputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const InputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "") {
        isBlank = true;
      }
      return isBlank;
    }
  };

  const submitFrom = () => {
    const isBlank = validateRequiredInput(name, email, description);
    const isValidEmail = validateEmailFormat(email);

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
        alert("送信が完了しました。追ってご連絡いたします！");
        setName("");
        setEmail("");
        setDescription("");

        return props.handleClose();
      });
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={"お名前必須(必須)"}
          multiline={false}
          rows={1}
          value={name}
          type={"text"}
          onChange={InputName}
        />
        <TextInput
          label={"メールアドレス(必須)"}
          multiline={false}
          rows={1}
          value={email}
          type={"text"}
          onChange={InputEmail}
        />
        <TextInput
          label={"お問い合わせ(必須)"}
          multiline={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={InputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitFrom} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
