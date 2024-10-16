class StringCalculator {
  #inputStr;
  #separators;

  constructor(inputStr) {
    this.#inputStr = inputStr;
    this.#separators = new Set([",", ":"]);
    this.#addCustomSeparator();
  }

  #addCustomSeparator() {
    const customSeparatorMatch = this.#inputStr.match(/\/{2}\D\\n/);

    if (!customSeparatorMatch || customSeparatorMatch.index !== 0) {
      return;
    }

    this.#separators.add(customSeparatorMatch[0][2]);
    this.#inputStr = this.#inputStr.slice(customSeparatorMatch[0].length);
  }

  calculateSum() {
    let separatorPattern = [...this.#separators].join("|");
    const numArr = this.#inputStr.split(new RegExp(separatorPattern));

    let sum = 0;
    numArr.forEach((num) => {
      const parsedNumber = Number(num);

      if (Number.isNaN(parsedNumber) || parsedNumber < 0) {
        throw new Error("[ERROR] 문자열의 형식이 틀렸습니다.");
      }

      sum += parsedNumber;
    });

    return sum;
  }
}

export default StringCalculator;