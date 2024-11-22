import React from "react";

const DefaultButtonsData = [
  {
    id: "percentage",
    value: "%",
    group: "math-functions"
  },
  {
    id: "clear",
    value: "clear",
    group: "user-input-processing"
  },
  {
    id: "divide",
    value: "\u{00F7}",
    group: "math-operators",
    mathOperat: "/"
  },
  {
    id: "multiply",
    value: "\u{00D7}",
    group: "math-operators",
    mathOperat: "*"
  },
  {
    id: "add",
    value: "+",
    group: "math-operators",
    mathOperat: "+"
  },
  {
    id: "subtract",
    value: "-",
    group: "math-operators",
    mathOperat: "-"
  },
  {
    id: "decimal",
    value: ".",
    group: "user-input-processing"
  },
  {
    id: "zero",
    value: "0",
    group: "user-input-nums"
  },
  {
    id: "one",
    value: "1",
    group: "user-input-nums"
  },
  {
    id: "two",
    value: "2",
    group: "user-input-nums"
  },
  {
    id: "three",
    value: "3",
    group: "user-input-nums"
  },
  {
    id: "four",
    value: "4",
    group: "user-input-nums"
  },
  {
    id: "five",
    value: "5",
    group: "user-input-nums"
  },
  {
    id: "six",
    value: "6",
    group: "user-input-nums"
  },
  {
    id: "seven",
    value: "7",
    group: "user-input-nums"
  },
  {
    id: "eight",
    value: "8",
    group: "user-input-nums"
  },
  {
    id: "nine",
    value: "9",
    group: "user-input-nums"
  },
  {
    id: "equals",
    value: "=",
    group: "result"
  },
  {
    id: "change",
    value: `\u{00B1}`,
    group: "math-functions"
  },
];

function App() {
  const [result, setResult] = React.useState("");
  const [currentUserInput, setCurrentUserInput] = React.useState("");
  const res = currentUserInput.trim();

  // get current regexp of math operators from buttons data (it separated by groups)
  const getRegex = new RegExp(`[${DefaultButtonsData.map(obj => obj?.mathOperat || "").filter(x => x !== "")}]`);

  const isOperator = (char) => {
    return getRegex.test(char);
  };

  const handleClick = (char) => {

    switch (true) {
      case char === "clear":
        setResult("");
        setCurrentUserInput("0");
        break;

      case char === "change":
        if (result === "") return;
        setResult(String(result[0]) === "-" ? result.slice(1) : "-" + result);
        break;
      
      case char === "percentage":
        if (result === "") return;
        setResult((parseFloat(result) / 100).toString());
        break;

      case char === "=":
        getResult();
        break;

      case char === "0":
        if (currentUserInput[0] !== "0") {
          setCurrentUserInput(currentUserInput + char);
        };
        break;

      case char === ".":
          // split by operators and get last number
        const lastNumber = currentUserInput.split(/[-+/*]/g).pop();
        if (!lastNumber || lastNumber?.includes(".")) return;
        setCurrentUserInput(currentUserInput + char);
        break;

      case isOperator(char):
        setCurrentUserInput(res + " " + char + " ");
        break;

      default:
        if (currentUserInput.charAt(0) === "0") {
          setCurrentUserInput(currentUserInput.slice(1) + char);
          break;
        } else {
          setCurrentUserInput(currentUserInput + char);
          break;
        }
    }
  };

  const getResult = () => {

    if (/^[\d\)]/.test(currentUserInput.charAt(-1))) return;

    const removeMoreOneOperators = res.split("").reduce((arr, ch, i) => {
      if (/^[\d)(.]/.test(ch)) {
        arr.push(ch);
      } else if (isOperator(ch)) {
        if (i===0 && result !== "" && isOperator(ch)) {
          arr.push(result)
        } else {
          if (["/", "*"].includes(arr.at(-1)) && !isOperator(res[i+1]) && ch==="-") {
            
          } else {
            while(isOperator(arr.at(-1))) {
              arr.pop()
            }
          }
        }
        arr.push(ch)
      } 
      return arr
    }, []).join("");

    // console.log(removeMoreOneOperators);

    try {
      let k = Math.floor(eval(removeMoreOneOperators)*10**4)/10**4;
      setResult(k);
    } catch(e) {
      console.error(e);
    }
    setCurrentUserInput("");
  };
  return (
    <div className="App">
      <div className="calc-body">
          <div id="display" >
            <div id="user-input">{currentUserInput}</div>
            <div id="result">{result}</div>
        </div>
        <div className="container">
          {DefaultButtonsData.map((obj) =>
            React.createElement(
              "button",
              {
                ...obj,
                onClick: () => handleClick(obj?.mathOperat || obj.value),
                style: { gridArea: obj.id },
                type: "button"
              },
              obj.value
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App
