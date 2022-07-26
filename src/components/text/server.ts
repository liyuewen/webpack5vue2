import { iText } from ".";

export default class IText implements iText {
  text = "121212"

  setText(str: string) {
    this.text = str
  }
}